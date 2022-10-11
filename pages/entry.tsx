import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMetaMask } from "metamask-react";
import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

type EntrancePanel = "default" | "web3" | "web2";

const Entry: NextPage = () => {
  // router: history, to return to the previous view.
  const router = useRouter();
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  // state
  const [web3WalletReadyState, setWeb3WalletReadyState] = useState(false);
  const [entranceType, setEntranceType] = useState<EntrancePanel>("default");

  // state for Web2 settings
  const [inputValueWeb2ProxyAccessToken, setInputValueWeb2ProxyAccessToken] =
    useState<string>("");

  // effect
  useEffect(() => {
    const isWeb3EthereumActive =
      typeof (window as any).ethereum == "object" &&
      typeof (window as any).ethereum.chainId == "string";

    setWeb3WalletReadyState(isWeb3EthereumActive);
  }, []);

  /**
   * getEntrancePanel
   * @param entranceType "default" | "web3" | "web2"
   * @returns EntrancePanel
   * @state web3WalletReadyState: dependent on Entry components.
   * @state setEntranceType: setEntranceType dependent on Entry components.
   * Warning: This function is "strongly dependent on the 'parent' component"
   *          it should not be used on other components!
   */
  const getEntrancePanel = (entranceType: EntrancePanel) => {
    switch (entranceType) {
      case "web3":
        /**
         * Web3 wallet connect panel.
         */
        return (
          <>
            <div className="mt-4 border border-gray-500 p-10 bg-gray-800 max-w-4xl">
              <div className=" max-w-4xl flex flex-col md:flex-row">
                <div className=" h-40 w-40 md border border-gray-700 flex-none">
                  {/* TODO: change entry img */}
                  <Image
                    src="/entry-img.png"
                    alt="Entry img"
                    width={160}
                    height={160}
                  />
                </div>
                {/* CARD RIGHT */}
                <div className="ml-0 md:ml-8 mt-12 md:mt-0 flex flex-col justify-between md:basis-3/4">
                  {/* CARD RIGHT TOP */}
                  <div>
                    <h2 className=" text-2xl">Access via Web3</h2>
                    <p className=" font-thin">
                      You need to access the User Center via the Ethernet wallet
                      Metamask
                    </p>
                  </div>
                </div>
              </div>
              <div className="max-w-4xl mt-10 p-2 md:p-20 border border-gray-500 bg-gray-900 text-center">
                <p className="break-all text-sm  font-thin ">
                  {status == "connected"
                    ? `ON CHAIN: {chainId} , YOUR WALLET ADDRESS`
                    : `Wallet it's not connected, please back and reconfirm`}
                </p>
                <p className="break-all text-sm  md:text-2xl font-thin animate-pulse">
                  {account}
                </p>
              </div>
              <div className=" mt-12 max-w-4xl flex flex-row justify-between">
                <button
                  className="border border-gray-500  p-3 hover:bg-gray-500"
                  onClick={() => {
                    setEntranceType("default");
                  }}
                >
                  {"<< BACK"}
                </button>
                {status == "connected" ? (
                  <button
                    className=" bg-gray-500 p-3 hover:bg-slate-400 font-thin animate-pulse"
                    onClick={async () => {}}
                  >
                    Start & Access
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        );
      case "web2":
        /**
         * Web2 proxy connect panel.
         */
        return (
          <>
            <div className="mt-4 border border-gray-500 p-10 bg-gray-800 max-w-4xl">
              <div className="bg-gray-800 max-w-4xl flex flex-col md:flex-row mt-4">
                {/* CARD LEFT */}
                <div className=" h-40 w-40 md border border-gray-700 flex-none">
                  {/* TODO: change entry img */}
                  <Image
                    src="/entry-img.png"
                    alt="Entry img"
                    width={160}
                    height={160}
                  />
                </div>
                {/* CARD RIGHT */}
                <div className="ml-0 md:ml-8 mt-12 md:mt-0 flex flex-col justify-between md:basis-3/4">
                  {/* CARD RIGHT TOP */}
                  <div>
                    <h2 className=" text-2xl">Access via Web2</h2>
                    <p className=" font-thin">
                      You can use our provided (or third-party provided) Web2
                      proxy facility to access the User Center by entering a
                      traditional TOKEN authentication method to access the User
                      Center
                    </p>
                    {status == "connected" ? (
                      <p className="text-xs mt-4 text-green-400 animate-pulse">
                        Looks like your Metamask is working, you can go back to
                        the Web3 way to connect
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              {/* WEB2 Settings */}
              <div className="max-w-4xl mt-10 p-2 md:p-4 border border-gray-500 bg-gray-900 text-center">
                <p className="break-all text-sm font-thin "></p>
                <p className="break-all text-sm  md:text-2xl font-thin p-4">
                  <FormControl fullWidth color="primary">
                    <InputLabel
                      htmlFor="outlined-adornment-amount"
                      color="primary"
                    >
                      Amount
                    </InputLabel>
                    <OutlinedInput
                      color="primary"
                      id="outlined-adornment-amount"
                      value={inputValueWeb2ProxyAccessToken}
                      onChange={(e) => {
                        setInputValueWeb2ProxyAccessToken(e.target.value);
                      }}
                      startAdornment={
                        <InputAdornment position="start" color="primary">
                          URL:
                        </InputAdornment>
                      }
                      label="Amount"
                    />
                  </FormControl>
                </p>
              </div>
              <div className=" mt-12 max-w-4xl flex flex-row justify-between">
                {/* buttons for Web2 settings */}
                <button
                  className="border border-gray-500  p-3 hover:bg-gray-500"
                  onClick={() => {
                    setEntranceType("default");
                  }}
                >
                  {"<< BACK"}
                </button>
                {status == "connected" ? (
                  <button
                    className=" bg-gray-500 p-3 hover:bg-slate-400 font-thin"
                    onClick={async () => {}}
                  >
                    Start & Access
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        );
      default:
        return (
          <>
            <button
              className="border border-gray-500 bg-gray-900 p-3 hover:bg-gray-500"
              onClick={() => {
                router.back();
              }}
            >
              {"<< BACK TO LAST PAGE"}
            </button>
            <div className="border border-gray-500 p-10 bg-gray-800 max-w-4xl flex flex-col md:flex-row mt-4">
              {/* CARD LEFT */}
              <div className=" h-40 w-40 md border border-gray-700 flex-none">
                {/* TODO: change entry img */}
                <Image
                  src="/entry-img.png"
                  alt="Entry img"
                  width={160}
                  height={160}
                />
              </div>
              {/* CARD RIGHT */}
              <div className="ml-0 md:ml-8 mt-12 md:mt-0 flex flex-col justify-between md:basis-3/4">
                {/* CARD RIGHT TOP */}
                <div>
                  <h2 className=" text-2xl">Access via Web3</h2>
                  <p className=" font-thin">
                    You need to access the User Center via the Ethernet wallet
                    Metamask
                  </p>
                </div>
                {/* CARD LEFT BOTTOM */}
                <div className="flex flex-row justify-end mt-6 md:mt-0">
                  {web3WalletReadyState ? (
                    <button
                      className=" bg-gray-500 p-3 hover:bg-slate-400 font-thin"
                      onClick={async () => {
                        try {
                          if (status === "connected") {
                            setEntranceType("web3");
                          } else {
                            await connect();
                            setEntranceType("web3");
                          }
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                    >
                      {status == "connecting"
                        ? `Please check your 🦊`
                        : status == "connected"
                        ? "🎉 Already connected, come on ~"
                        : `Connect wallet & login`}
                    </button>
                  ) : (
                    <div className=" bg-gray-700 p-3 text-gray-500">
                      Please install Web3 wallet
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border border-gray-500 p-10 bg-gray-800 max-w-4xl flex flex-col md:flex-row mt-4">
              {/* CARD LEFT */}
              <div className=" h-40 w-40 md border border-gray-700 flex-none">
                {/* TODO: change entry img */}
                <Image
                  src="/entry-img.png"
                  alt="Entry img"
                  width={160}
                  height={160}
                />
              </div>
              {/* CARD RIGHT */}
              <div className="ml-0 md:ml-8 mt-12 md:mt-0 flex flex-col justify-between md:basis-3/4">
                {/* CARD RIGHT TOP */}
                <div>
                  <h2 className=" text-2xl">Access via Web2</h2>
                  <p className=" font-thin">
                    You can use our provided (or third-party provided) Web2
                    proxy facility to access the User Center by entering a
                    traditional TOKEN authentication method to access the User
                    Center
                  </p>
                </div>
                {/* CARD LEFT BOTTOM */}
                <div className="flex flex-row justify-end mt-6 md:mt-0">
                  <button
                    className=" bg-gray-500 p-3 hover:bg-slate-400 font-thin"
                    onClick={() => {
                      setEntranceType("web2");
                    }}
                  >
                    Access to the User Center via Web2 proxy
                  </button>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <Head>
        <title>User Center Entrance</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <_JSXStyle id="entry">{`body { background: "rgb(17 24 39)"; }`}</_JSXStyle> */}
      <div className=" sm:h-screen bg-gray-900 text-white flex flex-col justify-start md:justify-center items-center p-4">
        <div className="max-w-4xl py-20 ">
          <> {getEntrancePanel(entranceType)} </>
        </div>
      </div>
    </>
  );
};

export default Entry;
