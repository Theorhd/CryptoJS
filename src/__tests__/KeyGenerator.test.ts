import { KeyGenerator } from '../KeyGenerator';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

describe('KeyGenerator', () => {
  test('generateKeyPair returns publicKey and privateKey as PEM strings', () => {
    const { publicKey, privateKey } = KeyGenerator.generateKeyPair(2048);
    expect(publicKey).toMatch(/-----BEGIN PUBLIC KEY-----/);
  expect(privateKey).toMatch(/-----BEGIN PRIVATE KEY-----/);
  });

  test('saveKeys and loadKeys work correctly', async () => {
    const { publicKey, privateKey } = KeyGenerator.generateKeyPair(2048);
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'keys-'));
    await KeyGenerator.saveKeys(publicKey, privateKey, tmpDir);
    const pub = await fs.readFile(path.join(tmpDir, 'public_key.pem'), 'utf8');
    const priv = await fs.readFile(path.join(tmpDir, 'private_key.pem'), 'utf8');
    expect(pub).toBe(publicKey);
    expect(priv).toBe(privateKey);
    const loaded = await KeyGenerator.loadKeys(tmpDir);
    expect(loaded.publicKey).toBe(publicKey);
    expect(loaded.privateKey).toBe(privateKey);
  });
});
