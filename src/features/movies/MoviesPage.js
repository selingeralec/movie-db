import React, { useEffect, useState } from 'react'
import { FormControlLabel, Grid, Hidden, List, ListItem, ListItemText, Paper, Typography, Switch } from '@material-ui/core'

import MediaCard from '../../components/MediaCard';

import * as MoviesApi from '../../api/moviesApi';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    advert: {
      display: 'flex',
      height: '20%',
      color: '#fff',
      backgroundColor: '#fe2603',
      padding: 20,
      fontWeight: 700
    }
});

function MoviesPage() {
    const classes = useStyles();
    const [top, setTop] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [popular, setPopular] = useState([]);

    const [onDisplay, setOnDisplay] = useState([]);
    const [gridTitle, setGridTitle] = useState('Top Rated Movies');

    const [sortLatest, setSortLatest] = useState(true);
    const [sortPopular, setSortPopular] = useState(false);

    const handleChange = (event) => {
        if(event.target.name === 'latest'){
            setSortLatest(!sortLatest);
            setSortPopular(false);
            setOnDisplay(onDisplay.sort((a, b) => b.release_date.substr(0, 4) - a.release_date.substr(0, 4)))
        }else{
            setSortLatest(false);
            setSortPopular(!sortPopular);
            setOnDisplay(onDisplay.sort((a, b) => b.vote_average - a.vote_average));
        }
    };

    const activeListItem = {
        color: '#fe2603',
        fontWeight: 700
    }
    
    useEffect(() => {
        async function getMovies(){
            await Promise.all([
                MoviesApi.getTopRatedMovies(),
                MoviesApi.getNowPlayingMovies(),
                MoviesApi.getUpcomingMovies(),
                MoviesApi.getPopularMovies()
            ])
            .then((response) => {
                setTop(response[0]);
                setNowPlaying(response[1]);
                setUpcoming(response[2]);
                setPopular(response[3]);
                
                setOnDisplay(response[0].sort((a, b) => b.release_date.substr(0, 4) - a.release_date.substr(0, 4)));
            })
        };
        getMovies();
    }, []);
    
    function changeDisplay(display){
        switch (display){
            case 'top':
                setOnDisplay(top);
                setGridTitle('Top Rated Movies')
                break;
            case 'now-playing':
                setOnDisplay(nowPlaying);
                setGridTitle('Now Playing in Theaters')
                break;
            case 'upcoming':
                setOnDisplay(upcoming);
                setGridTitle('Coming to Theaters Soon')
                break;
            default: 
                setOnDisplay(popular);
                setGridTitle('Popular Movies')
        }
    };

    let content;
    if(!popular || !popular.length){
        content = <p>Loading...</p>
    }else{
        content = <>
            {/* Grid for side-menu and MainGrid display */}
            <Grid container spacing={3}>
                <Grid item sm={3}>
                    <Paper>
                        <List>
                            <ListItem 
                                button
                                onClick={() => changeDisplay('top')}
                                >
                                <ListItemText
                                    primaryTypographyProps={onDisplay === top ? { style: activeListItem } : null}
                                    primary={"Top Rated"} 
                                />
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => changeDisplay('now-playing')}
                                >
                                <ListItemText
                                    primaryTypographyProps={onDisplay === nowPlaying ? { style: activeListItem } : null}
                                    primary={"Now Playing"}
                                />
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => changeDisplay('upcoming')}
                                >
                                <ListItemText
                                    primaryTypographyProps={onDisplay === upcoming ? { style: activeListItem } : null}
                                    primary={"Coming Soon"} 
                                />
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => changeDisplay('popular')}
                                >
                                <ListItemText
                                    primaryTypographyProps={onDisplay === popular ? { style: activeListItem } : null}
                                    primary={"Popular"} 
                                />
                            </ListItem>
                        </List>
                    </Paper>
                    <br />
                    <Paper elevation={3} className={classes.advert}>
                        Another Advert :'(
                    </Paper>
                </Grid>
                <Grid item sm={9} lg={8}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography 
                            variant="h6"
                            style={{ fontWeight: 800, color: '#444444', marginBottom: 10 }}
                        >
                            {gridTitle}
                        </Typography>
                        <div>
                        <FormControlLabel
                            control={
                            <Switch
                                checked={sortLatest}
                                onChange={handleChange}
                                name="latest"
                                color={sortLatest ? "primary" : "default"}
                            />
                            }
                            label="Latest"
                        />
                        <FormControlLabel
                            control={
                            <Switch
                                checked={sortPopular}
                                onChange={handleChange}
                                name="popularity"
                                color={sortPopular ? "primary" : "default"}
                            />
                            }
                            label="Popularity"
                        />
                        </div>
                    </div>
                    <Grid container spacing={4} style={{padding: '0px 10px'}}>
                        {onDisplay.map((movie, i) => (
                            <Grid item sm={12} md={6} lg={4} key={i}>
                                <MediaCard 
                                    date={movie.release_date} 
                                    id={movie.id}
                                    image={movie.backdrop_path} 
                                    title={movie.title} 
                                    overview={movie.overview}
                                    popularity={movie.vote_average}
                                />
                        </Grid>))}
                    </Grid>
                </Grid>
                <Hidden mdDown>
                    <Grid item lg={1}>
                        <Paper 
                            elevation={3}
                            className={classes.advert}
                        >
                            Advert :'(
                        </Paper>
                    </Grid>
                </Hidden>
            </Grid>
        </>
    }
    
    return (
        <div style={{padding: '10px'}}>
            {content}
        </div>
    )
}

export default MoviesPage
