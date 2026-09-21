export const site = {
  name: 'Vertex Auto',
  // Placeholders: substitua pelos dados reais.
  whatsappDisplay: '[(00) 00000-0000]',
  whatsappNumber: '', // ex.: 5511999999999 — vazio abre o WhatsApp sem destinatário
  email: '[contato@vertexauto.com.br]',
  address: '[Rua, número — Bairro, Cidade]',
  hours: '[Seg a sex, 9h às 18h · Sáb, 9h às 13h]',
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
