// * api key: aaf255a531137cde991cf5d063b1707a
// * URL: https://api.themoviedb.org/3/trending/movie/week?api_key=aaf255a531137cde991cf5d063b1707a

import axios from "axios";

export async function registerUser(formData) {
  const data = await axios.post(
    `https://linked-posts.routemisr.com/users/signup`,
    formData
  );
  return data;
}
export async function loginUser(formData) {
  const data = await axios.post(
    `https://linked-posts.routemisr.com/users/signin`,
    formData
  );
  return data;
}
