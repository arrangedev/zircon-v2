## Getting Started

Now that we're acquainted with the editor setup, let's write some code!

We'll start by creating a keypair, and funding it so we can start executing some actions on Solana. 

Firstly, import the `Keypair` and `LAMPORTS_PER_SOL` constants from `@solana/web3.js`:

```ts
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
```

Add the following to the bottom of the `main()` function:

```ts
// Create a public/private keypair
const keypair = Keypair.generate();
// Access the public key of the keypair
const publicKey = keypair.publicKey;
console.log("Public key: ", publicKey.toBase58());
```

Next, we'll airdrop our newly created public key. Add the following snippet below the `console.log` statement:

```ts
// transaction methods return a hash, which can be looked up on a block explorer
const airdropSignature = await connection.requestAirdrop(
  publicKey,
  LAMPORTS_PER_SOL
);
// Confirm that the transaction was successfully included in a block
await connection.confirmTransaction(airdropSignature);
```

Finally, we'll get the public key's balance, and log it to the console.

```ts
// Use the getBalance RPC method to get the SOL balance of the public key
const balance = await connection.getBalance(publicKey);
console.log("Balance: ", balance / LAMPORTS_PER_SOL);
```

Rerun the script by typing `npm start` in your terminal to see the output!