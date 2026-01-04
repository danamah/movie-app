import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../Components/Loading/Loading";
import { Chip, Button } from "@heroui/react";

export default function MovieDetails() {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    useEffect(() => {
        async function getMovieDetails() {
            try {
                setLoading(true);
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=aaf255a531137cde991cf5d063b1707a`
                );
                setDetails(data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            } finally {
                setLoading(false);
            }
        }
        getMovieDetails();
    }, [id]);

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-screen bg-[#1a1a1a]">
                    <Loading />
                </div>
            ) : details ? (
                <div className="bg-[#1a1a1a] min-h-screen text-gray-200 relative overflow-x-hidden">
                    {details.backdrop_path && (
                        <div 
                            className="absolute top-0 left-0 w-full h-[60vh] bg-cover bg-center z-0 opacity-40 mask-image-b-transparent"
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
                                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)'
                            }}
                        ></div>
                    )}
                    
                    <div className="container mx-auto px-4 relative z-10 pt-32 pb-12">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="w-full md:w-1/3 lg:w-1/4">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 transform hover:scale-[1.02] transition-transform duration-300">
                                    <img
                                        src={
                                            details.poster_path
                                                ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                                                : "https://via.placeholder.com/500x750?text=No+Image"
                                        }
                                        alt={details.title || "Movie"}
                                        className="w-full h-auto block"
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-2/3 lg:w-3/4">
                                <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400 drop-shadow-md">
                                    {details.title || "Untitled"}
                                </h1>
                                {details.tagline && (
                                    <p className="text-xl text-[#e94560] italic font-medium mb-6">"{details.tagline}"</p>
                                )}
                                
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {details.genres?.map((genre) => (
                                        <Chip 
                                            key={genre.id} 
                                            variant="flat" 
                                            className="bg-[#e94560]/15 text-[#e94560] border border-[#e94560]/30 font-semibold backdrop-blur-sm"
                                        >
                                            {genre.name}
                                        </Chip>
                                    ))}
                                </div>

                                <div className="mb-10">
                                    <h3 className="text-2xl text-white font-bold mb-4 border-l-4 border-[#e94560] pl-3">Overview</h3>
                                    <p className="text-lg leading-relaxed text-gray-300 max-w-4xl">{details.overview || "No overview available"}</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/5 p-8 rounded-2xl backdrop-blur-md border border-white/5 mb-8">
                                    <div className="flex flex-col">
                                        <strong className="text-[#e94560] text-sm uppercase tracking-wide mb-1">Release Date</strong>
                                        <span className="text-white font-semibold text-lg">{details.release_date || "Unknown"}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <strong className="text-[#e94560] text-sm uppercase tracking-wide mb-1">Runtime</strong>
                                        <span className="text-white font-semibold text-lg">{details.runtime ? `${details.runtime} min` : "N/A"}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <strong className="text-[#e94560] text-sm uppercase tracking-wide mb-1">Status</strong>
                                        <span className="text-white font-semibold text-lg">{details.status || "Unknown"}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <strong className="text-[#e94560] text-sm uppercase tracking-wide mb-1">Language</strong>
                                        <span className="text-white font-semibold text-lg">{details.original_language?.toUpperCase() || "N/A"}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <strong className="text-[#e94560] text-sm uppercase tracking-wide mb-1">Rating</strong>
                                        <span className="text-white font-semibold text-lg">⭐ {details.vote_average?.toFixed(1) || "N/A"}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <strong className="text-[#e94560] text-sm uppercase tracking-wide mb-1">Vote Count</strong>
                                        <span className="text-white font-semibold text-lg">{details.vote_count || 0}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <strong className="text-[#e94560] text-sm uppercase tracking-wide mb-1">Budget</strong>
                                        <span className="text-white font-semibold text-lg">${details.budget?.toLocaleString() || "0"}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <strong className="text-[#e94560] text-sm uppercase tracking-wide mb-1">Revenue</strong>
                                        <span className="text-white font-semibold text-lg">${details.revenue?.toLocaleString() || "0"}</span>
                                    </div>
                                </div>

                                {details.homepage && (
                                    <Button
                                        as="a"
                                        href={details.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#e94560] text-white font-bold rounded-full px-8 py-3 hover:bg-transparent hover:text-[#e94560] border-2 border-[#e94560] shadow-[0_5px_15px_rgba(233,69,96,0.3)] hover:shadow-[0_8px_20px_rgba(233,69,96,0.4)] hover:-translate-y-0.5 transition-all"
                                    >
                                        Visit Official Website
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center my-5 text-white">
                    <h2>Movie not found or failed to load</h2>
                </div>
            )}
        </>
    );
}
