## Working with tokens

Now that we've created a keypair and funded it, we can start sending transactions. 

To start, let's transfer some SOL to a new keypair. This will demonstate how to utilize Solana's System Program, which handles the transfer of SOL between accounts.

Import the `SystemProgram` from `@solana/web3.js`:

```ts
import { SystemProgram } from "@solana/web3.js";
```

Then, add the following to the bottom of the `main()` function:

```ts
const newKeypair = Keypair.generate();
const transferTransaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: keypair.publicKey,
    toPubkey: newKeypair.publicKey,
    lamports: LAMPORTS_PER_SOL,
  })
);

// Send our transfer transaction, with our first keypair as the signer
const signature = await connection.sendTransaction(transferTransaction, [keypair]);
console.log("Signature: ", signature);
await connection.confirmTransaction(signature);
```

Let's create a new token account for our keypair. 

First, import the `createAssociatedTokenAccountInstruction` function from `@solana/spl-token`:

```ts
import { createAssociatedTokenAccountInstruction } from "@solana/spl-token";
```

Next, add the following to the bottom of the `main()` function:

```ts
const tokenAccount = await Token.getAssociatedTokenAddress(
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  mintPublicKey,
  publicKey
);

const createTokenAccountInstruction = createAssociatedTokenAccountInstruction(
  publicKey,
  tokenAccount,
  publicKey,
  mintPublicKey
);

transaction.add(createTokenAccountInstruction);
```

Rerun the script by typing `npm start` in your terminal to see the output!