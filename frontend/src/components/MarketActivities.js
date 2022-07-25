import React, { useEffect, useRef, useState } from "react";
import { getMarketActivites } from "../common/btc-rocks";
import Tx from "./Tx";

const MarketActivities = ({ setStatus, numberOfRocks }) => {
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    getMarketActivites().then((transactions) => setTxs(transactions));
  }, [setTxs]);

  return (
    <div>
      <h3>Recent Marketplace Activities</h3>

      {txs.map((tx) => (
        <React.Fragment key={tx.tx_id}>
          <Tx tx={tx} />
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default MarketActivities;
