import { KeyGenerator } from '../KeyGenerator';
import { Encryptor } from '../Encryptor';
import { Decryptor } from '../Decryptor';

describe('Decryptor', () => {
  const { publicKey, privateKey } = KeyGenerator.generateKeyPair(2048);

  test('decryptMessage should correctly decrypt a message encrypted by Encryptor', () => {
    const message = 'Secret message';
    const encrypted = Encryptor.encryptMessage(message, publicKey);
    const decrypted = Decryptor.decryptMessage(encrypted, privateKey);
    expect(decrypted).toBe(message);
  });

  test('decryptJSON should correctly parse JSON encrypted by Encryptor', () => {
    const data = { name: 'Alice', value: 42 };
    const encryptedJson = Encryptor.encryptJSON(data, publicKey);
    const decrypted = Decryptor.decryptJSON(encryptedJson, privateKey);
    expect(decrypted).toEqual(data);
  });
});