import { HashLoader } from "react-spinners";

export default function Loading() {
    return (
        <div className="flex justify-center items-center -mt-28 h-screen"><HashLoader
            color="#09e8cd"
            size={50}
        /></div>
    )
}