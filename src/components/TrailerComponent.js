import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import youtube from '../api/youtubeApi';

function TrailerComponent({ title, year }) {
    //do youtube search for corresponding trailer
    const [videoId, setVideoId] = useState('');

    async function getTrailer(title, year){
        await youtube.get('/search', {
            params: {
                q: `${title} ${year} trailer`
            }
        })
        .then((res) => {
            setVideoId(res.data.items[0].id.videoId);
        })
        .catch((err) => console.log(err))
    };

    useEffect(() => {
        getTrailer(title, year)
    }, [title, year]);

    let content;
    if(!videoId){
        content = <CircularProgress />
    }else{
        content = <iframe 
                    src={`https://www.youtube.com/embed/${videoId}`} 
                    style={{ borderStyle: "none", width: "100%", height: "100%", marginBottom: 20, position: "relative" }}
                />
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default TrailerComponent
