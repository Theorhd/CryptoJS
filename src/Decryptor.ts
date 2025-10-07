import crypto from 'crypto';
import fs from 'fs/promises';

/**
 * Classe pour déchiffrer des données avec une clé privée
 */
export class Decryptor {
  /**
   * Déchiffre un message avec la clé privée
   * @param encryptedMessage - Message chiffré en base64
   * @param privateKey - Clé privée au format PEM
   * @returns Message déchiffré
   */
  static decryptMessage(encryptedMessage: string, privateKey: string): string {
    const buffer = Buffer.from(encryptedMessage, 'base64');
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      buffer
    );
    return decrypted.toString('utf8');
  }

  /**
   * Déchiffre un fichier avec une clé privée
   * @param inputPath - Fichier chiffré
   * @param outputPath - Fichier déchiffré
   * @param privateKey - Clé privée au format PEM
   */
  static async decryptFile(inputPath: string, outputPath: string, privateKey: string): Promise<void> {
    const encryptedData = await fs.readFile(inputPath);
    const encryptedKeyLength = encryptedData.readUInt32BE(0);
    const encryptedKey = encryptedData.slice(4, 4 + encryptedKeyLength);
    const iv = encryptedData.slice(4 + encryptedKeyLength, 4 + encryptedKeyLength + 16);
    const encryptedContent = encryptedData.slice(4 + encryptedKeyLength + 16);

    const aesKey = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      encryptedKey
    );

    const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
    const decryptedContent = Buffer.concat([decipher.update(encryptedContent), decipher.final()]);

    await fs.writeFile(outputPath, decryptedContent);
  }

  /**
   * Déchiffre des données JSON
   * @param encryptedData - Données chiffrées en base64
   * @param privateKey - Clé privée au format PEM
   * @returns Données déchiffrées
   */
  static decryptJSON(encryptedData: string, privateKey: string): unknown {
    return JSON.parse(this.decryptMessage(encryptedData, privateKey));
  }
}
