import { Link } from "react-router";
import { Card, Image } from "@heroui/react";

export default function MovieCard({ movie }) {
  const { id, poster_path, title, vote_average, release_date, overview } =
    movie || {};

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const posterUrl = poster_path
    ? imageBaseUrl + poster_path
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="w-full">
      <Link to={`/movie/${id}`} className="block h-full group">
        <Card className="h-full bg-[#1a1a2e] border-none overflow-hidden relative group-hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-[#e94560]/20">
          <div className="absolute top-2 right-2 z-20 bg-[#e94560] text-white px-2 py-1 rounded text-sm font-bold shadow-md">
            {vote_average?.toFixed(1) || "N/A"}
          </div>
          <div className="relative w-full aspect-2/3">
             <Image
              removeWrapper
              alt={title || "Movie"}
              className="z-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-30"
              src={posterUrl}
            />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center z-10">
            <h3 className="text-white text-lg font-bold mb-2">{title || "Untitled"}</h3>
            <p className="text-[#e94560] font-semibold text-sm mb-2">{release_date || "Unknown"}</p>
            <p className="text-gray-300 text-xs line-clamp-4">
              {overview || "No overview available"}
            </p>
          </div>
        </Card>
      </Link>
    </div>
  );
}
