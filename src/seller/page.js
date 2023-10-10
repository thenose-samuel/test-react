import Footer from "../components/Footer";
import MintNFT from "./mint-nft";

export default function Seller() {
  return (
    <>
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
            customers and other configuration controls.
          </div>
          <MintNFT />
        </div>

        <Footer></Footer>
      </div>
    </>
  );
}
