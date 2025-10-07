import crypto from 'crypto';
import fs from 'fs/promises';

/**
 * Classe pour chiffrer des données avec une clé publique
 */
export class Encryptor {
  /**
   * Chiffre un message avec la clé publique
   * @param message - Message à chiffrer
   * @param publicKey - Clé publique au format PEM
   * @returns Message chiffré en base64
   */
  static encryptMessage(message: string, publicKey: string): string {
    const buffer = Buffer.from(message, 'utf8');
    const encrypted = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      buffer
    );
    return encrypted.toString('base64');
  }

  /**
   * Chiffre un fichier avec la clé publique (hybride: RSA + AES)
   * @param inputPath - Chemin du fichier source
   * @param outputPath - Chemin du fichier chiffré
   * @param publicKey - Clé publique au format PEM
   */
  static async encryptFile(inputPath: string, outputPath: string, publicKey: string): Promise<void> {
    const data = await fs.readFile(inputPath);
    const aesKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
    const encryptedContent = Buffer.concat([cipher.update(data), cipher.final()]);

    const encryptedKey = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      aesKey
    );

    const encryptedKeyLength = Buffer.alloc(4);
    encryptedKeyLength.writeUInt32BE(encryptedKey.length, 0);

    const result = Buffer.concat([
      encryptedKeyLength,
      encryptedKey,
      iv,
      encryptedContent
    ]);

    await fs.writeFile(outputPath, result);
  }

  /**
   * Chiffre des données JSON
   * @param data - Données à chiffrer
   * @param publicKey - Clé publique au format PEM
   * @returns Données chiffrées en base64
   */
  static encryptJSON(data: unknown, publicKey: string): string {
    return this.encryptMessage(JSON.stringify(data), publicKey);
  }
}
