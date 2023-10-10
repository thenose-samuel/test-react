export default function PreviousAddedSeller({ data }) {
  console.log(data);
  return (
    <>
      {/* //remove later */}
      <div className="bg-zinc-800 w-96 h-16 rounded-md mb-3">
        <div className="flex h-full">
          <div className="bg-cyan-700 rounded-tl-md rounded-bl-md text-cyan-700">
            s
          </div>
          <div className="self-center ml-5">
            <div>Address: asdadwqr32fsf003204324</div>
            <div className="opacity-50">SHUKLA RAHUL</div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-800 w-96 h-16 rounded-md mb-3">
        <div className="flex h-full">
          <div className="bg-cyan-700 rounded-tl-md rounded-bl-md text-cyan-700">
            s
          </div>
          <div className="self-center ml-5">
            <div>Address: asdadwqr32fsf003204324</div>
            <div className="opacity-50">NISHANT KUMAR</div>
          </div>
        </div>
      </div>
    </>
  );
}
