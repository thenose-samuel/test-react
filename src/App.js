import Admin from "./admin/page";

export default function App() {
  return <Admin></Admin>;
}

// <>
//       <div
//         style={{ backgroundColor: "#101014" }}
//         className="h-screen overflow-x-hidden overflow-y-scroll w-screen"
//       >
//         <div
//           id="top-section"
//           className="w-screen pt-10 pl-24 pr-14 h-96 bg-gradient-to-b gradient from-cyan-700 from-30% flex flex-col justify-between"
//         >
//           <div style={{ color: "#f2efce" }} className="flex justify-between ">
//             <div className="cursor-pointer">GO BACK</div>
//             <div className="flex-row flex">
//               <div className="mr-12 cursor-pointer">INFO</div>
//               <div className="cursor-pointer">LOGOUT</div>
//             </div>
//           </div>
//           <div
//             style={{ color: "#f2efce" }}
//             className=" mb-20 font-bold text-7xl"
//           >
//             Admin
//           </div>
//         </div>
//         <div style={{ color: "#f2efce" }} id="overview" className="pl-24 mt-10">
//           <div className="text-3xl font-bold">Overview</div>
//           <div className="text-2xl mt-2 font-regular tracking-wider">
//             Here you can manage the sellers that can issue the NFT-based
//             warranties.
//           </div>
//           <div>
//             <AddSeller />
//           </div>
//           <div className="font-regular text-xl mt-5 tracking-wider mb-2">
//             Previously Added Sellers
//           </div>
//           <PreviousAddedSeller />
//         </div>

//         <Footer></Footer>
//       </div>
//     </>
