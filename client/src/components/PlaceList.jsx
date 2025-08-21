import axios from "axios";
import { useState, useEffect } from "react";
import { Link,Circle } from 'lucide-react';

    function PlaceList ({filter,setFilter}) {

    const [placeList, setPlaceList] = useState([]);

    useEffect(() => {
        const fetchPlace = async() => {
            try {
                const result = await axios.get(
                    `http://localhost:4001/trips?keywords=${encodeURIComponent(filter)}`
                );
                setPlaceList(result.data.data)
            } catch (error) {
                console.error(error);
                
            }
        }

        fetchPlace()
    },[filter])

    const truncateText = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
      };

      function copyToClipboard(url) {
        navigator.clipboard.writeText(url).then(() => {
          alert("Copied: " + url);
        }).catch(err => {
          console.error("Failed to copy: ", err);
        });
      }

    return (
        <>
        {placeList.map((place) => (
            <div key={place.eid} className="flex flex-row items-start m-10 mx-auto w-300">
            <div className="w-100 h-80 overflow-hidden rounded-4xl flex-shrink-0">
                <img src={place.photos[0]} 
                alt="" 
                className="w-full h-full object-cover rounded-4xl" />
            </div>
            <div className="flex-1 ml-5">
                <p className="font-semibold text-2xl">
                    {place.title}
                </p>
                <p className="text-gray-500">
                    {truncateText(place.description, 100)}
                </p>
                <a 
                href={place.url}
                >
                    <p className="underline text-blue-400">อ่านต่อ</p>
                    </a>
                <div className="flex gap-2">
                <span className="text-gray-600">หมวด</span>
                {place.tags.map((tag, index) => (
                <span key={index}>
                <a
                    href="#"
                    className="underline text-gray-600 decoration-black"
                    onClick={(e) => {
                    e.preventDefault();
                    setFilter(prev => {
                const tagsArray = prev ? prev.split(" ").map(t => t.trim()) : [];
                const newTagsSet = new Set([...tagsArray, tag]);
                return Array.from(newTagsSet).join(" ");
                });
                }}
                >
                {tag}
                </a>
                {index < place.tags.length - 2 ? " " : ""}
                {index === place.tags.length - 2 ? " และ " : ""}
            </span>
            ))}
                </div>
                <div className="flex flex-row w-28 h-25 gap-5 mt-10">
                    <img src={place.photos[1]} alt="" className="w-full h-full object-cover rounded-xl"/>
                    <img src={place.photos[2]} alt="" className="w-full h-full object-cover rounded-xl"/>
                    <img src={place.photos[3]} alt="" className="w-full h-full object-cover rounded-xl"/>
                </div>
            </div>
            <a href="#" 
            className="relative"
            onClick={(e) => {
                e.preventDefault();
                copyToClipboard(place.url);
              }}
            >
            <Circle color="#27DDF5" size={50} className="absolute right-22.5 top-50"/>
            <Link color="#27DDF5" size={30} className="absolute right-25 top-52.5"/>
            </a>
            
            </div>
        ))}
        </>
    )
}

export default PlaceList;