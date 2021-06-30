import axios from 'axios';
import { API_KEY, SERVER } from '../app/constants';

export const getPopularMovies = () =>{
    const url = `${SERVER}/3/movie/popular?${API_KEY}&language=en-US&page=1`;
    return axios.get(url)
    .then((res) => {
        return res.data.results
    })
    .catch((error) => { throw error });
}

export const getNowPlayingMovies = () => {
    const url = `${SERVER}/3/movie/now_playing?${API_KEY}&language=en-US&page=1`;
    return axios.get(url)
    .then((res) => {
        return res.data.results
    })
    .catch((error) => { throw error });
}

export const getTopRatedMovies = () => {
    const pageNmbr = Math.floor(Math.random() * (7 - 0) + 1);
    const url = `${SERVER}/3/movie/top_rated?${API_KEY}&language=en-US&page=${pageNmbr}`;
    return axios.get(url)
    .then((res) => {
        return res.data.results
    })
    .catch((error) => { throw error });
}

export const getUpcomingMovies = () =>{
    const url = `${SERVER}/3/movie/upcoming?${API_KEY}&language=en-US&page=1`;
    return axios.get(url)
    .then((res) => {
        return res.data.results
    })
    .catch((error) => { throw error });
}

export const getSimilarMovies = (id) => {
    const url = `${SERVER}/3/movie/${id}/recommendations?${API_KEY}&language=en-US&page=1`;
    return axios.get(url)
    .then((res) => {
        return res.data.results
    })
    .catch((error) => { throw error });
}

export const getMovieDetails = (id) => {
    const url = `${SERVER}/3/movie/${id}?${API_KEY}&language=en-US&page=1`;
    return axios.get(url)
    .then((res) => {
        return res.data
    })
    .catch((error) => { throw error });
}
