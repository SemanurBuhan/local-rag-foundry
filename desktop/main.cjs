/**
 * ShadowSec — Masaüstü Uygulaması (Electron ana süreci)
 *
 * Açılış akışı:
 *   1. Tam sıfırlama: port 3000'deki zombi sunucular + eski server.js
 *      süreçleri + Foundry Local servisi kapatılır.
 *   2. Arka planda tertemiz bir `node src/server.js` başlatılır
 *      (Foundry Local, SDK tarafından otomatik yeniden başlatılır).
 *   3. Splash ekranı gösterilir; sunucu cevap verir vermez web arayüzü
 *      (kendi animasyonlu yükleme ekranıyla birlikte) yüklenir.
 *   4. Uygulama kapatılınca sunucu ve Foundry Local da kapatılır —
 *      geride zombi süreç kalmaz.
 */

const { app, BrowserWindow, dialog, shell } = require("electron");
const { spawn, exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const ROOT = path.join(__dirname, "..");
const PORT = 3000;
const APP_URL = `http://127.0.0.1:${PORT}`;
const LOG_FILE = path.join(__dirname, "server.log");

let win = null;
let serverProc = null;
let cleanedUp = false;

/* ---------- yardımcılar ---------- */

function run(cmd, timeoutMs = 20000) {
  return new Promise((resolve) => {
    exec(cmd, { windowsHide: true, timeout: timeoutMs }, (err, stdout) =>
      resolve({ err, stdout: stdout || "" })
    );
  });
}

function log(msg) {
  const line = `[${new Date().toLocaleTimeString("tr-TR")}] ${msg}\n`;
  try {
    fs.appendFileSync(LOG_FILE, line);
  } catch (_) {}
  console.log(line.trim());
}

/* ---------- temizlik (tam sıfırlama) ---------- */

async function killPortListeners(port) {
  const { stdout } = await run("netstat -aon -p tcp");
  const pids = new Set();
  for (const raw of stdout.split(/\r?\n/)) {
    const m = raw
      .trim()
      .match(/^TCP\s+\S+:(\d+)\s+\S+\s+LISTENING\s+(\d+)$/i);
    if (m && Number(m[1]) === port && m[2] !== String(process.pid)) {
      pids.add(m[2]);
    }
  }
  for (const pid of pids) {
    log(`Zombi sunucu bulundu (PID ${pid}), kapatılıyor...`);
    await run(`taskkill /F /T /PID ${pid}`);
  }
  return pids.size;
}

async function killStaleServers() {
  // Komut satırında bu projenin server.js'i geçen eski node süreçleri
  const ps =
    "powershell -NoProfile -Command \"Get-CimInstance Win32_Process | " +
    "Where-Object { $_.CommandLine -like '*local-rag-foundry*server.js*' } | " +
    "ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }\"";
  await run(ps, 30000);
}

async function stopFoundry() {
  log("Foundry Local servisi durduruluyor (tam sıfırlama)...");
  await run("foundry service stop", 45000);
  // Emniyet kemeri: CLI bulunamazsa süreçleri doğrudan kapat
  await run('taskkill /F /IM "Inference.Service.Agent.exe"');
}

async function fullCleanup() {
  log("=== Tam sıfırlama başladı ===");
  await killStaleServers();
  await killPortListeners(PORT);
  await stopFoundry();
  log("=== Temizlik bitti, sistem tertemiz ===");
}

/* ---------- sunucu ---------- */

function startServer() {
  log("Yeni sunucu başlatılıyor: node src/server.js");
  const out = fs.openSync(LOG_FILE, "a");
  serverProc = spawn("node", [path.join("src", "server.js")], {
    cwd: ROOT,
    windowsHide: true,
    stdio: ["ignore", out, out],
  });
  serverProc.on("exit", (code) => {
    log(`Sunucu süreci kapandı (kod: ${code})`);
    serverProc = null;
  });
}

async function waitForServer(timeoutMs = 120000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(`${APP_URL}/api/metrics`, {
        signal: AbortSignal.timeout(2000),
      });
      if (r.ok) return true;
    } catch (_) {}
    if (serverProc === null && Date.now() - start > 3000) return false;
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

/* ---------- pencere ---------- */

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 420,
    minHeight: 320,
    backgroundColor: "#050706",
    icon: path.join(__dirname, "app.ico"),
    autoHideMenuBar: true,
    title: "ShadowSec — Siber Güvenlik Asistanı",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Dış bağlantılar uygulama içinde değil, tarayıcıda açılsın
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("page-title-updated", (e) => e.preventDefault());

  win.loadFile(path.join(__dirname, "splash.html"));
}

/* ---------- kapanış temizliği ---------- */

async function shutdown() {
  if (cleanedUp) return;
  cleanedUp = true;
  log("Uygulama kapanıyor, süreçler temizleniyor...");
  if (serverProc && serverProc.pid) {
    await run(`taskkill /F /T /PID ${serverProc.pid}`);
  }
  await run("foundry service stop", 30000);
  log("Kapanış temizliği tamam.");
}

/* ---------- uygulama yaşam döngüsü ---------- */

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  // Zaten açık bir kopya var — onu öne getir, bunu kapat
  app.quit();
} else {
  app.on("second-instance", () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app.whenReady().then(async () => {
    try {
      fs.writeFileSync(LOG_FILE, ""); // her açılışta taze log
    } catch (_) {}

    createWindow();

    await fullCleanup();
    startServer();

    const ok = await waitForServer();
    if (!ok) {
      dialog.showErrorBox(
        "ShadowSec başlatılamadı",
        `Sunucu ayağa kalkmadı.\n\nDetaylar için log dosyasına bakın:\n${LOG_FILE}\n\n` +
          "Olası nedenler: Node.js PATH'te değil, 3000 portu başka bir " +
          "uygulama tarafından kilitli veya Foundry Local kurulu değil."
      );
      app.quit();
      return;
    }

    if (win && !win.isDestroyed()) win.loadURL(APP_URL);
  });

  app.on("before-quit", (e) => {
    if (!cleanedUp) {
      e.preventDefault();
      shutdown().finally(() => app.exit(0));
    }
  });

  app.on("window-all-closed", () => app.quit());
}
