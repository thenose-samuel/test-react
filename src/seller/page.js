import { useState } from "react";
import Footer from "../components/Footer";
import MintNFT from "./mint-nft";

export default function Seller() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div
        className={`absolute z-50 h-[100%] w-full ${
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
          className="w-screen pt-10 pl-24 pr-14 h-96 bg-gradient-to-b gradient from-orange-700 from-30% flex flex-col justify-between"
        >
          <div style={{ color: "#f2efce" }} className="flex justify-between ">
            <div className="cursor-pointer">GO BACK</div>
            <div className="flex-row flex">
              <div className="mr-12 cursor-pointer">INFO</div>
              <div className="mr-12 cursor-pointer">REDEEM</div>
              <div className="mr-12 cursor-pointer">HISTORY</div>
              <div className="cursor-pointer">LOGOUT</div>
            </div>
          </div>
          <div
            style={{ color: "#f2efce" }}
            className=" mb-20 font-bold text-7xl"
          >
            Seller
          </div>
        </div>
        <div style={{ color: "#f2efce" }} id="overview" className="pl-24 mt-10">
          <div className="text-3xl font-bold">Overview</div>
          <div className="text-2xl mt-2 font-regular tracking-wider">
            This is the seller's panel. Here, you can mint warranty nfts to your
            customers.
          </div>
          <MintNFT />
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
