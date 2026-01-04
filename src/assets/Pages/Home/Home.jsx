import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../../Components/MovieCard/MovieCard";
import Loading from "../../Components/Loading/Loading";

export default function Home() {
  const [popMovies, setPopMovies] = useState(null);
  const [topRatMovies, setTopRatMovies] = useState(null);
  const [upComeMovies, setUpComeMovies] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = "aaf255a531137cde991cf5d063b1707a";

  async function getPopMovies(apiKey) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      setPopMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  }
  async function getTopRatingMovies(apiKey) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
      );
      setTopRatMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  }
  async function getUpComeMovies(apiKey) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
      );
      setUpComeMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchHomeData() {
      setLoading(true);
      try {
        await Promise.all([
          getPopMovies(apiKey),
          getTopRatingMovies(apiKey),
          getUpComeMovies(apiKey),
        ]);
        // Make the user feel the delay
        await new Promise((resolve) => setTimeout(resolve, 600));
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHomeData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-[#1a1a1a]">
          <Loading />
        </div>
      ) : (
        <div className="bg-[#1a1a1a] min-h-screen text-white pb-12">
          {/* Popular Movies Section */}
          <div className="container mx-auto px-4 py-8 mb-12">
            <h1 className="text-3xl font-bold text-[#e94560] mb-6 uppercase tracking-wider relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-[50px] after:h-[3px] after:bg-[#e45c73]">
              Popular Movies
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popMovies?.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </div>

          {/* Top Rated Movies Section */}
          <div className="container mx-auto px-4 py-8 mb-12">
            <h1 className="text-3xl font-bold text-[#e94560] mb-6 uppercase tracking-wider relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-[50px] after:h-[3px] after:bg-[#e45c73]">
              Top Rating Movies
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {topRatMovies?.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </div>

          {/* Upcoming Movies Section */}
          <div className="container mx-auto px-4 py-8 mb-12">
            <h1 className="text-3xl font-bold text-[#e94560] mb-6 uppercase tracking-wider relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-[50px] after:h-[3px] after:bg-[#e45c73]">
              Upcoming Movies
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {upComeMovies?.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
