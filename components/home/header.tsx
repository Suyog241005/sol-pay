"use client";

import { Button } from "../ui/button";
import { ConnectedWallet } from "../connected-wallet";
import { ModeToggle } from "../mode-toggle";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
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
      <div className="flex gap-2">
        <ConnectedWallet />
        <ModeToggle />
      </div>
    </div>
  );
};
