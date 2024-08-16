import { SkillType } from "beautiful-skill-tree";

export const programDevTree: SkillType[] = [
  {
    id: "hello-world",
    title: "Hello World",
    tooltip: {
      content:
        "Run a simple Hello World program on Solana by printing to the transaction log.",
    },
    children: [
      {
        id: "pdas-cpis",
        title: "PDAs & CPIs",
        tooltip: {
          content:
            "Learn about using Program Derived Addresses (PDAs) to store on-chain data, and Cross Program Invocations (CPIs) to interact with other programs.",
        },
        children: [
          {
            id: "token-transfers",
            title: "Token Transfers",
            tooltip: {
              content:
                "Learn to transfer tokens like SOL, and the fundamentals of the Token Program.",
            },
            children: [
              {
                id: "cpis",
                title: "CPIs",
                tooltip: {
                  content:
                    "Learn how to leverage Cross Program Invocations (CPIs) to interact with other programs.",
                },
                children: [
                  {
                    id: "ix-introspect",
                    title: "IX Introspection",
                    tooltip: {
                      content:
                        "Leverage the account loader to read instruction data from within a program.",
                    },
                    children: [],
                  },
                ],
              },
              {
                id: "metaplex-nfts",
                title: "Metaplex NFTs",
                tooltip: {
                  content:
                    "Work with Metaplex to create and manage NFTs across a variety of standards.",
                },
                children: [
                  {
                    id: "token-extensions",
                    title: "Token Extensions",
                    tooltip: {
                      content:
                        "Utilize Token Extensions to add custom functionality to your both fungible and non-fungible tokens.",
                    },
                    children: [],
                  },
                ],
              },
              {
                id: "defi-basics",
                title: "DeFi Basics",
                tooltip: {
                  content:
                    "Learn the basics of Solana's major DeFi protocols, and how to work with them.",
                },
                children: [
                  {
                    id: "advanced-defi",
                    title: "Adv. DeFi",
                    tooltip: {
                      content:
                        "Learn to implement your own custom AMMs and lending protocols.",
                    },
                    children: [
                      {
                        id: "expert-defi",
                        title: "Expert DeFi",
                        tooltip: {
                          content:
                            "Understand how to implement advanced DeFi concepts like CLOBs, Perps, and more.",
                        },
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const frontendDevTree: SkillType[] = [
  {
    id: "wallet-connect",
    title: "Wallet Connnect",
    tooltip: {
      content:
        "Use the Solana Wallet Adapter library to facilitate wallet connections, and reading of data from it.",
    },
    children: [
      {
        id: "work-with-tokens",
        title: "Work with Tokens",
        tooltip: {
          content:
            "Learn to transfer tokens like SOL, using web3.js and spl-token.",
        },
        children: [
          {
            id: "use-programs",
            title: "Use Programs",
            tooltip: {
              content:
                "Use the Anchor TypeScript SDK to call program instructions, and fetch related data.",
            },
            children: [
              {
                id: "decode-data",
                title: "Decode Data",
                tooltip: {
                  content:
                    "Build on your knowledge of Anchor TS to deserialize account and instruction data from programs.",
                },
                children: [
                  {
                    id: "decode-data",
                    title: "Decode Data",
                    tooltip: {
                      content:
                        "Build on your knowledge of Anchor TS to deserialize account and instruction data from programs.",
                    },
                    children: [],
                  },
                ],
              },
              {
                id: "defi-basics",
                title: "DeFi Basics",
                tooltip: {
                  content:
                    "Learn the basics of Solana's major DeFi protocols, and how to work with them.",
                },
                children: [
                  {
                    id: "advanced-defi",
                    title: "Adv. DeFi",
                    tooltip: {
                      content:
                        "Learn to implement your own custom AMMs and lending protocols.",
                    },
                    children: [
                      {
                        id: "expert-defi",
                        title: "Expert DeFi",
                        tooltip: {
                          content:
                            "Understand how to implement advanced DeFi concepts like CLOBs, Perps, and more.",
                        },
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "json-rpc-api",
        title: "JSON RPC API",
        tooltip: {
          content:
            "Work with Metaplex to create and manage NFTs across a variety of standards.",
        },
        children: [],
      },
    ],
  },
];
