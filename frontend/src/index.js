import React, { useEffect, useState } from "react";

import ReactDOM from "react-dom/client";
import ImageGallery from "react-image-gallery";
import {
  callReadOnlyFunction,
  ClarityType,
  contractPrincipalCV,
  createAssetInfo,
  cvToString,
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

import { rocksData } from "./common/rocks-data.js";
import ListButton from "./components/ListButton.js";
import { getOwner } from "./common/boom.js";
import {
  accountsApi,
  feePerRock,
  getBtcRockOwner,
  getNumberOfRocks,
} from "./common/btc-rocks.js";
import { network } from "./common/constants.js";
import UnlistButton from "./components/UnlistButton.js";
import BuyButton from "./components/BuyButton.js";
import MarketActivities from "./components/MarketActivities.js";

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });
const rock16boomid = 5245;
export function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const initialRockId = queryParams.get("rock");

  const [images, setImages] = useState(rocksData);
  const [userData, setUserData] = useState();
  const [completed, setCompleted] = useState(0);
  const [selectedRock, setSelectedRock] = useState(initialRockId);
  const [status, setStatus] = useState("");
  const [ownedRocks, setOwnedRocks] = useState([]);
  const [unlockedBalance, setUnlockedBalance] = useState();
  const [numberOfRocks, setNumberOfRocks] = useState();

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
    getNumberOfRocks().then((number) => {
      console.log("numberOfRocks", { number });
      setNumberOfRocks(number);
    });
  };

  const loadUserRocks = async (user) => {
    console.log("addr", user?.profile?.stxAddress?.mainnet, user);
    if (user?.profile?.stxAddress?.mainnet) {
      const nftEvents = await accountsApi.getAccountNft({
        principal: user.profile.stxAddress.mainnet,
      });
      const rocks = nftEvents.nft_events.filter(
        (e) =>
          e.asset_identifier ===
          "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.btc-rocks::rock"
      );
      console.log(rocks);
      setOwnedRocks(rocks);
    }
  };

  const loadBalance = async (stxAddress) => {
    console.log("addr", stxAddress);
    if (stxAddress) {
      const balances = await accountsApi.getAccountInfo({
        principal: stxAddress,
      });
      try {
        console.log({ balances });
        setUnlockedBalance(BigInt(balances.balance) - BigInt(balances.locked));
      } catch (e) {
        console.log(e);
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
    } else if (owner) {
      setStatus(`You do not own BTC Rock #${rockId}.`);
    } else {
      setStatus(`BTC Rock #${rockId} was already upgraded.`);
    }
  };

  const transfer = async (rockId) => {
    setStatus(`Verifying ownership ..`);
    const stxAddress = userData.profile.stxAddress?.mainnet;
    console.log({ stxAddress });
    const owner = await getBtcRockOwner(rockId);
    console.log({ owner, add: userData?.profile?.stxAddress?.mainnet });
    const transferFee = BigInt(numberOfRocks * feePerRock);
    console.log({ unlockedBalance, transferFee });
    if (unlockedBalance < transferFee) {
      setStatus(
        `You do not have enough unlocked STX, ${(
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
    <div style={appStyle}>
      <section>
        <ImageGallery
          items={images}
          thumbnailPosition="bottom"
          showThumbnails="true"
          startIndex={(initialRockId || 1) - 1}
          onSlide={(currentIndex) => {
            setSelectedRock(currentIndex + 1);
          }}
        />
      </section>
      {!userData && (
        <section style={{ padding: "8px" }}>
          <button onClick={login}>
            Connect wallet to upgrade or transfer BTC Rocks
          </button>
        </section>
      )}
      <section>
        <h3>Upgrade process</h3>
        Read details at{" "}
        <a
          href="https://github.com/BTC-Rocks/btc-rocks#contract-rules"
          target="_blank"
        >
          https://github.com/BTC-Rocks/btc-rocks
        </a>
      </section>
      <section style={{ padding: "8px" }}>
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
              <br />
            </section>
            <section>
              User: {userData.profile.stxAddress.mainnet}
              <br />
              <button onClick={logout}>logout</button>
            </section>
            <section>
              {numberOfRocks && userData && (
                <>
                  <hr />
                  <h3>BTC Rocks Marketplace</h3>

                  <ListButton
                    userData={userData}
                    rockId={selectedRock}
                    setStatus={setStatus}
                    numberOfRocks={numberOfRocks}
                  />
                  <br />
                  <UnlistButton
                    userData={userData}
                    rockId={selectedRock}
                    setStatus={setStatus}
                    numberOfRocks={numberOfRocks}
                  />
                  <br />
                  <BuyButton
                    userData={userData}
                    rockId={selectedRock}
                    setStatus={setStatus}
                    numberOfRocks={numberOfRocks}
                  />
                  <hr />
                </>
              )}
            </section>
          </>
        )}
      </section>
      <section>{status}</section>
      <section>
        <MarketActivities />
      </section>
      {ownedRocks && ownedRocks.length > 0 && (
        <section>
          <h5>Your upgraded BTC Rocks</h5>
          {ownedRocks.map((e, i) => {
            return <div key={i}>#{hexToCV(e.value.hex).value.toString()}</div>;
          })}
        </section>
      )}
    </div>
  );
}
const appStyle = {
  backgroundColor: "#fff",
};

const root = ReactDOM.createRoot(document.getElementById("react-target"));
root.render(<App />);
