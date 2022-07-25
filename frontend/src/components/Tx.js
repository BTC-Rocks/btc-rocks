import { hexToCV } from "@stacks/transactions";
import React from "react";

const Tx = ({ tx }) => {
  let label;
  switch (tx.tx_type) {
    case "smart_contract":
      label = `Deployed by friedgerpool.id.`;
      break;
    case "contract_call":
      if (tx.contract_call.function_name === "list-in-ustx") {
        const rockId = hexToCV(tx.contract_call.function_args[0].hex).value;
        const amount = hexToCV(tx.contract_call.function_args[1].hex).value;
        label = `Rock #${rockId} was listed for ${(
          amount / 1_000_000n
        ).toLocaleString()} STX.`;
      } else if (tx.contract_call.function_name === "unlist-in-ustx") {
        const rockId = hexToCV(tx.contract_call.function_args[0].hex).value;
        label = `Rock #${rockId} was removed from market.`;
      } else if (tx.contract_call.function_name === "buy-in-ustx") {
        const rockId = hexToCV(tx.contract_call.function_args[0].hex).value;
        const sender = tx.sender_address;
        label = `Rock #${rockId} was bought by ${sender}.`;
      } else {
        label = tx.tx_id;
      }
      break;
    default:
      label = tx.tx_id;
  }

  return tx.is_unanchored ? (
    <a href={`https://explorer.stacks.co/txid/${tx.tx_id}`}>
      Pending: <span style={{ color: "#777" }}>{label}</span>
    </a>
  ) : (
    <a href={`https://explorer.stacks.co/txid/${tx.tx_id}`}>{label}</a>
  );
};

export default Tx;
