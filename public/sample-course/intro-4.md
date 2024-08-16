## Adding SPL Tokens

In the last step, we transferred the native token SOL to a new keypair.

However, most other tokens are "SPL tokens", which use the Token Program to handle the transfer of tokens, and require token specific accounts.

First, let's create a new token to work with.

Import the following from `@solana/spl-token`:

```ts
import {
  createMint,
  mintTo,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
  getTokenAccountBalance
} from "@solana/spl-token";
```

Next, add the following to the bottom of the `main()` function:

```ts
// Create a new mint with our first keypair as the authority, and 9 decimals
const mintPublicKey = await createMint(
  connection,
  publicKey,
  publicKey,
  null,
  9,
  TOKEN_PROGRAM_ID
);
console.log("Mint public key: ", mintPublicKey.toBase58());
```

Now we can create a new token account for our first keypair, so we can successfully mint tokens to it.

Add the following to the bottom of the `main()` function:

```ts
const tokenAccount = await getAssociatedTokenAddressSync(
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  mintPublicKey,
  publicKey
);

const createTokenAccount = new Transaction.add(
    createAssociatedTokenAccountInstruction(
        publicKey,
        tokenAccount,
        publicKey,
        mintPublicKey
));

const signature = await connection.sendTransaction(createTokenAccount, [keypair]);
```

Lastly, let's mint some tokens to our new token account:

```ts
const mintSignature = await mintTo(
  connection,
  mintPublicKey,
  tokenAccount,
  publicKey,
  100,
  keypair
);
console.log("Mint signature: ", mintSignature);

// Get balance of our new token account
const tokenAccountBalance = await getTokenAccountBalance(connection, tokenAccount);
console.log("Token account balance: ", tokenAccountBalance.value.uiAmountString);
```

Rerun the script by typing `npm start` in your terminal to see the output!