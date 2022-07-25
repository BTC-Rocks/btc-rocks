import React from "react";

const Tx = ({ tx }) => {
  let label;
  switch (tx.tx_type) {
    case "smart_contract":
      label = `Deployed by friedgerpool.id.`;
      break;
    default:
      label = tx.tx_id;
  }

  return <a href={`https://explorer.stacks.co/txid/${tx.tx_id}`}>{label}</a>;
};

export default Tx;
