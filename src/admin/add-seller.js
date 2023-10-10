"use client";

import { useEffect, useState } from "react";
import Web3 from "web3";
import contractABI from "../../utils/abi.json";
import { CONTRACT_ADDRESS } from "@/utils/constants";

export default function AddSeller({ connectedWallet }) {
  const [sellerWallet, setSellerWallet] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);

  async function addSeller() {
    console.log(sellerName);
    console.log(sellerWallet);
    // let response = await contract.methods
    //   .addSeller(sellerWallet, sellerName)
    //   .send({ from: connectedWallet });
    // console.log(response);
  }

  useEffect(() => {
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
    setContract(contract);
  }, []);

  return (
    <>
      <div
        className={`absolute z-50 top-0 left-0 h-[100%] w-full ${
          loading ? "block" : "hidden"
        } backdrop-blur-lg`}
      >
        <div className="flex flex-row  h-full justify-center text-center items-center text-white text-2xl font-bold">
          <div className="self-center duration-100 animate-bounce">
            Processing please wait...
          </div>
        </div>
      </div>
      <div className="mt-24">
        <div className="font-regular text-xl mt-5 tracking-wider">
          Seller's Wallet Address
        </div>
        <div className="w-[40%] mt-4 flex flex-row items-center mb-14">
          <input
            onChange={(e) => {
              setSellerWallet(e.target.value);
            }}
            placeholder="Wallet address"
            className="placeholder:text-neutral-500 bg-transparent  rounded-md w-64 h-14 border-2 focus:ring-2 focus:outline-none text-neutral-500 font-regular text-md p-2"
          ></input>
          <input
            onChange={(e) => {
              setSellerName(e.target.value);
            }}
            placeholder="Seller Name"
            className="placeholder:text-neutral-500 bg-transparent ml-14 rounded-md w-64 h-14 border-2 focus:ring-2 focus:outline-none text-neutral-500 font-regular text-md p-2"
          ></input>
          <div
            onClick={async () => {
              setLoading(true);
              await addSeller();
              setLoading(false);
            }}
            className="font-thin text-center  pr-3 pl-3 cursor-pointer pt-2 pb-2 rounded-md text-md text-white bg-cyan-900 ml-5"
          >
            Add Seller
          </div>
        </div>
      </div>
    </>
  );
}
