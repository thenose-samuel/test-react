import { useState } from "react";
import UploadComponent from "../components/UploadComponent";

export default function MintNFT() {
  const [customerWallet, setCustomerWallet] = useState("");
  const [productID, setProductId] = useState("");
  const [expireDate, setExpireDate] = useState("");
  return (
    <div className="mt-24">
      <div className="font-regular text-xl mt-5 tracking-wider">
        Customer's Wallet Address
      </div>
      <div className="w-96 mt-4 flex flex-col    mb-14">
        <input
          onChange={(e) => {
            setCustomerWallet(e.target.value);
          }}
          placeholder="Wallet address"
          className="placeholder:text-neutral-500 bg-transparent  rounded-md w-80 h-14 border-2 focus:ring-2 focus:outline-none text-neutral-300 font-regular text-md p-2"
        ></input>
        <div className="font-regular text-xl mt-5 tracking-wider">
          Expiration Date
        </div>
        <input
          onChange={(e) => {
            setExpireDate(e.target.value);
          }}
          placeholder="DD-MM-YYYY"
          className="placeholder:text-neutral-500 bg-transparent mt-3 rounded-md w-80 h-14 border-2 focus:ring-2 focus:outline-none text-neutral-300 font-regular text-md p-2"
        ></input>
        <div className="font-regular text-xl mt-5 tracking-wider">
          Product ID
        </div>
        <input
          onChange={(e) => {
            setProductId(e.target.value);
          }}
          placeholder="Enter the product ID"
          className="placeholder:text-neutral-500 bg-transparent mt-3 rounded-md w-80 h-14 border-2 focus:ring-2 focus:outline-none text-neutral-300 font-regular text-md p-2"
        ></input>
        <div className="font-regular text-xl mt-5 mb-3 tracking-wider">
          Upload Product Image
        </div>
        <UploadComponent
          productId={productID}
          customerWallet={customerWallet}
          expireDate={expireDate}
        />
      </div>
    </div>
  );
}
