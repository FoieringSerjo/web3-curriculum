import { readFileSync, writeFileSync } from 'fs';
import EC from 'elliptic';

const ec = new EC.ec('p192');

const keyPair = ec.genKeyPair();

const publicKey = keyPair.getPublic('hex');
const privateKey = keyPair.getPrivate('hex');

console.log(`Public Key: ${publicKey}`);
console.log(`Private Key: ${privateKey}`);

const newWalletName = process.argv[2];

const walletsFile = readFileSync('./wallets.json');
let wallets = JSON.parse(walletsFile);

if (!wallets.hasOwnProperty(newWalletName)) {
  wallets[newWalletName] = publicKey;

  wallets = JSON.stringify(wallets, null, 2);
  writeFileSync('./wallets.json', wallets);
}
