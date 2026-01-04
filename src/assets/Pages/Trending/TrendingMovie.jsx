import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import MovieCard from "../../Components/MovieCard/MovieCard";

export default function TrendingMovie() {
  const [trending, setTrending] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getTrendingMovies() {
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/week",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWYyNTVhNTMxMTM3Y2RlOTkxY2Y1ZDA2M2IxNzA3YSIsIm5iZiI6MTc2NTgyMDg0MS40NjMsInN1YiI6IjY5NDA0OWE5ODdmNjNhMmI2ZGVlYzllZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XUFLU9h_u7h2NJxE044eVjoemp0ubdIitVUujqbtRF8",
            accept: "application/json",
          },
        }
      );
      setTrending(data.results);
    } catch (error) {
      console.error(
        "Error fetching trending movies:",
        error.response?.data || error.message
      );
    }
  }

  useEffect(() => {
    async function fetchTrendingMovies() {
      setLoading(true);
      try {
        await getTrendingMovies();
        // Make the user feel the delay
        await new Promise((resolve) => setTimeout(resolve, 600));
      } catch (error) {
        console.log("Error Fetching trending page:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrendingMovies();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-[#1a1a1a]">
          <Loading />
        </div>
      ) : (
        <div className="bg-[#1a1a1a] min-h-screen text-white pb-12">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-[#e94560] mb-8 uppercase tracking-wider border-b-2 border-[#e45c73] inline-block pb-1">
              Trending Movies
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {trending?.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
