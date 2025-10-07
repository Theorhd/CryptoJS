import { CryptoJs } from '../src/index.js';
import fs from 'fs/promises';

/**
 * Exemple de chiffrement/déchiffrement de fichiers
 */
async function fileEncryptionExample() {
  console.log('=== Exemple de chiffrement de fichiers ===\n');

  const crypto = new CryptoJs();

  // 1. Générer ou charger les clés
  console.log('1. Génération des clés...');
  crypto.generateKeys(2048);

  // 2. Créer un fichier de test
  console.log('\n2. Création d\'un fichier de test...');
  const testContent = `Ceci est un document confidentiel.
Il contient des informations sensibles.
Date: ${new Date().toISOString()}
Données: ${JSON.stringify({ secret: 'information', value: 42 })}`;

  await fs.writeFile('./examples/test-document.txt', testContent, 'utf8');
  console.log('✓ Fichier test créé: ./examples/test-document.txt');

  // 3. Chiffrer le fichier
  console.log('\n3. Chiffrement du fichier...');
  await crypto.encryptFile(
    './examples/test-document.txt',
    './examples/test-document.txt.encrypted'
  );

  // 4. Déchiffrer le fichier
  console.log('\n4. Déchiffrement du fichier...');
  await crypto.decryptFile(
    './examples/test-document.txt.encrypted',
    './examples/test-document-decrypted.txt'
  );

  // 5. Vérifier que le contenu est identique
  console.log('\n5. Vérification du contenu...');
  const originalContent = await fs.readFile('./examples/test-document.txt', 'utf8');
  const decryptedContent = await fs.readFile('./examples/test-document-decrypted.txt', 'utf8');

  if (originalContent === decryptedContent) {
    console.log('✓ Le contenu déchiffré est identique à l\'original!');
  } else {
    console.log('✗ Erreur: Le contenu ne correspond pas!');
  }

  console.log('\n✓ Exemple terminé avec succès!');
}

// Exécuter l'exemple
fileEncryptionExample().catch(console.error);
