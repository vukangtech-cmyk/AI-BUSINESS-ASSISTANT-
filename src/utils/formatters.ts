/**
 * Formats a numeric value into Tanzanian Shillings format (e.g., TZS 1,500,000)
 */
export function formatTZS(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) : amount;
  if (isNaN(num)) return 'TZS 0';
  return 'TZS ' + Math.round(num).toLocaleString('en-US');
}

/**
 * Strips formatting to get raw integer
 */
export function parseTZS(value: string): number {
  const cleaned = value.replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Builds a direct WhatsApp web/app link
 */
export function generateWhatsAppLink(text: string, phone?: string): string {
  const encodedText = encodeURIComponent(text);
  if (phone) {
    // Clean phone number: remove +, spaces, dashes. If starts with 07 or 06, convert to 255
    let cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '255' + cleanPhone.slice(1);
    }
    return `https://wa.me/${cleanPhone}?text=${encodedText}`;
  }
  return `https://wa.me/?text=${encodedText}`;
}

/**
 * Formats dates for business timestamps
 */
export function formatTimestamp(date: Date = new Date()): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
