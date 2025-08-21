import PlaceList from "./PlaceList.jsx";
import { useState } from "react";

function HomePage () {
    const [filter, setFilter] = useState("");

    return (
        <>
        <h1 className="text-4xl text-center text-blue-400 mt-10 font-bold">
            เที่ยวไหนดี
        </h1>
        <div className="flex flex-col items-center text-start mt-5 mb-30">
            <div className="relative w-350 ">
            <p className="absolute left-2 top-2 text-sm">
                ค้นหาที่เกี่ยวข้อง
            </p>
            <input 
                type="text"
                className="absolute border-b border-black w-full pt-5 px-2 mt-3 text-left placeholder-shown:text-center pb-2 outline-none"
                placeholder="หาที่เที่ยวแล้วไปกัน ..."
                value={filter}
                onChange={(e) => {
                    setFilter(e.target.value)
                }}
             />
            </div>
        </div>
        <PlaceList filter={filter} setFilter={setFilter}/>
        </>
    )
}

export default HomePage;