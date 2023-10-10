import { useEffect, useState } from "react";
import UploadIcon from "./UploadIcon";
import { MINT_TOKEN } from "@/utils/constants";

export default function UploadComponent({
  productId,
  customerWallet,
  expireDate,
}) {
  const [base64, setBase64] = useState("");
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    console.log(base64);
  }, [base64]);
  return (
    <>
      {" "}
      <UploadIcon className="w-9 cursor-pointer hover:text-orange-500 duration-200"></UploadIcon>
      <input
        onChange={(e) => {
          convertImage(e.target.files[0], setBase64);
        }}
        style={{ color: "#f2efce" }}
        className="text-xs font-bold  mt-2 text-center"
        type="file"
      ></input>
      <div
        onClick={() => {
          uploadMetadata(productId, customerWallet, expireDate, base64);
        }}
        style={{ backgroundColor: "#f2efce", color: "black" }}
        className="text-sm font-bold text-center cursor-pointer mt-2 pt-2 pb-2 pr-4 w-16 pl-4 rounded-sm"
      >
        Done
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

async function uploadMetadata(productId, customerWallet, expireDate, image) {
  try {
    let metadata = {
      productId,
      customerWallet,
      expireDate: convertDateToTimestamp(expireDate),
      image,
    };
    const response = await fetch(MINT_TOKEN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metadata),
    });
  } catch (e) {}
}
