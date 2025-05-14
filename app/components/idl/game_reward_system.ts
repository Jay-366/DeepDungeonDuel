/**
 * TypeScript helper type generated from Anchor IDL
 * for the `game_reward_system` program.
 */
export type GameRewardSystem = {
    address: "AP62gFAAsUSdKqCxhgkzyqGxwbP5Hhs4SBSUb4ARtXyz";
    metadata: {
      name: "game_reward_system";
      version: "0.1.0";
      spec: "0.1.0";
      description: "Generated manually from IDL";
    };
    "instructions": [
    {
      "name": "playGame",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "win",
          "type": "bool"
        },
        {
          "name": "transferredAmount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "GameConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "transferAmount",
            "type": "u64"
          }
        ]
      }
    }
  ]  // No custom types defined
  };
  