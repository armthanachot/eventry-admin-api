import crypto from 'crypto';

const encrypt = (plaintext: string): string => {
  const iv = crypto.randomBytes(12);
  const keyBuffer = Buffer.from(process.env.ENCRYPTION_KEY || '', 'hex');
  const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer, iv);

  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  const tag = cipher.getAuthTag();

  return [
    iv.toString('base64'),
    tag.toString('base64'),
    encrypted
  ].join(':');
}

const decrypt = (ciphertext: string): string => {
  const [ivB64, tagB64, encryptedB64] = ciphertext.split(':');
  const iv = Buffer.from(ivB64, 'base64');
  const tag = Buffer.from(tagB64, 'base64');
  const keyBuffer = Buffer.from(process.env.ENCRYPTION_KEY || '', 'hex');
  const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encryptedB64, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export const comparePassword = (plaintext: string, ciphertext: string): boolean => {
  return plaintext === decrypt(ciphertext);
}


export { encrypt, decrypt };