import React, { useEffect, useState } from 'react';
import { FormControlLabel, Grid, Hidden, List, ListItem, ListItemText, Paper, Typography, Switch } from '@material-ui/core';
import * as ShowsApi from '../../api/showsApi';
import MediaCard from '../../components/MediaCard';
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


function ShowsPage() {
    const classes = useStyles();
    const [top, setTop] = useState([]);
    const [nowShowing, setNowShowing] = useState([]);
    const [popular, setPopular] = useState([]);
    
    const [onDisplay, setOnDisplay] = useState([]);
    const [gridTitle, setGridTitle] = useState('Top Rated Shows');

    const [sortLatest, setSortLatest] = useState(true);
    const [sortPopular, setSortPopular] = useState(false);

    const handleChange = (event) => {
        if(event.target.name === 'latest'){
            setSortLatest(!sortLatest);
            setSortPopular(false);
            setOnDisplay(onDisplay.sort((a, b) => b.first_air_date.substr(0, 4) - a.first_air_date.substr(0, 4)));
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
        async function getShows(){
            await Promise.all([
                ShowsApi.getTopRatedShows(),
                ShowsApi.getNowShowingShows(),
                ShowsApi.getPopularShows()
            ])
            .then((response) => {
                setTop(response[0]);
                setNowShowing(response[1]);
                setPopular(response[2]);
                
                setOnDisplay(response[0].sort((a, b) => b.first_air_date.substr(0, 4) - a.first_air_date.substr(0, 4)));
            })
        };
        getShows();
    }, []);

    function changeDisplay(display){
        switch (display){
            case 'top':
                setOnDisplay(top);
                setGridTitle('Top Rated Shows')
                break;
            case 'now-showing':
                setOnDisplay(nowShowing);
                setGridTitle('Shows On the Air')
                break;
            default: 
                setOnDisplay(popular);
                setGridTitle('Popular Shows')
        }
    };

    return (
        <div style={{padding: 15}}>
            {/* Grid for side-menu and MainGrid display */}
            <Grid container spacing={3}>
                <Grid item sm={3}>
                    <Paper elevation={3}>
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
                                onClick={() => changeDisplay('now-showing')}
                            >
                                <ListItemText 
                                    primaryTypographyProps={onDisplay === nowShowing ? { style: activeListItem } : null}
                                    primary={"Now Showing"} 
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
                    <Grid container spacing={2}>
                        {onDisplay.map((show, i) => (
                        <Grid item sm={12} md={6} lg={4} key={i}>
                            <MediaCard 
                                date={show.first_air_date} 
                                id={show.id}
                                image={show.backdrop_path ? show.backdrop_path : show.poster_path}
                                title={show.name}
                                overview={show.overview}
                                popularity={show.vote_average}
                            />
                        </Grid>))}
                    </Grid>
                </Grid>
                <Hidden mdDown>
                    <Grid item lg={1}>
                        <Paper className={classes.advert}>
                            Advert :'(
                        </Paper>
                    </Grid>
                </Hidden>
            </Grid>
        </div>
    )
}

export default ShowsPage
