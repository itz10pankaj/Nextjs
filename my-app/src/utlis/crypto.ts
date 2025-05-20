import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key";

function base64UrlEncode(input: string): string {
  return input.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(input: string): string {
  input = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = input.length % 4;
  if (pad) {
    input += '='.repeat(4 - pad);
  }
  return input;
}

export function encryptId(id: number): string {
  const encrypted = CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString();
  return base64UrlEncode(encrypted);
}

export function decryptId(encryptedId: string): number {
  const base64 = base64UrlDecode(encryptedId);
  const bytes = CryptoJS.AES.decrypt(base64, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return parseInt(decrypted, 10);
}
