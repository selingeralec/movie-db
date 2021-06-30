import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER, API_KEY } from '../app/constants';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    hero: {
        width: '100%',
        height: '685px'
    },
    heroTitle: {
        position: 'absolute',
        textShadow: '1px 1px 5px rgba(0, 0, 0, 0.92)',
        fontWeight: 600,
        fontSize: 18,
        bottom: 20,
        right: 20,
        color: '#fff',
    },
    button: {
        backgroundColor: '#fe2603',
        color: '#fff',
        '&:hover':{
            backgroundColor: '#3f51b5'
        }
    }
}));


function HomePage() {
    const [background, setBackground] = useState('');
    const classes = useStyles();

    useEffect(() => {
        async function genBackground(){
            const mediaType = ['movie', 'tv'];
            const randomFour = Math.floor(Math.random() * (1 - 0) + 0);
            const randomTwenty = Math.floor(Math.random() * (20 - 0) + 0);
            await axios.get(`${SERVER}/3/trending/${mediaType[randomFour]}/week?${API_KEY}`)
            .then((res) => {
                const movie = res.data.results[randomTwenty];
                setBackground(movie);
            })
            .catch((err) => {
                console.log(err);
            });
        };
        genBackground();
    }, []);

    return (
        <>
            {/* HERO LANDING */}
            <div 
                className={classes.hero}
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${background.backdrop_path})`, backgroundPosition: 'center', backgroundSize: 'cover'}}
            >
            <div style={{position: 'absolute', bottom: '20%', left: '15%', display: 'flex', flexDirection: 'column', height: 200, justifyContent: 'space-around'}}>
                <Button
                    className={classes.button}
                    size="large"
                    variant="contained"
                    onClick={()=>console.log('clicked')}
                >
                    Random
                </Button>
                <Button
                    className={classes.button}
                    size="large"
                    variant="contained"
                    onClick={()=>console.log('clicked')}
                >
                    The Very Best
                </Button>
                <Button
                    className={classes.button}
                    size="large"
                    variant="contained"
                    onClick={()=>console.log('clicked')}
                >
                    All Movies
                </Button>
            </div>
            <div className={classes.heroTitle}>
                {background.title || background.name} ({background.media_type ? background.media_type === 'movie' ? background.release_date.substr(0, 4) : background.first_air_date.substr(0, 4) : null})
            </div>
            </div>
        </>
    )
}

export default HomePage

