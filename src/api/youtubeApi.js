import axios from 'axios';
import { YOUTUBE_KEY } from '../app/constants';

export default axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3",
    params: {
        part: "snippet",
        maxResults: 1,
        type: "video",
        key: YOUTUBE_KEY
    }
});
