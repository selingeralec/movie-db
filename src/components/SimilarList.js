import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    listItem:{
        '&:hover':{
            color: '#fe2603',
            cursor: 'pointer'
        }
    }
});

const getYear = (str) => str.substr(0, 4);

function MediaItem ({ id, image, title, year }) {
    const url = window.location.href;
    const history = useHistory();
    const classes = useStyles();

    return(
        <ListItem 
            className={classes.listItem}
            onClick={() => {
                if(!url.includes('shows')){
                    history.push('/all/' + id);
                }else{
                    history.push('/all-shows/' + id);
                }
            }}
        >
            <img 
                style={{width: 70, height: 70, borderRadius: 10, objectFit: 'cover', marginRight: 5}}
                src={`https://image.tmdb.org/t/p/w300/${image}`}
            />
            <ListItemText primary={`${title} (${year})`} />
        </ListItem>
    )
}

function SimilarList({ mediaArr }) {
    return (
        <div>
            <List>
                {mediaArr.map((media, i) => (
                    <MediaItem 
                        key={media.id}
                        id={media.id}
                        image={media.backdrop_path ? media.backdrop_path : media.poster_path}
                        title={media.title ? media.title : media.name}
                        year={media.release_date ? getYear(media.release_date) : getYear(media.first_air_date)}
                    />
                ))}
            </List>
        </div>
    )
}

export default SimilarList
