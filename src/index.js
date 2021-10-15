import { StacksMainnet } from "@stacks/network";
import React, { useState } from "react";

import ReactDOM from "react-dom";
import ImageGallery from "react-image-gallery";

import css from "react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/52d4dc02-dde0-4513-a4a8-31f937594d0c.jpeg",
    description: "BTC ROCK #1	 (5193)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/251e2026-8e42-4efb-b056-e05df6b4d56b.jpeg",
    description: "BTC ROCK #2	 (5201)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/6a36a3a8-4239-4402-8bb9-cafb9c6dc96c.jpeg",
    description: "BTC ROCK #3	 (5202)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/90ee3cf2-a5e2-4244-bb9a-29e77e38e0d0.jpeg",
    description: "BTC ROCK #4	 (5426)",
  },

  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/99b142b5-092f-44ff-bbb3-3d51a81a695a.jpeg",
    description: "BTC ROCK #5	 (5204)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/ab99fc21-0175-4994-9fc2-c2cf07345b07.jpeg",
    description: "BTC ROCK #6	 (5203)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/9fee5d27-819f-4169-97d1-aa758000ff90.jpeg",
    description: "BTC ROCK #7	 (5236)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/5972bb80-6cc8-4c7c-963c-72eca90f4bf6.jpeg",
    description: "BTC ROCK #8	 (5237)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/d9fd4a52-d667-4d62-97d3-98c228428cf8.jpeg",
    description: "BTC ROCK #9	 (5238)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/6a4ec164-8ec4-4077-b616-77db97022620.jpeg",
    description: "BTC ROCK #10	 (5239)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/e41aba90-3b86-4e6a-a876-05b6b76bceb4.jpeg",
    description: "BTC ROCK #11	 (5240)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/e86f3f03-2893-45e6-9516-121ef2d4acf6.jpeg",
    description: "BTC ROCK #12	 (5241)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/b5243356-83fb-4f93-86bd-67d4498c0b7c.jpeg",
    description: "BTC ROCK #13	 (5242)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/9423daf1-fbd2-40c7-8300-c1e013ceb598.jpeg",
    description: "BTC ROCK #14	 (5243)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/b7f6eeea-b10c-402c-b132-0d72fe95c4a2.jpeg",
    description: "BTC ROCK #15	 (5244)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/5b826d61-b3c2-470c-a696-99208f8a0881.jpeg",
    description: "BTC ROCK #16	 (5245)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/66bf4e01-6c16-4ee9-991a-31bd248e0a12.jpeg",
    description: "BTC ROCK #16	 (5351)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/f1de4c63-b732-4188-8efd-7e14fbc547f6.jpeg",
    description: "BTC ROCK #17	 (5352)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/945e3ed1-4226-49ce-9d73-b58bda2e7752.jpeg",
    description: "BTC ROCK #18	 (5439)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/e7c5eba4-60b3-4458-b85a-2d9052c7f76c.jpeg",
    description: "BTC ROCK #19	 (5329)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/6a382a49-6dda-4cc2-82f7-b87504176cf3.jpeg",
    description: "BTC ROCK #20	 (5330)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/bd7b0cbf-aa1b-4846-89d7-0f775bb601f7.jpeg",
    description: "BTC Rock#21 Atlantis 	 (5403)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/db2cde8f-ac65-4d4e-baf2-b2ddde160686.jpeg",
    description: "BTC Rock #22 Precious 	 (5404)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/ac9e22aa-718a-47ff-abe9-6c4fad3c260a.jpeg",
    description: "BTC Rock #23 Bloodred	 (5405)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/74c7944f-c2b3-4a10-bf49-a963f29ae1f9.jpeg",
    description: "BTC Rock #24 Purple Perky	 (5423)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/2e75a80c-42f8-41e7-9325-fabb079318ee.jpeg",
    description: "BTC Rock #25 Marmalade Green	 (5422)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/e51f4859-904d-4e4d-9233-75be97255f7f.jpeg",
    description: "BTC Rock #26 Above and Below	 (5406)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/251e0a1f-50ca-4d9a-bed1-42726c233672.jpeg",
    description: "BTC Rock #27 Chameleon	 (5459)",
  },

  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/c2379808-40a3-45af-a20d-7ecf7ba45a44.jpeg",
    description: "BTC Rock #28 Golden Threads	 (5424)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/65e9c4e7-24a8-471b-a417-623d60206725.jpeg",
    description: "BTC Rock #29 Matrix 101	 (5425)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/8baee278-3d2f-480b-9273-49c9f2b6e9ab.jpeg",
    description: "BTC Rock #30 Funky	 (5458)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/d385bd52-1399-437b-b633-4de88b11b612.jpeg",
    description: "BTC Rock #31 Chemical X	 (5460)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/69b74255-b030-498f-8622-b036dc00617a.jpeg",
    description: "BTC Rock #32 Earth 2	 (5461)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/3890ddfc-8234-4296-817d-67ca1b4642e1.jpeg",
    description: "BTC Rock #33 El Salvador's Rock	 (5462)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/ade530ad-c0a9-4621-8b80-033a0c2b00f9.jpeg",
    description: "BTC Rock #34 Dark Sapphire	 (5463)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/0e1a0982-bbdd-4593-bfc0-bdff70e0d1a4.jpeg",
    description: "BTC Rock #35 Mooning Martian 	 (5464)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/3d31eff2-9b88-4664-842d-8109b50e2c55.jpeg",
    description: "BTC Rock #36 Mediorite	 (5536)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/3ffeae3d-a96e-4035-98b5-0da4a6305f1f.jpeg",
    description: "BTC Rock #37 Vibranium	 (5537)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/3d945868-a02c-4860-a0f3-960b79b71215.jpeg",
    description: "BTC Rock #38 Sub-Zero	 (5538)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/f4b2c76e-968a-4127-abf7-ccfdf05d5cba.jpeg",
    description: "BTC Rock #39 Da Vinci Rock	 (5539)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/28413b60-a625-430e-9e40-42b3cea03da1.jpeg",
    description: "BTC Rock #40 Satoshi's Rock 	 (5540)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/cca5bae1-9952-4a59-b61a-91d7f718a052.jpeg",
    description: "BTC Rock #41 Extraterrestrial	 (5541)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/bfa78a53-bb2c-4924-af8d-4c6ddf7a586e.jpeg",
    description: "BTC Rock #42 CAGE	 (5542)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/f0872077-3b7e-4147-be9d-80eeb81c846d.jpeg",
    description: "BTC Rock #43 Blazing 	 (5543)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/8084d8d4-a601-4fa6-88da-59b138c71d2c.jpeg",
    description: "BTC Rock #44 Zombie/Undead	 (5544)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/4102facf-2e44-4896-859b-7aeb587953a3.jpeg",
    description: "BTC Rock #45 Muneeb's Rock	 (5545)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/ad0f8d8d-ae34-42d2-b50a-6a4077bee4b9.jpeg",
    description: "BTC Rock #46 Magnum Glow 	 (5546)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/963193c3-94f5-4792-8e50-961674317cc2.jpeg",
    description: "BTC Rock #47 Blue Bitcoin	 (5559)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/80bf0041-22ce-47ed-a8a3-4e5dbbd17f74.jpeg",
    description: "BTC Rock #48 Explored Waves	 (5560)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/c8662fa6-6ff7-4d7a-a6c3-6614c3fb9d56.jpeg",
    description: "BTC Rock #49 Galactic Saucer	 (5593)",
  },
  {
    original:
      "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/9e36a811-96c5-4d85-9f36-9afd06483562.jpeg",
    description: "BTC Rock #50 Enchanted	 (5592)",
  },
];

export function App() {
  return <ImageGallery items={images} />;
}

ReactDOM.render(
  React.createElement(App, {}, null),
  document.getElementById("react-target")
);
