import { KeyGenerator } from './KeyGenerator.js';
import { Encryptor } from './Encryptor.js';
import { Decryptor } from './Decryptor.js';

export class CryptoJs {
  publicKey: string | null = null;
  privateKey: string | null = null;

  generateKeys(modulusLength: 2048 | 3072 | 4096 = 2048): this {
    const keys = KeyGenerator.generateKeyPair(modulusLength);
    this.publicKey = keys.publicKey;
    this.privateKey = keys.privateKey;
    return this;
  }

  async saveKeys(directory: string = './keys'): Promise<this> {
    if (!this.publicKey || !this.privateKey) throw new Error('...existing code...');
    await KeyGenerator.saveKeys(this.publicKey, this.privateKey, directory);
    return this;
  }

  async loadKeys(directory: string = './keys'): Promise<this> {
    const keys = await KeyGenerator.loadKeys(directory);
    this.publicKey = keys.publicKey;
    this.privateKey = keys.privateKey;
    return this;
  }

  setPublicKey(publicKey: string): this {
    this.publicKey = publicKey;
    return this;
  }

  setPrivateKey(privateKey: string): this {
    this.privateKey = privateKey;
    return this;
  }

  encryptMessage(message: string): string {
    if (!this.publicKey) throw new Error('...existing code...');
    return Encryptor.encryptMessage(message, this.publicKey);
  }

  decryptMessage(encryptedMessage: string): string {
    if (!this.privateKey) throw new Error('...existing code...');
    return Decryptor.decryptMessage(encryptedMessage, this.privateKey);
  }

  async encryptFile(inputPath: string, outputPath: string): Promise<void> {
    if (!this.publicKey) throw new Error('...existing code...');
    await Encryptor.encryptFile(inputPath, outputPath, this.publicKey);
  }

  async decryptFile(inputPath: string, outputPath: string): Promise<void> {
    if (!this.privateKey) throw new Error('...existing code...');
    await Decryptor.decryptFile(inputPath, outputPath, this.privateKey);
  }

  encryptJSON(data: unknown): string {
    if (!this.publicKey) throw new Error('...existing code...');
    return Encryptor.encryptJSON(data, this.publicKey);
  }

  decryptJSON(encryptedData: string): unknown {
    if (!this.privateKey) throw new Error('...existing code...');
    return Decryptor.decryptJSON(encryptedData, this.privateKey);
  }

  getPublicKey(): string | null {
    return this.publicKey;
  }

  getPrivateKey(): string | null {
    return this.privateKey;
  }
}
