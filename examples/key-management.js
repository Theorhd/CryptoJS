import { CryptoJs } from '../src/index.js';

/**
 * Exemple de gestion des clés
 */
async function keyManagementExample() {
  console.log('=== Exemple de gestion des clés ===\n');

  // 1. Créer une première instance et générer des clés
  console.log('1. Instance 1: Génération et sauvegarde des clés...');
  const crypto1 = new CryptoJs();
  crypto1.generateKeys(2048);
  await crypto1.saveKeys('./examples/keys');

  // 2. Chiffrer un message avec la première instance
  console.log('\n2. Instance 1: Chiffrement d\'un message...');
  const message = 'Message secret à transmettre';
  const encrypted = crypto1.encryptMessage(message);
  console.log(`Message chiffré: ${encrypted.substring(0, 50)}...`);

  // 3. Créer une deuxième instance et charger les clés
  console.log('\n3. Instance 2: Chargement des clés...');
  const crypto2 = new CryptoJs();
  await crypto2.loadKeys('./examples/keys');

  // 4. Déchiffrer le message avec la deuxième instance
  console.log('\n4. Instance 2: Déchiffrement du message...');
  const decrypted = crypto2.decryptMessage(encrypted);
  console.log(`Message déchiffré: "${decrypted}"`);

  // 5. Démonstration de partage de clé publique
  console.log('\n5. Démonstration du partage de clé publique...');
  const crypto3 = new CryptoJs();
  const publicKeyOnly = crypto1.getPublicKey();
  crypto3.setPublicKey(publicKeyOnly);

  console.log('Instance 3 peut chiffrer (avec clé publique seulement)...');
  const encrypted2 = crypto3.encryptMessage('Nouveau message');
  console.log(`Message chiffré: ${encrypted2.substring(0, 50)}...`);

  console.log('Instance 1 peut déchiffrer (elle a la clé privée)...');
  const decrypted2 = crypto1.decryptMessage(encrypted2);
  console.log(`Message déchiffré: "${decrypted2}"`);

  console.log('\n✓ Exemple terminé avec succès!');
  console.log('\nNote: La clé publique peut être partagée librement,');
  console.log('mais la clé privée doit rester secrète!');
}

// Exécuter l'exemple
keyManagementExample().catch(console.error);
