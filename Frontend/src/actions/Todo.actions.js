import axios from "axios";

const baseApiResponse = (data, isSuccess) => {
  return {
    success: isSuccess,
    data: data || null,
  };
};

export const fetchMoviesWithAxios = async () => {
  try {
    const apiParams = new URLSearchParams();
    apiParams.append("api_key", import.meta.env.VITE_API_KEY);

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movie/popular`,
      { params: apiParams }
    );

    //NOTE : Axios will return the data in response.data

    //From the API we see that all the movies information is in the response.data.results

    console.log("Response from Backend");
    console.log(response.data);

    return baseApiResponse(response.data.results, true);
  } catch (error) {
    console.error(error);
    return baseApiResponse(null, false);
  }
};

//Create getMovieDetails API Here
export const getMovieDetails = async (movieId) => {};

// export const fetchMoviesWithFetch = async () => {
//   try {
//     const apiParams = new URLSearchParams();
//     apiParams.append("api_key", import.meta.env.VITE_API_KEY);

//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL}/movie/popular?${apiParams.toString()}`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch movies");
//     }

//     const data = await response.json();

//     console.log("Response from Backend");
//     console.log(data);

//     return baseApiResponse(data.results, true);
//   } catch (error) {
//     console.error(error.message);
//     return baseApiResponse(null, false);
//   }
// };
