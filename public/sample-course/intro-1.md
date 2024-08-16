## Gm!
We're going to kickstart your journey building on Solana by getting you familiar with the basics. Today, we'll use the `@solana/web3.js` library to ship a simple Node.js script to interact with Solana.

First things first, we see some code has already been written for us. Let's take a look at the code:

```ts
async function main() {
  const connection = new Connection("https://api.devnet.solana.com");
  const version = await connection.getVersion();
  console.log("Solana version: ", version);
}
main();
```

This code is a simple script that connects to Solana's devnet cluster and prints the current Solana version. For the duration of the course, we'll build off of this code, and ship some simple actions that allow us to interact with devnet.

To run the code, type `npm start` in your terminal.