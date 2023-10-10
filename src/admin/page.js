import contractABI from "../utils/abi.json";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { CONTRACT_ADDRESS } from "../utils/constants";

export default function Admin() {
  const [connectedWallet, setConnectedWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [sellers, setSellers] = useState(null);
  const [sellerName, setSellerName] = useState("");
  const [sellerWallet, setSellerWallet] = useState("");

  async function addSeller() {
    console.log(sellerName);
    console.log(sellerWallet);
    console.log(contract);
    await contract.methods.createTweet(sellerName).send({
      from: connectedWallet,
    });
  }

  async function connectWallet() {
    const accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        if (err.code === 4001) {
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
    setConnectedWallet(accounts[0]);
  }

  useEffect(() => {
    const Web3 = window.Web3;
    console.log("use effect");
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
    setContract(contract);
  }, []);

  async function getSellers() {
    console.log(contract);
    let data;
    try {
      data = await contract.methods
        .getSellers()
        .call({ gasPrice: "200000", from: connectedWallet });
    } catch (e) {
      console.log("An error occurred");
      console.log(e);
    }
    let names = data["0"];
    let addresses = data["1"];
    data = [];
    for (let i = 0; i < names.length; i++) {
      data.push({ name: names[i], address: addresses[i] });
    }
    setSellers(data);
  }

  return (
    <>
      <div
        className={`absolute h-[100%] w-full ${
          loading ? "block" : "hidden"
        } backdrop-blur-lg`}
      >
        <div className="flex flex-row  h-full justify-center text-center items-center text-white text-2xl font-bold">
          <div className="self-center duration-100 animate-bounce">
            Processing please wait...
          </div>
        </div>
      </div>
      <div
        style={{ backgroundColor: "#101014" }}
        className="h-screen overflow-x-hidden overflow-y-scroll w-screen"
      >
        <div
          id="top-section"
          className="w-screen pt-10 pl-24 pr-14 h-96 bg-gradient-to-b gradient from-cyan-700 from-30% flex flex-col justify-between"
        >
          <div style={{ color: "#f2efce" }} className="flex justify-between ">
            <div className="cursor-pointer">GO BACK</div>
            <div className="flex-row flex">
              <div className="mr-12 cursor-pointer">INFO</div>
              <div className="cursor-pointer">LOGOUT</div>
            </div>
          </div>
          <div
            style={{ color: "#f2efce" }}
            className=" mb-20 font-bold text-7xl"
          >
            Admin
          </div>
        </div>
        <div style={{ color: "#f2efce" }} id="overview" className="pl-24 mt-10">
          <div className="text-3xl font-bold">Overview</div>
          <div className="text-2xl mt-2 font-regular tracking-wider">
            Here you can manage the sellers that can issue the NFT-based
            warranties.
          </div>
          <div
            className={`font-bold text-xl mt-10 tracking-wider mb-2 ${
              connectedWallet.length == 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {connectedWallet.length == 0
              ? "Please connect your wallet"
              : `Connected Wallet Address: ${connectedWallet}`}
          </div>
          <div
            onClick={async () => {
              setLoading(true);
              await connectWallet();
              setLoading(false);
            }}
            className="font-thin w-40 text-center  pr-3 pl-3 cursor-pointer pt-2 pb-2 rounded-md text-md text-white bg-cyan-900 mt-2"
          >
            Connect Wallet
          </div>
          <div>
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
          </div>
          <div className="font-regular text-xl mt-5 tracking-wider mb-2">
            Previously Added Sellers{" "}
            <span
              onClick={async () => {
                setRefreshing(true);
                await getSellers();
                setRefreshing(false);
              }}
              className="text-neutral-600 font-bold ml-14 cursor-pointer hover:text-neutral-400 duration-300"
            >
              {refreshing ? "Please wait..." : "Refresh"}
            </span>
          </div>
          {sellers?.map((seller, index) => {
            return (
              <div
                key={index}
                className="bg-zinc-800 w-[50%] h-16 rounded-md mb-3"
              >
                <div className="flex h-full">
                  <div className="bg-cyan-700 rounded-tl-md rounded-bl-md text-cyan-700">
                    s
                  </div>
                  <div className="self-center ml-5">
                    <div>{`Address: ${seller.address}`}</div>
                    <div className="opacity-50">{`${seller.name}`}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
