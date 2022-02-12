import { StacksMainnet } from "@stacks/network";
import React, { useEffect, useState } from "react";

import ReactDOM from "react-dom";
import ImageGallery from "react-image-gallery";
import {
  callReadOnlyFunction,
  ClarityType,
  contractPrincipalCV,
  createAssetInfo,
  cvToString,
  fetchPrivate,
  FungibleConditionCode,
  hexToCV,
  makeStandardNonFungiblePostCondition,
  makeStandardSTXPostCondition,
  NonFungibleConditionCode,
  PostConditionMode,
  standardPrincipalCV,
  uintCV,
} from "@stacks/transactions";
import "react-image-gallery/styles/css/image-gallery.css";
import ProgressBar from "./components/Progress.js";
import {
  showConnect,
  AppConfig,
  UserSession,
  openContractCall,
} from "@stacks/connect";

const rocksData = [
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/52d4dc02-dde0-4513-a4a8-31f937594d0c.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/52d4dc02-dde0-4513-a4a8-31f937594d0c.jpeg",
    description: "BTC ROCK #1	 (5193)",
    id: 5193,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/251e2026-8e42-4efb-b056-e05df6b4d56b.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/251e2026-8e42-4efb-b056-e05df6b4d56b.jpeg",
    description: "BTC ROCK #2	 (5201)",
    id: 5201,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/6a36a3a8-4239-4402-8bb9-cafb9c6dc96c.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/6a36a3a8-4239-4402-8bb9-cafb9c6dc96c.jpeg",
    description: "BTC ROCK #3	 (5202)",
    id: 5202,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/90ee3cf2-a5e2-4244-bb9a-29e77e38e0d0.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/90ee3cf2-a5e2-4244-bb9a-29e77e38e0d0.jpeg",
    description: "BTC ROCK #4	 (5426)",
    id: 5426,
  },

  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/99b142b5-092f-44ff-bbb3-3d51a81a695a.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/99b142b5-092f-44ff-bbb3-3d51a81a695a.jpeg",
    description: "BTC ROCK #5	 (5204)",
    id: 5204,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/ab99fc21-0175-4994-9fc2-c2cf07345b07.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/ab99fc21-0175-4994-9fc2-c2cf07345b07.jpeg",
    description: "BTC ROCK #6	 (5203)",
    id: 5203,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/9fee5d27-819f-4169-97d1-aa758000ff90.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/9fee5d27-819f-4169-97d1-aa758000ff90.jpeg",
    description: "BTC ROCK #7	 (5236)",
    id: 5236,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/5972bb80-6cc8-4c7c-963c-72eca90f4bf6.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/5972bb80-6cc8-4c7c-963c-72eca90f4bf6.jpeg",
    description: "BTC ROCK #8	 (5237)",
    id: 5237,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/d9fd4a52-d667-4d62-97d3-98c228428cf8.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/d9fd4a52-d667-4d62-97d3-98c228428cf8.jpeg",
    description: "BTC ROCK #9	 (5238)",
    id: 5238,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/6a4ec164-8ec4-4077-b616-77db97022620.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/6a4ec164-8ec4-4077-b616-77db97022620.jpeg",
    description: "BTC ROCK #10	 (5239)",
    id: 5239,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/e41aba90-3b86-4e6a-a876-05b6b76bceb4.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/e41aba90-3b86-4e6a-a876-05b6b76bceb4.jpeg",
    description: "BTC ROCK #11	 (5240)",
    id: 5240,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/e86f3f03-2893-45e6-9516-121ef2d4acf6.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/e86f3f03-2893-45e6-9516-121ef2d4acf6.jpeg",
    description: "BTC ROCK #12	 (5241)",
    id: 5241,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/b5243356-83fb-4f93-86bd-67d4498c0b7c.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/b5243356-83fb-4f93-86bd-67d4498c0b7c.jpeg",
    description: "BTC ROCK #13	 (5242)",
    id: 5242,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/9423daf1-fbd2-40c7-8300-c1e013ceb598.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/9423daf1-fbd2-40c7-8300-c1e013ceb598.jpeg",
    description: "BTC ROCK #14	 (5243)",
    id: 5243,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/b7f6eeea-b10c-402c-b132-0d72fe95c4a2.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/b7f6eeea-b10c-402c-b132-0d72fe95c4a2.jpeg",
    description: "BTC ROCK #15	 (5244)",
    id: 5244,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/66bf4e01-6c16-4ee9-991a-31bd248e0a12.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/66bf4e01-6c16-4ee9-991a-31bd248e0a12.jpeg",
    description: "BTC ROCK #16	 (5351)",
    id: 5351,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/f1de4c63-b732-4188-8efd-7e14fbc547f6.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/f1de4c63-b732-4188-8efd-7e14fbc547f6.jpeg",
    description: "BTC ROCK #17	 (5352)",
    id: 5352,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/945e3ed1-4226-49ce-9d73-b58bda2e7752.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/945e3ed1-4226-49ce-9d73-b58bda2e7752.jpeg",
    description: "BTC ROCK #18	 (5439)",
    id: 5439,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/e7c5eba4-60b3-4458-b85a-2d9052c7f76c.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/e7c5eba4-60b3-4458-b85a-2d9052c7f76c.jpeg",
    description: "BTC ROCK #19	 (5329)",
    id: 5329,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/6a382a49-6dda-4cc2-82f7-b87504176cf3.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/6a382a49-6dda-4cc2-82f7-b87504176cf3.jpeg",
    description: "BTC ROCK #20	 (5330)",
    id: 5330,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/bd7b0cbf-aa1b-4846-89d7-0f775bb601f7.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/bd7b0cbf-aa1b-4846-89d7-0f775bb601f7.jpeg",
    description: "BTC Rock#21 Atlantis 	 (5403)",
    id: 5403,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/db2cde8f-ac65-4d4e-baf2-b2ddde160686.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/db2cde8f-ac65-4d4e-baf2-b2ddde160686.jpeg",
    description: "BTC Rock #22 Precious 	 (5404)",
    id: 5404,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/ac9e22aa-718a-47ff-abe9-6c4fad3c260a.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/ac9e22aa-718a-47ff-abe9-6c4fad3c260a.jpeg",
    description: "BTC Rock #23 Bloodred	 (5405)",
    id: 5405,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/74c7944f-c2b3-4a10-bf49-a963f29ae1f9.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/74c7944f-c2b3-4a10-bf49-a963f29ae1f9.jpeg",
    description: "BTC Rock #24 Purple Perky	 (5423)",
    id: 5423,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/2e75a80c-42f8-41e7-9325-fabb079318ee.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/2e75a80c-42f8-41e7-9325-fabb079318ee.jpeg",
    description: "BTC Rock #25 Marmalade Green	 (5422)",
    id: 5422,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/e51f4859-904d-4e4d-9233-75be97255f7f.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/e51f4859-904d-4e4d-9233-75be97255f7f.jpeg",
    description: "BTC Rock #26 Above and Below	 (5406)",
    id: 5406,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/251e0a1f-50ca-4d9a-bed1-42726c233672.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/251e0a1f-50ca-4d9a-bed1-42726c233672.jpeg",
    description: "BTC Rock #27 Chameleon	 (5459)",
    id: 5459,
  },

  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/c2379808-40a3-45af-a20d-7ecf7ba45a44.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/c2379808-40a3-45af-a20d-7ecf7ba45a44.jpeg",
    description: "BTC Rock #28 Golden Threads	 (5424)",
    id: 5424,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/65e9c4e7-24a8-471b-a417-623d60206725.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/65e9c4e7-24a8-471b-a417-623d60206725.jpeg",
    description: "BTC Rock #29 Matrix 101	 (5425)",
    id: 5425,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/8baee278-3d2f-480b-9273-49c9f2b6e9ab.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/8baee278-3d2f-480b-9273-49c9f2b6e9ab.jpeg",
    description: "BTC Rock #30 Funky	 (5458)",
    id: 5458,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/d385bd52-1399-437b-b633-4de88b11b612.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/d385bd52-1399-437b-b633-4de88b11b612.jpeg",
    description: "BTC Rock #31 Chemical X	 (5460)",
    id: 5460,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/69b74255-b030-498f-8622-b036dc00617a.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/69b74255-b030-498f-8622-b036dc00617a.jpeg",
    description: "BTC Rock #32 Earth 2	 (5461)",
    id: 5461,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/3890ddfc-8234-4296-817d-67ca1b4642e1.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/3890ddfc-8234-4296-817d-67ca1b4642e1.jpeg",
    description: "BTC Rock #33 El Salvador's Rock	 (5462)",
    id: 5462,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/ade530ad-c0a9-4621-8b80-033a0c2b00f9.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/ade530ad-c0a9-4621-8b80-033a0c2b00f9.jpeg",
    description: "BTC Rock #34 Dark Sapphire	 (5463)",
    id: 5463,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/0e1a0982-bbdd-4593-bfc0-bdff70e0d1a4.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/0e1a0982-bbdd-4593-bfc0-bdff70e0d1a4.jpeg",
    description: "BTC Rock #35 Mooning Martian 	 (5464)",
    id: 5464,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/3d31eff2-9b88-4664-842d-8109b50e2c55.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/3d31eff2-9b88-4664-842d-8109b50e2c55.jpeg",
    description: "BTC Rock #36 Mediorite	 (5536)",
    id: 5536,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/3ffeae3d-a96e-4035-98b5-0da4a6305f1f.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/3ffeae3d-a96e-4035-98b5-0da4a6305f1f.jpeg",
    description: "BTC Rock #37 Vibranium	 (5537)",
    id: 5537,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/3d945868-a02c-4860-a0f3-960b79b71215.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/3d945868-a02c-4860-a0f3-960b79b71215.jpeg",
    description: "BTC Rock #38 Sub-Zero	 (5538)",
    id: 5538,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/f4b2c76e-968a-4127-abf7-ccfdf05d5cba.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/f4b2c76e-968a-4127-abf7-ccfdf05d5cba.jpeg",
    description: "BTC Rock #39 Da Vinci Rock	 (5539)",
    id: 5539,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/28413b60-a625-430e-9e40-42b3cea03da1.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/28413b60-a625-430e-9e40-42b3cea03da1.jpeg",
    description: "BTC Rock #40 Satoshi's Rock 	 (5540)",
    id: 5540,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/cca5bae1-9952-4a59-b61a-91d7f718a052.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/cca5bae1-9952-4a59-b61a-91d7f718a052.jpeg",
    description: "BTC Rock #41 Extraterrestrial	 (5541)",
    id: 5541,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/bfa78a53-bb2c-4924-af8d-4c6ddf7a586e.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/bfa78a53-bb2c-4924-af8d-4c6ddf7a586e.jpeg",
    description: "BTC Rock #42 CAGE	 (5542)",
    id: 5542,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/f0872077-3b7e-4147-be9d-80eeb81c846d.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/f0872077-3b7e-4147-be9d-80eeb81c846d.jpeg",
    description: "BTC Rock #43 Blazing 	 (5543)",
    id: 5543,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/8084d8d4-a601-4fa6-88da-59b138c71d2c.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/8084d8d4-a601-4fa6-88da-59b138c71d2c.jpeg",
    description: "BTC Rock #44 Zombie/Undead	 (5544)",
    id: 5544,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/4102facf-2e44-4896-859b-7aeb587953a3.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/4102facf-2e44-4896-859b-7aeb587953a3.jpeg",
    description: "BTC Rock #45 Muneeb's Rock	 (5545)",
    id: 5545,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/ad0f8d8d-ae34-42d2-b50a-6a4077bee4b9.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/ad0f8d8d-ae34-42d2-b50a-6a4077bee4b9.jpeg",
    description: "BTC Rock #46 Magnum Glow 	 (5546)",
    id: 5546,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/963193c3-94f5-4792-8e50-961674317cc2.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/963193c3-94f5-4792-8e50-961674317cc2.jpeg",
    description: "BTC Rock #47 Blue Bitcoin	 (5559)",
    id: 5559,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/80bf0041-22ce-47ed-a8a3-4e5dbbd17f74.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/80bf0041-22ce-47ed-a8a3-4e5dbbd17f74.jpeg",
    description: "BTC Rock #48 Explored Waves	 (5560)",
    id: 5560,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/c8662fa6-6ff7-4d7a-a6c3-6614c3fb9d56.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/c8662fa6-6ff7-4d7a-a6c3-6614c3fb9d56.jpeg",
    description: "BTC Rock #49 Galactic Saucer	 (5593)",
    id: 5593,
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/9e36a811-96c5-4d85-9f36-9afd06483562.jpeg",
    thumbnail:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/9e36a811-96c5-4d85-9f36-9afd06483562.jpeg",
    description: "BTC Rock #50 Enchanted	 (5592)",
    id: 5592,
  },
];

const network = new StacksMainnet();
const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });
const rock16boomid = 5245;
function nameToString(nameCV) {
  return (
    nameCV.data.name.buffer.toString("ascii") +
    "." +
    nameCV.data.namespace.buffer.toString("ascii")
  );
}
async function getUsername(address) {
  if (
    address === "SPM6Q24H3R7FA3WE4690TQ2JQ6E125XZHP47HQYY" ||
    address === "SP8Q8QHDCZFG661H8431T2B1WX1FBD7PH76ZY1EF" ||
    address === "SP1DKW0QTVVWQT96W159BMDAFZB68R1SG6YWFN23T"
  ) {
    return "bennycage.btc";
  }
  const contractParts = address.split(".");
  const nameCV = await callReadOnlyFunction({
    contractAddress: "SP000000000000000000002Q6VF78",
    contractName: "bns",
    functionName: "resolve-principal",
    functionArgs: [
      contractParts.length > 1
        ? contractPrincipalCV(contractParts[0], contractParts[1])
        : standardPrincipalCV(address),
    ],
    senderAddress: "SP000000000000000000002Q6VF78",
    network,
  });
  return nameCV.type === ClarityType.ResponseOk
    ? nameToString(nameCV.value)
    : address;
}

export function App() {
  const [images, setImages] = useState(rocksData);
  const [userData, setUserData] = useState();
  const [completed, setCompleted] = useState(0);
  const [selectedRock, setSelectedRock] = useState();
  const [status, setStatus] = useState("");
  const [ownedRocks, setOwnedRocks] = useState([]);
  const [unlockedBalance, setUnlockedBalance] = useState();

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setupUser();
    }
  }, []);

  const setupUser = async () => {
    const user = userSession.loadUserData();
    setUserData(user);
    //loadOwners();
    loadUserRocks(user);
    loadBalance(user?.profile?.stxAddress?.mainnet);
  };

  const loadUserRocks = async (user) => {
    console.log("addr", user?.profile?.stxAddress?.mainnet, user);
    if (user?.profile?.stxAddress?.mainnet) {
      const result = await fetchPrivate(
        `https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${user.profile.stxAddress.mainnet}/nft_events`
      );
      console.log({ result });
      if (result.ok) {
        const nftEvents = await result.json();
        const rocks = nftEvents.nft_events.filter(
          (e) =>
            e.asset_identifier ===
            "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.btc-rocks::rock"
        );
        console.log(rocks);
        setOwnedRocks(rocks);
      }
    }
  };

  const loadBalance = async (stxAddress) => {
    console.log("addr", stxAddress);
    if (stxAddress) {
      const result = await fetchPrivate(
        `https://stacks-node-api.mainnet.stacks.co/v2/accounts/${stxAddress}`
      );
      console.log({ result });
      if (result.ok) {
        try {
          const balances = await result.json();
          console.log({ balances });
          setUnlockedBalance(
            BigInt(balances.balance) - BigInt(balances.locked)
          );
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  const loadOwners = async () => {
    const imageList = [];
    let count = 0;
    for (let r of rocksData) {
      let owner = await getOwner(r.id);
      if (owner) {
        owner = await getUsername(owner);
      }
      imageList.push({
        original: r.original,
        thumbnail: r.original,
        description: owner ? r.description + " " + owner : r.description,
      });
      count++;
      setCompleted(count);
    }
    setImages(imageList);
  };

  const getOwner = async (boomId) => {
    const resultCV = await callReadOnlyFunction({
      contractAddress: "SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ",
      contractName: "boom-nfts",
      functionName: "get-owner",
      functionArgs: [uintCV(boomId)],
      senderAddress: "SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ",
      network,
    });
    console.log(resultCV);
    let owner =
      resultCV.value.type === ClarityType.OptionalSome
        ? cvToString(resultCV.value.value)
        : undefined;
    return owner;
  };

  const getBtcRockOwner = async (rockId) => {
    const resultCV = await callReadOnlyFunction({
      contractAddress: "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9",
      contractName: "btc-rocks",
      functionName: "get-owner",
      functionArgs: [uintCV(rockId)],
      senderAddress: "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9",
      network,
    });
    console.log(resultCV);
    let owner =
      resultCV.value.type === ClarityType.OptionalSome
        ? cvToString(resultCV.value.value)
        : undefined;
    return owner;
  };

  const feePerRock = 100_000_000;

  const getNumberOfRocks = async () => {
    const resultCV = await callReadOnlyFunction({
      contractAddress: "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9",
      contractName: "btc-rocks",
      functionName: "get-number-of-rocks",
      functionArgs: [],
      senderAddress: "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9",
      network,
    });
    console.log(resultCV);
    return resultCV.value;
  };
  const upgrade = async (rockId) => {
    setStatus(`Verifying ownership ..`);
    console.log({ stxAddres: userData.profile.stxAddress["mainnet"] });
    const boomId = rocksData[rockId - 1].id;
    console.log(rockId, boomId);
    const owner = await getOwner(boomId);
    console.log({ owner, add: userData?.profile?.stxAddress?.mainnet });
    if (owner === userData?.profile?.stxAddress?.mainnet) {
      setStatus(`Check and confirm in your wallet`);
      await openContractCall({
        userSession,
        contractAddress: "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9",
        contractName: "btc-rocks-mint",
        functionName: "upgrade",
        functionArgs: [uintCV(rockId)],
        network,
        postConditionMode: PostConditionMode.Deny,
        postConditions: [
          makeStandardSTXPostCondition(
            userData.profile.stxAddress.mainnet,
            FungibleConditionCode.Equal,
            60_000_000
          ),
          makeStandardNonFungiblePostCondition(
            userData.profile.stxAddress.mainnet,
            NonFungibleConditionCode.DoesNotOwn,
            createAssetInfo(
              "SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ",
              "boom-nfts",
              "boom"
            ),
            uintCV(rocksData[rockId - 1].id)
          ),
        ],
        onFinish: (tx) => {
          setStatus(`Transaction submitted: ${tx.txId}`);
        },
        onCancel: () => {
          setStatus(`Transaction not submitted.`);
        },
      });
    } else {
      setStatus(`You do not own BTC Rock #${rockId}`);
    }
  };

  const transfer = async (rockId) => {
    setStatus(`Verifying ownership ..`);
    const stxAddress = userData.profile.stxAddress?.mainnet;
    console.log({ stxAddress });
    const owner = await getBtcRockOwner(rockId);
    const numberOfRocks = await getNumberOfRocks();
    console.log({ owner, add: userData?.profile?.stxAddress?.mainnet });
    const transferFee = numberOfRocks * BigInt(feePerRock);
    console.log({ unlockedBalance, transferFee });
    if (unlockedBalance < transferFee) {
      setStatus(
        `You do not have enough unlocked stx, ${(
          transferFee / 1_000_000n
        ).toString(10)} STX required.`
      );
      return;
    }
    if (owner === stxAddress) {
      setStatus(`Check and confirm in your wallet`);
      await openContractCall({
        userSession,
        contractAddress: "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9",
        contractName: "btc-rocks",
        functionName: "transfer",
        functionArgs: [
          uintCV(rockId),
          standardPrincipalCV(owner),
          standardPrincipalCV("SPR0X5HVH9JMJJEBPSN81S1SBAXH631CDYF7632N"),
        ],
        network,
        postConditionMode: PostConditionMode.Deny,
        postConditions: [
          makeStandardSTXPostCondition(
            owner,
            FungibleConditionCode.LessEqual,
            feePerRock * numberOfRocks
          ),
          makeStandardNonFungiblePostCondition(
            owner,
            NonFungibleConditionCode.DoesNotOwn,
            createAssetInfo(
              "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9",
              "btc-rocks",
              "rock"
            ),
            uintCV(rockId)
          ),
        ],
        onFinish: (tx) => {
          setStatus(`Transaction submitted: ${tx.txId}`);
        },
        onCancel: () => {
          setStatus(`Transaction not submitted.`);
        },
      });
    } else {
      setStatus(`You do not own BTC Rock #${rockId}`);
    }
  };

  const login = () => {
    showConnect({
      userSession,
      onFinish: () => {
        setupUser();
      },
      appDetails: {
        name: "BTC Rocks",
        icon: "https://vigilant-sammet-8d9405.netlify.app/android-icon-192x192.png",
      },
    });
  };

  const logout = () => {
    userSession.signUserOut("/");
    setUserData(undefined);
  };

  return (
    <>
      <section>
        <ImageGallery
          items={images}
          thumbnailPosition="bottom"
          showThumbnails="true"
          onSlide={(currentIndex) => {
            setSelectedRock(currentIndex + 1);
          }}
        />
        <br />
        <ProgressBar completed={completed} />
      </section>
      <section>
        <h1>Upgrade process</h1>
        Read details at{" "}
        <a
          href="https://github.com/BTC-Rocks/btc-rocks#contract-rules"
          target="_blank"
        >
          https://github.com/BTC-Rocks/btc-rocks
        </a>
      </section>
      <section style={{ padding: "8px" }}>
        {!userData && (
          <button onClick={login}>
            Connect wallet to upgrade or transfer BTC Rocks
          </button>
        )}
        {userData && (
          <>
            <section>
              <button
                onClick={() => upgrade(selectedRock)}
                disabled={!userData || !selectedRock}
              >
                {`Upgrade BTC Rock ${selectedRock ? "#" + selectedRock : ""}`}
              </button>
              <br />
              <button
                onClick={() => transfer(selectedRock)}
                disabled={!userData || !selectedRock}
              >
                {`Transfer BTC Rock ${
                  selectedRock ? "#" + selectedRock : ""
                } to rocks.btc`}
              </button>
            </section>
            <section>
              User: {userData.profile.stxAddress.mainnet}
              <br />
              <button onClick={logout}>logout</button>
            </section>
          </>
        )}
      </section>
      <section>{status}</section>
      {ownedRocks && ownedRocks.length > 0 && (
        <section>
          <h5>Your upgraded BTC Rocks</h5>
          {ownedRocks.map((e, i) => {
            return <div key={i}>#{hexToCV(e.value.hex).value.toString()}</div>;
          })}
        </section>
      )}
    </>
  );
}

ReactDOM.render(
  React.createElement(App, {}, null),
  document.getElementById("react-target")
);
