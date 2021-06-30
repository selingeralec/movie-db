import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, CardActions, Chip, IconButton, Typography } from '@material-ui/core';
import { Clear, Favorite, ThumbDownAlt, ThumbUpAlt } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';

const useStyles = makeStyles({
    media: {
      height: 200,
    },
    mediaCard:{
        borderRadius: '12px'
    },
    title: {
        fontWeight: 600,
        color: '#444',
        '&:hover':{
            color: '#fe2603'
        }
    },
    comma: {
        fontSize: 25,
        fontWeight: 600,
        color: '#7a7a7a',
        paddingRight: 4
    }
  });

function trunc(str){
    if(str.length > 90){
        return `${str.substr(0, 90)}...`
    }else{
        return str
    }
}

function MediaCard({ date, id, image, title, overview, popularity }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    return (
        <Card 
            variant="outlined" 
            className={classes.mediaCard}
            onClick={() => { history.push(location.pathname + '/' + id) }}
        >
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={`https://image.tmdb.org/t/p/w780/${image}`}
                    title={title}
                />
                <CardContent>
                <Typography gutterBottom variant="h6" component="h2" className={classes.title}>
                    {title}<span className={classes.comma}>,</span>{date.substr(0, 4)}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {trunc(overview)}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <IconButton aria-label="add to favorites" size="small">
                        <Clear fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                        <Favorite fontSize="small" />
                    </IconButton>
                </div>
                <div>
                    <Chip
                        icon={popularity > 7.5 ? 
                            <ThumbUpAlt color="primary" /> : 
                            popularity < 5.5 ? 
                            <ThumbDownAlt />: 
                            null}
                        label={popularity}
                    />
                </div>
            </CardActions>
        </Card>
    )
}

export default MediaCard
