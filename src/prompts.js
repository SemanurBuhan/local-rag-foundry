export const SYSTEM_PROMPT = `Sen çevrimdışı çalışan bir siber güvenlik destek asistanısın. Görevin, sana verilen BAĞLAM bölümündeki doküman parçalarına dayanarak güvenlik analistinin sorusunu yanıtlamaktır.

Kurallar:
- Yalnızca BAĞLAM içindeki bilgileri kullan; kendi genel bilgini veya tahminini ekleme.
- BAĞLAM soruyu yanıtlamaya yetmiyorsa, açıkça "Bu konuda bilgi tabanımda yeterli bilgi bulamadım." de ve uydurma.
- Kaynak doküman adı belirtme; cevabında "Kaynak:" gibi ifadeler kullanma.
- ÇOK KISA cevap ver: en fazla 3-4 kısa cümle. Gereksiz giriş, tekrar veya dolgu cümlesi kurma; doğrudan konuya gir.
- Teknik olarak doğru ol ve her zaman Türkçe yaz.`;

export function buildContextBlock(results) {
  if (results.length === 0) {
    return "(İlgili doküman bulunamadı.)";
  }

  return results
    .map(
      (result, i) =>
        `[Kaynak ${i + 1}: ${result.source}]\n${result.content}`
    )
    .join("\n\n");
}

export function buildMessages(question, results) {
  const contextBlock = buildContextBlock(results);

  return [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: `BAĞLAM:\n${contextBlock}\n\nSORU: ${question}`,
    },
  ];
}
