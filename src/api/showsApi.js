import axios from 'axios';
import { API_KEY, SERVER } from '../app/constants';

export const getPopularShows = () => {
    const url = `${SERVER}/3/tv/popular?${API_KEY}&language=en-US&page=1`;
    return axios.get(url)
    .then((res) => {
        return res.data.results
    })
    .catch((error) => { throw error });
}

export const getTopRatedShows = () => {
    const pageNmbr = Math.floor(Math.random() * (7 - 0) + 1);
    const url = `${SERVER}/3/tv/top_rated?${API_KEY}&language=en-US&page=${pageNmbr}`;
    return axios.get(url)
    .then((res) => {
        return res.data.results
    })
    .catch((error) => { throw error });
}

export const getNowShowingShows = () =>{
    const url = `${SERVER}/3/tv/on_the_air?${API_KEY}&language=en-US&page=1`;
    return axios.get(url)
    .then((res) => {
        return res.data.results
    })
    .catch((error) => { throw error });
}

export const getSimilarShows = (id) => {
    const url = `${SERVER}/3/tv/${id}/similar?${API_KEY}&language=en-US&page=1`;
    return axios.get(url)
    .then((res) => {
        return res.data.results
    })
    .catch((error) => { throw error });
}

export const getShowDetails = (id) => {
    const url = `${SERVER}/3/tv/${id}?${API_KEY}&language=en-US&page=1`;
    return axios.get(url)
    .then((res) => {
        return res.data
    })
    .catch((error) => { throw error });
}
