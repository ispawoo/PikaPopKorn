import crypto from 'crypto';

export function validateTelegramInitData(initDataString: string, botToken: string): boolean {
  try {
    const initData = new URLSearchParams(initDataString);
    const hash = initData.get('hash');
    
    if (!hash) return false;

    // Remove 'hash' and sort remaining keys alphabetically
    initData.delete('hash');
    initData.sort();

    // Create data-check-string
    const dataCheckString = Array.from(initData.entries())
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Create secret key: HMAC-SHA256 of bot token with "WebAppData" as key
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    // Calculate hash
    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    return calculatedHash === hash;
  } catch (error) {
    console.error('Error validating Telegram initData:', error);
    return false;
  }
}

export function parseTelegramUser(initDataString: string) {
  const initData = new URLSearchParams(initDataString);
  const userStr = initData.get('user');
  
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (e) {
    console.error('Failed to parse user from initData', e);
    return null;
  }
}
