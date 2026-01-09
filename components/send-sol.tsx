"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Transaction,
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
export const SendSol = () => {
  const { connection } = useConnection();
  const { publicKey, connected, sendTransaction } = useWallet();

  const [amount, setAmount] = useState(0.000001);
  const [loading, setLoading] = useState(false);
  const handleSendSol = async () => {
    try {
      console.log(Math.floor(amount * LAMPORTS_PER_SOL));
      setLoading(true);
      if (!publicKey || !connected) {
        alert("Please connect wallet");
        setLoading(false);
        return;
      }
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(
            "7iTYpSezASJChGHddQg2bmMe5LJo17WDUYgWY5Bjo21F"
          ),
          lamports: Math.floor(amount * LAMPORTS_PER_SOL),
        })
      );
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      });
      alert("Transaction successful" + signature);
    } catch (error) {
      alert("Transaction failed" + error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="h-full w-full">
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex flex-col gap-4">
          <Input type="text" placeholder="Enter Recipient Address" />
          {/* no negative values */}
          <Input
            type="number"
            placeholder="Enter Amount"
            min={0.000001}
            step={0.000001}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Button onClick={handleSendSol}>Send</Button>
        </div>
      </div>
    </div>
  );
};
