# CryptoJs

Package de cryptographie asymétrique pour Node.js permettant de chiffrer et déchiffrer des messages, documents et données avec des clés publiques/privées.

## 🔐 Fonctionnalités

- **Génération de paires de clés RSA** (2048, 3072 ou 4096 bits)
- **Chiffrement/Déchiffrement de messages** textuels
- **Chiffrement/Déchiffrement de fichiers** (avec chiffrement hybride RSA+AES)
- **Chiffrement/Déchiffrement de données JSON**
- **Sauvegarde et chargement des clés** dans des fichiers
- **Gestion flexible des clés** (partage de clé publique)

## 📋 Prérequis

- Node.js >= 14.0.0
- Module `crypto` natif de Node.js (inclus par défaut)

## 🚀 Installation

```bash
# Cloner ou copier le package
cd CryptoJs

# Aucune dépendance externe nécessaire!
```

## 💡 Usage

### Exemple basique

```javascript
import { CryptoJs } from './src/index.js';

const crypto = new CryptoJs();

// Générer une paire de clés
crypto.generateKeys(2048);

// Sauvegarder les clés
await crypto.saveKeys('./keys');

// Chiffrer un message
const encrypted = crypto.encryptMessage('Message secret');

// Déchiffrer le message
const decrypted = crypto.decryptMessage(encrypted);
console.log(decrypted); // "Message secret"
```

### Chiffrement de fichiers

```javascript
import { CryptoJs } from './src/index.js';

const crypto = new CryptoJs();
crypto.generateKeys(2048);

// Chiffrer un fichier
await crypto.encryptFile(
  './document.pdf',
  './document.pdf.encrypted'
);

// Déchiffrer le fichier
await crypto.decryptFile(
  './document.pdf.encrypted',
  './document-decrypted.pdf'
);
```

### Chiffrement de données JSON

```javascript
const data = {
  username: 'john.doe',
  password: 'secret123',
  email: 'john@example.com'
};

// Chiffrer
const encrypted = crypto.encryptJSON(data);

// Déchiffrer
const decrypted = crypto.decryptJSON(encrypted);
console.log(decrypted); // { username: 'john.doe', ... }
```

### Gestion des clés

```javascript
// Générer et sauvegarder
const crypto1 = new CryptoJs();
crypto1.generateKeys(2048);
await crypto1.saveKeys('./keys');

// Charger dans une autre instance
const crypto2 = new CryptoJs();
await crypto2.loadKeys('./keys');

// Partager uniquement la clé publique
const publicKey = crypto1.getPublicKey();
const crypto3 = new CryptoJs();
crypto3.setPublicKey(publicKey); // Peut chiffrer, pas déchiffrer
```

## 📁 Structure du projet

```
CryptoJs/
├── src/
│   ├── CryptoJs.js       # Classe principale
│   ├── KeyGenerator.js   # Génération et gestion des clés
│   ├── Encryptor.js      # Chiffrement
│   ├── Decryptor.js      # Déchiffrement
│   └── index.js          # Exports
├── examples/
│   ├── basic-usage.js         # Exemple d'usage basique
│   ├── file-encryption.js     # Exemple de chiffrement de fichiers
│   └── key-management.js      # Exemple de gestion des clés
├── package.json
└── README.md
```

## 🧪 Exemples

Le dossier `examples/` contient plusieurs exemples d'utilisation:

```bash
# Exemple basique
node examples/basic-usage.js

# Chiffrement de fichiers
node examples/file-encryption.js

# Gestion des clés
node examples/key-management.js
```

## 🔒 Sécurité

- **RSA**: Algorithme asymétrique pour la gestion des clés
- **AES-256-CBC**: Chiffrement symétrique pour les fichiers volumineux
- **OAEP Padding**: Protection contre les attaques
- **SHA-256**: Fonction de hachage pour OAEP

### Bonnes pratiques

1. **Gardez vos clés privées secrètes** - Ne les partagez jamais
2. **Utilisez des clés de 2048 bits minimum** - 4096 bits pour haute sécurité
3. **Sauvegardez vos clés** - Dans un endroit sûr
4. **Partagez uniquement les clés publiques** - Pour permettre le chiffrement

## 📖 API

### Classe `CryptoJs`

#### Méthodes

- `generateKeys(modulusLength = 2048)` - Génère une paire de clés
- `saveKeys(directory = './keys')` - Sauvegarde les clés
- `loadKeys(directory = './keys')` - Charge les clés
- `setPublicKey(publicKey)` - Définit la clé publique
- `setPrivateKey(privateKey)` - Définit la clé privée
- `encryptMessage(message)` - Chiffre un message
- `decryptMessage(encryptedMessage)` - Déchiffre un message
- `encryptFile(inputPath, outputPath)` - Chiffre un fichier
- `decryptFile(inputPath, outputPath)` - Déchiffre un fichier
- `encryptJSON(data)` - Chiffre des données JSON
- `decryptJSON(encryptedData)` - Déchiffre des données JSON
- `getPublicKey()` - Retourne la clé publique
- `getPrivateKey()` - Retourne la clé privée

## 🤝 Contribution

Les contributions sont les bienvenues! N'hésitez pas à proposer des améliorations.

## 📄 Licence

MIT

## ⚠️ Avertissement

Ce package est fourni à des fins éducatives et de développement. Pour un usage en production, assurez-vous d'effectuer des audits de sécurité appropriés et de suivre les meilleures pratiques de l'industrie.
