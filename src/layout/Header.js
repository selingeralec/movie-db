import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography
} from '@material-ui/core';
import NavButton from '../components/NavButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    header: {
      backgroundColor: '#ffffff00'
    },
    root: {
      justifyContent: 'space-between',
    },
    links: {
      display: 'flex',
      justifyContent: 'space-around',
      flexGrow: 0.2,
    }
}));

const links = [
    {title: 'Movies', url: '/all'},
    {title: 'Shows', url: '/all-shows'},
    {title: 'People', url: '/people'},
    {title: 'Login', url: '/login', icon: <ExitToAppIcon />, alt: true}
];

export default function Header() {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.root}>
                <NavButton title={<Typography variant="h6">AGMTW</Typography>} url={'/'} />
            <div className={classes.links}>
                {links.map(link => (
                    <NavButton 
                        key={link.title}
                        alt={link.alt} 
                        icon={link.icon} 
                        title={link.title} 
                        url={link.url} 
                    />
                ))}
            </div>
            </Toolbar>
        </AppBar>        
    )
}
