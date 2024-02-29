import axios from 'axios';

const apiKey = 'e6b6c8af914a6106c49c3b6632be77bd';
const baseURL = 'https://api.themoviedb.org/3';

export const searchMovies = async (query) => {
  const response = await axios.get(`${baseURL}/search/movie`, {
    params: {
      api_key: apiKey,
      query,
    },
  });
  return response.data.results;
};