import React from 'react'
import { Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    altButton:{
        color: '#3f51b5',
        fontWeight: 600,
        fontSize: '16px',
        textTransform: 'none',
        textDecoration: 'none',
        '&:hover':{
            backgroundColor: '#ffffff00',
            color: '#fe2603'
          }
      },
    button: {
      backgroundColor: '#ffffff00',
      color: '#66666c',
      fontWeight: 600,
      fontSize: '16px',
      textTransform: 'none',
      textDecoration: 'none',
      '&:hover':{
          backgroundColor: '#ffffff00',
          color: '#fe2603'
      }
    },
    selected: {
        color: '#fe2603'
    }
}));

export default function NavButton({ alt, icon, title, url }){
    const classes = useStyles();

    return (
        <div>
            <Button 
                size="small"
                activeClassName={classes.selected}
                className={!alt ? classes.button : classes.altButton}
                component={NavLink}
                to={url}
                startIcon={icon ? icon : null}
            >
                {title}
            </Button>
        </div>
    )
}
