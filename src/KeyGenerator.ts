import crypto from 'crypto'; // node builtin
import { promises as fs } from 'fs'; // node builtin
import path from 'path';

/**
 * Classe pour générer et gérer les paires de clés RSA
 */
export class KeyGenerator {
  /**
   * Génère une paire de clés RSA (publique et privée)
   * @param modulusLength - Longueur de la clé en bits (2048, 3072 ou 4096)
   */
  static generateKeyPair(modulusLength: 2048 | 3072 | 4096 = 2048): { publicKey: string; privateKey: string } {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
    return { publicKey, privateKey };
  }

  /**
   * Sauvegarde les clés dans des fichiers
   */
  static async saveKeys(
    publicKey: string,
    privateKey: string,
    directory: string = './keys'
  ): Promise<void> {
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(path.join(directory, 'public_key.pem'), publicKey, 'utf8');
    await fs.writeFile(path.join(directory, 'private_key.pem'), privateKey, 'utf8');
  }

  /**
   * Charge les clés depuis des fichiers
   */
  static async loadKeys(directory: string = './keys'): Promise<{ publicKey: string; privateKey: string }> {
    const publicKey = await fs.readFile(path.join(directory, 'public_key.pem'), 'utf8');
    const privateKey = await fs.readFile(path.join(directory, 'private_key.pem'), 'utf8');
    return { publicKey, privateKey };
  }
}
