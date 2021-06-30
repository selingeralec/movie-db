import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CircularProgress, Container, Grid, Hidden, Typography } from '@material-ui/core';

import { getMovieDetails, getSimilarMovies } from '../api/moviesApi';
import { getShowDetails, getSimilarShows } from '../api/showsApi';

import SimilarList from '../components/SimilarList';
import TitleCard from '../components/TitleCard';
import TrailerComponent from '../components/TrailerComponent';

function DetailPage() {
    let { id } = useParams();
    const url = window.location.href;
    const [details, setDetails] = useState('');
    const [similar, setSimilar] = useState('');

    async function fetchMovieDetails(id){
        await Promise.all([
            getMovieDetails(id),
            getSimilarMovies(id)
        ])
        .then((res) => (
            setDetails(res[0]),
            setSimilar(res[1])
        ))
        .catch((err) => console.log(err))
    };

    async function fetchShowDetails(id){
        await Promise.all([
            getShowDetails(id),
            getSimilarShows(id)
        ])
        .then((res) => (
            console.log(res),
            setDetails(res[0]),
            setSimilar(res[1])
        ))
        .catch((err) => console.log(err))
    };


    useEffect(() => {
        if(url.includes('shows')){
            fetchShowDetails(id);
        }else{
            fetchMovieDetails(id);
        }
    }, [url]);

    let content; 
    if(!details || !similar.length){
        content = <CircularProgress />
    }else{
        content = (
            <div style={{padding: 15}}>
                <Container maxWidth="xl">
                    <TitleCard 
                        title={url.includes('show') ? details.name : details.title} 
                        genres={details.genres}
                        year={url.includes('show') ? details.first_air_date.substr(0, 4) : details.release_date.substr(0, 4)}
                        rating={details.vote_average}
                    />
                    <Grid container>
                        <Grid item xs={12} md={9} lg={8} style={{ padding: '0 4%', borderRight: '1px solid #bfbfbf', marginTop: 20 }}>
                            <TrailerComponent 
                                title={url.includes('show') ? details.name : details.title} 
                                year={url.includes('show') ? details.first_air_date.substr(0, 4) : details.release_date.substr(0, 4)}
                            />
                            <Typography variant="body1">{details.overview}</Typography>
                        </Grid>
                        <Hidden smDown>
                        <Grid item lg={4} md={3}>
                            <SimilarList 
                                mediaArr={similar} 
                            />
                        </Grid>
                        </Hidden>
                    </Grid>
                    <Hidden mdUp>
                        <SimilarList 
                                mediaArr={similar} 
                        />
                    </Hidden>
                </Container>
            </div>
        )
    }
    return (
        <>
            {content}
        </>
    )
}

export default DetailPage

