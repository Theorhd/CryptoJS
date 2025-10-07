import { CryptoJs } from '../src/index.js';

/**
 * Exemple d'utilisation basique de CryptoJs
 */
async function basicExample() {
  console.log('=== Exemple d\'utilisation de CryptoJs ===\n');

  // Créer une instance de CryptoJs
  const crypto = new CryptoJs();

  // 1. Générer une paire de clés
  console.log('1. Génération des clés...');
  crypto.generateKeys(2048);

  // 2. Sauvegarder les clés
  console.log('\n2. Sauvegarde des clés...');
  await crypto.saveKeys('./examples/keys');

  // 3. Chiffrer un message
  console.log('\n3. Chiffrement d\'un message...');
  const message = 'Ceci est un message secret!';
  console.log(`Message original: "${message}"`);
  
  const encrypted = crypto.encryptMessage(message);
  console.log(`Message chiffré: ${encrypted.substring(0, 50)}...`);

  // 4. Déchiffrer le message
  console.log('\n4. Déchiffrement du message...');
  const decrypted = crypto.decryptMessage(encrypted);
  console.log(`Message déchiffré: "${decrypted}"`);

  // 5. Chiffrer des données JSON
  console.log('\n5. Chiffrement de données JSON...');
  const data = {
    username: 'john.doe',
    email: 'john@example.com',
    secret: 'mot_de_passe_123'
  };
  console.log('Données originales:', data);
  
  const encryptedJSON = crypto.encryptJSON(data);
  console.log(`Données chiffrées: ${encryptedJSON.substring(0, 50)}...`);

  const decryptedJSON = crypto.decryptJSON(encryptedJSON);
  console.log('Données déchiffrées:', decryptedJSON);

  console.log('\n✓ Exemple terminé avec succès!');
}

// Exécuter l'exemple
basicExample().catch(console.error);
