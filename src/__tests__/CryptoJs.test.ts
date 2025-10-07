import { CryptoJs } from '../CryptoJs';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

describe('CryptoJs', () => {
  test('full API roundtrip: generate, save/load keys, encrypt/decrypt message', async () => {
    const crypto = new CryptoJs();
    crypto.generateKeys(2048);

    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ck-'));
    await crypto.saveKeys(tmpDir);

    const msg = 'Test CryptoJs API';
    const encrypted = crypto.encryptMessage(msg);
    const decrypted = crypto.decryptMessage(encrypted);
    expect(decrypted).toBe(msg);
  });

  test('load saved keys and use for encryption', async () => {
    const crypto1 = new CryptoJs();
    crypto1.generateKeys(2048);
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ck-'));
    await crypto1.saveKeys(tmpDir);

    const crypto2 = new CryptoJs();
    await crypto2.loadKeys(tmpDir);

    const encrypted = crypto2.encryptMessage('Hello');
    const decrypted = crypto1.decryptMessage(encrypted);
    expect(decrypted).toBe('Hello');
  });
});
