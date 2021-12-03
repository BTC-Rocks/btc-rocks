import fs from "fs";
import { fetchPrivate } from "@stacks/common";
import { webcrypto } from "crypto";

const boomIds = [
  5193, 5201, 5202, 5426, 5204, 5203, 5236, 5237, 5238, 5239, 5240, 5241, 5242,
  5243, 5244, 5351, 5352, 5439, 5329, 5330, 5403, 5404, 5405, 5423, 5422, 5406,
  5459, 5424, 5425, 5458, 5460, 5461, 5462, 5463, 5464, 5536, 5537, 5538, 5539,
  5540, 5541, 5542, 5543, 5544, 5545, 5546, 5559, 5560, 5593, 5592,
];
const attributes = {
  4: "Clone 1",
  5: "Clone 2",
  14: "Twin 1",
  18: "Twin 2",
};

async function readMetadata() {
  const content = fs.readFileSync("./data/exported-metadata.csv").toString();
  const lines = content.split("\n");
  let rocks = lines
    .filter((l) => l)
    .map((l) => {
      const fields = l.split(",");
      const boomId = parseInt(fields[6].substr(34, 4));
      let name = fields[10].trim().substr(4);
      name = name.substr(0, name.indexOf('"')).trim();
      const hash = fields[13].substr(22, 64);
      const imageUrl = fields[11];
      return {
        boomId,
        name,
        hash,
        imageUrl,
      };
    });
  rocks = rocks.filter((r) => boomIds.find((id) => id === r.boomId));
  rocks = boomIds.map((id, index) => {
    const rock = rocks.find((r) => r.boomId === id);
    return { ...rock, id: index + 1 };
  });
  return rocks;
}

async function urlContentToDataUri(data) {
  const b64 = data.toString("base64");
  return `data:image/jpeg;base64,${b64}`;
}

async function digest(imageDataUrl) {
  return await webcrypto.subtle.digest(
    "SHA-256",
    Buffer.from(await imageDataUrl, "base64")
  );
}
async function downloadImages(rocks) {
  const hashToId = {};
  for (let r of rocks) {
    const response = await fetchPrivate(r.imageUrl);
    const data = await response.buffer();
    const dataUri = await urlContentToDataUri(data);
    const hash = await digest(dataUri);

    fs.writeFileSync(`data/rock${r.id}.jpeg`, data);
    const hashString = Buffer.from(hash).toString("hex");
    if (hashToId[hashString]) {
      console.log("**** " + hashToId[hashString]);
    }
    hashToId[hashString] = r.id;
    if (r.hash !== hashString) {
      console.log({ r });
    }
  }
}
function getName(rock) {
  if (attributes[rock.id]) {
    return rock.name + " " + attributes[rock.id];
  } else {
    return rock.name;
  }
}

function writeMetadata(rocks) {
  try {
    fs.rmSync("data/metadata/metadata", { recursive: true });
  } catch (e) {
    console.log(e);
  }

  fs.mkdirSync("data/metadata/metadata", { recursive: true });
  for (let r of rocks) {
    fs.writeFileSync(
      `data/metadata/metadata/${r.id}.json`,
      JSON.stringify({
        version: 1,
        name: getName(r),
        image: `ipfs://QmQhmPbVbXYnSTk7Z3i6GmiAYyL75ys1ZrJPNnXnBs4ch4/rock${r.id}.jpeg`,
        properties: {
          collection: "BTC Rocks",
          creator: { type: "string", value: "Benny Cage" },
          boomId: { type: "number", value: r.boomId },
          boomHash: { type: "string", value: r.hash },
        },
      })
    );
  }
}

readMetadata().then((rocks) => {
  console.log(rocks.length);
  //downloadImages(rocks);
  writeMetadata(rocks);
});
