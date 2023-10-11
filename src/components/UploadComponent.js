import { useEffect, useRef, useState } from "react";
import UploadIcon from "./UploadIcon";
import contractABI from "../utils/abi.json";
import { CONTRACT_ADDRESS } from "../utils/constants";
// import { MINT_TOKEN } from "@/utils/constants";

export default function UploadComponent({
  productId,
  customerWallet,
  expireDate,
}) {
  const [base64, setBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState("");
  const [contract, setContract] = useState(null);

  const urlPromoRef = useRef();

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
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
    setContract(contract);
  }, []);

  async function mintNFT(customerWallet, tokenURI) {
    await contract.methods
      .mintNFT(customerWallet, tokenURI)
      .send({ from: connectedWallet });
  }

  async function uploadMetadata(productId, customerWallet, expireDate, image) {
    try {
      const form = new FormData();
      form.append("file", dataURItoBlob(image));
      let options = {
        method: "POST",
        body: form,
        headers: {
          Authorization: "80205640-3cfb-4268-b494-f515f791964b",
        },
      };
      let response = await fetch("https://api.nftport.xyz/v0/files", options);
      let data = await response.json();
      const imgURI = data.ipfs_url;
      let metadata = {
        name: "Warranty NFT",
        description: "Minted for a product sold to a customer",
        file_url: imgURI,
        custom_fields: {
          productId: productId,
          customerWallet: customerWallet,
          expireDate: convertDateToTimestamp(expireDate),
        },
      };
      options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: " 80205640-3cfb-4268-b494-f515f791964b",
        },
        body: JSON.stringify(metadata),
      };
      response = await fetch("https://api.nftport.xyz/v0/metadata", options);
      data = await response.json();
      let tokenURI = data.metadata_uri;
      tokenURI = "ipfs.io/ipfs/" + tokenURI.slice(7, tokenURI.length);
      return tokenURI;
    } catch (e) {
      console.log(e);
    }
  }

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }
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
      </div>{" "}
      <UploadIcon className="w-9 cursor-pointer hover:text-orange-500 duration-200"></UploadIcon>
      <input
        ref={urlPromoRef}
        onChange={(e) => {
          convertImage(e.target.files[0], setBase64);
        }}
        style={{ color: "#f2efce" }}
        className="text-xs font-bold  mt-2 text-center"
        type="file"
      ></input>
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
        className="font-thin w-40 text-center mb-4  pr-3 pl-3 cursor-pointer pt-2 pb-2 rounded-md text-md text-white bg-orange-700 mt-2"
      >
        Connect Wallet
      </div>
      <div
        onClick={async () => {
          setLoading(true);
          const tokenURI = await uploadMetadata(
            productId,
            customerWallet,
            expireDate,
            base64
          );
          await mintNFT(customerWallet, tokenURI);
          setLoading(false);
        }}
        style={{ backgroundColor: "#f2efce", color: "black" }}
        className="font-bold text-center w-80  pr-3 pl-3 cursor-pointer pt-2 pb-2 rounded-md text-md text-white bg-orange-700"
      >
        MINT NFT
      </div>
    </>
  );
}

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

async function convertImage(image, setBase64) {
  const result = await convertBase64(image);
  setBase64(result);
}

function convertDateToTimestamp(expireDate) {
  const date = new Date(expireDate);
  return date.getTime();
}
