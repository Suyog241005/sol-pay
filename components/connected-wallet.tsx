"use client";

import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export const ConnectedWallet = () => {
  const { connected } = useWallet();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient ? (
        connected ? (
          <WalletDisconnectButton />
        ) : (
          <WalletMultiButton />
        )
      ) : null}
    </div>
  );
};
