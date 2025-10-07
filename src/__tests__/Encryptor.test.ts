import { Encryptor } from '../Encryptor';
import { KeyGenerator } from '../KeyGenerator';
import { Decryptor } from '../Decryptor';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

describe('Encryptor', () => {
  const { publicKey, privateKey } = KeyGenerator.generateKeyPair(2048);

  test('encryptMessage and decryptMessage roundtrip', () => {
    const message = 'Hello, world!';
    const encrypted = Encryptor.encryptMessage(message, publicKey);
    expect(typeof encrypted).toBe('string');
    expect(encrypted).not.toBe(message);

    const decrypted = Decryptor.decryptMessage(encrypted, privateKey);
    expect(decrypted).toBe(message);
  });

  test('encryptJSON and decryptJSON roundtrip', () => {
    const data = { foo: 'bar', num: 123, flag: true };
    const encrypted = Encryptor.encryptJSON(data, publicKey);
    expect(typeof encrypted).toBe('string');

    const decrypted = Decryptor.decryptJSON(encrypted, privateKey);
    expect(decrypted).toEqual(data);
  });

  test('encryptFile and decryptFile roundtrip', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'enc-'));
    const inputPath = path.join(tmpDir, 'test.txt');
    const encryptedPath = path.join(tmpDir, 'test.txt.enc');
    const decryptedPath = path.join(tmpDir, 'test.txt.dec');
    const content = 'File content for testing.';

    await fs.writeFile(inputPath, content, 'utf8');
    await Encryptor.encryptFile(inputPath, encryptedPath, publicKey);
    await Decryptor.decryptFile(encryptedPath, decryptedPath, privateKey);

    const result = await fs.readFile(decryptedPath, 'utf8');
    expect(result).toBe(content);
  });
});
