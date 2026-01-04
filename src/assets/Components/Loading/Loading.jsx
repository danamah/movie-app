import {Spinner} from "@heroui/react";
import { FaFilm } from "react-icons/fa6";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#1a1a1a]">
      <div className="text-center">
        <Spinner 
          size="lg" 
          color="danger" 
          classNames={{
            wrapper: "w-14 h-14"
          }}
        />
        <div className="mt-4 flex items-center justify-center gap-2 text-white/80">
          <FaFilm className="text-2xl text-[#f31260] animate-bounce" />
          <h5 className="mb-0 text-xl font-medium">Loading...</h5>
        </div>

        <p className="mt-2 text-sm text-white/60">Please wait while we fetch movies.</p>
      </div>
    </div>
  )
}
