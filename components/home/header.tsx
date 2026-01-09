"use client";

import { Button } from "../ui/button";
import { ConnectedWallet } from "../connected-wallet";
import { ModeToggle } from "../mode-toggle";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";

export const Header = () => {
  const router = useRouter();
  const { connected, publicKey } = useWallet();
  return (
    <div className="flex w-full items-center justify-between p-4">
      <h1 className="text-4xl font-extrabold">SolPay</h1>

      <div className="flex gap-6 flex-1 justify-center">
        <Button
          className="font-semibold text-xl cursor-pointer"
          variant="ghost"
          onClick={() => router.push("/")}
        >
          Home
        </Button>
        <Button
          className="font-semibold text-xl cursor-pointer"
          variant="ghost"
          onClick={() => router.push("/create")}
        >
          Create
        </Button>
        <Button
          className="font-semibold text-xl cursor-pointer"
          variant="ghost"
          onClick={() => router.push("/my-stuff")}
        >
          My-Stuff
        </Button>
        <Button
          className="font-semibold text-xl cursor-pointer"
          variant="ghost"
          onClick={() => router.push("/activity")}
        >
          Activity
        </Button>
      </div>
      <div>
        {connected && publicKey && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Wallet</p>
              <p className="font-mono text-sm">
                {publicKey.toString().slice(0, 4)}...
                {publicKey.toString().slice(-4)}
              </p>
            </div>
            <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              Devnet
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <ConnectedWallet />
        <ModeToggle />
      </div>
    </div>
  );
};
