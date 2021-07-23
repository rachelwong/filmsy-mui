import React from 'react'
import { AppBar, Toolbar, Container, IconButton, Typography, Grid, Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core'
import MovieFilterIcon from '@material-ui/icons/MovieFilter';

import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
}));


const Navbar = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
              <ListItem button>
                <ListItemText primary="Bookmarks" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Search" />
              </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        { children }
      </main>
    </div>
  )
}

export default Navbar
