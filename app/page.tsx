"use client";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { 
  WalletMultiButton, 
  WalletDisconnectButton 
} from "@solana/wallet-adapter-react-ui";
import { 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL 
} from "@solana/web3.js";
import { useState } from "react";

export default function Home() {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Hardcoded test address for demo
  const TEST_ADDRESS = "11111111111111111111111111111112";

  const sendSol = async () => {
    if (!publicKey || !connected) {
      setMessage("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Create transaction to send 0.01 SOL
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(TEST_ADDRESS),
          lamports: 0.01 * LAMPORTS_PER_SOL, // Convert SOL to lamports
        })
      );

      // Get recent blockhash for transaction
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send transaction
      const signature = await sendTransaction(transaction, connection);

      // Wait for confirmation
      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      });

      setMessage(`✅ Success! Transaction: ${signature}`);
    } catch (error) {
      console.error("Transaction failed:", error);
      setMessage(`❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">Solana Pay MVP</h1>
        
        {/* Wallet Connection */}
        <div className="flex justify-center">
          {connected ? <WalletDisconnectButton /> : <WalletMultiButton />}
        </div>

        {/* Wallet Address Display */}
        {connected && publicKey && (
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">Connected Wallet:</p>
            <p className="font-mono text-sm p-2 rounded">
              {publicKey.toString()}
            </p>
          </div>
        )}

        {/* Send SOL Button */}
        {connected && (
          <div className="space-y-4">
            <button
              onClick={sendSol}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {isLoading ? "Sending..." : "Send 0.01 SOL"}
            </button>
            
            <p className="text-xs text-gray-500 text-center">
              Sending to: {TEST_ADDRESS}
            </p>
          </div>
        )}

        {/* Status Message */}
        {message && (
          <div className={`text-center p-3 rounded-lg overflow-hidden ${
            message.includes("✅") ? "bg-green-100 text-green-800" : 
            message.includes("❌") ? "bg-red-100 text-red-800" : 
            "bg-gray-100 text-gray-800"
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}