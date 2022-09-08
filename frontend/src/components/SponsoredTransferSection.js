import { callReadOnlyFunction } from "@stacks/transactions";
import React, { useEffect, useState } from "react";
import { accountsApi } from "../common/constants";
import { SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT } from "../common/contracts";
import ApproveContractButton from "./ApproveContractButton";
import DepositButton from "./DepositButton";
import SponsoredTransferButton from "./SponsoredTransferButton";
import WithdrawButton from "./WithdrawButton";
const SponsoredTransferSection = ({
  selectedRock,
  selectedRockOwner,
  userData,
  numberOfRocks,
  setStatus,
}) => {
  const [fundBalance, setFundBalance] = useState();
  useEffect(() => {
    const fn = async () => {
      const balance = await accountsApi.getAccountBalance({
        principal: `${SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT.address}.${SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT.name}`,
      });
      setFundBalance(balance.stx.balance / 1_000_000);
    };
    fn();
  }, []);

  return (
    <>
      <h3>BTC Rocks Transfer Sponsoring</h3>
      {fundBalance && <p>Currently, the funds hold {fundBalance} STX.</p>}
      <DepositButton
        userData={userData}
        numberOfRocks={numberOfRocks}
        setStatus={setStatus}
      />
      <br />
      <WithdrawButton
        userData={userData}
        numberOfRocks={numberOfRocks}
        setStatus={setStatus}
      />
      {selectedRockOwner && (
        <>
          <br />
          <ApproveContractButton userData={userData} setStatus={setStatus} />
          <br />
          <SponsoredTransferButton
            userData={userData}
            rockId={selectedRock}
            numberOfRocks={numberOfRocks}
            setStatus={setStatus}
          />
        </>
      )}
      <hr />
    </>
  );
};

export default SponsoredTransferSection;
