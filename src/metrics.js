import os from "node:os";

// CPU kullanımını iki ölçüm arasındaki fark ile hesaplıyoruz. os.loadavg()
// Windows'ta çalışmadığı için os.cpus() zamanlarını örnekliyoruz.
function snapshot() {
  const cpus = os.cpus();
  let idle = 0;
  let total = 0;
  for (const cpu of cpus) {
    for (const type in cpu.times) total += cpu.times[type];
    idle += cpu.times.idle;
  }
  return { idle, total };
}

let last = snapshot();

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

export function getSystemMetrics() {
  const now = snapshot();
  const idleDiff = now.idle - last.idle;
  const totalDiff = now.total - last.total;
  last = now;

  const cpu = totalDiff > 0 ? clamp((1 - idleDiff / totalDiff) * 100) : 0;

  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const ram = clamp((1 - freeMem / totalMem) * 100);

  return {
    cpu: Math.round(cpu),
    ram: Math.round(ram),
  };
}
