import React from 'react'
import { AppBar, Toolbar, Button, Typography, Drawer, List, ListItem,ListItemIcon, ListItemText } from '@material-ui/core'
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import { makeStyles } from '@material-ui/core/styles';
import BookmarksTwoToneIcon from '@material-ui/icons/BookmarksTwoTone';
import ZoomInTwoToneIcon from '@material-ui/icons/ZoomInTwoTone';
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


const Navbar = ({ children }: { children: React.ReactNode}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Button disableRipple href="/add" startIcon={<MovieFilterIcon />} variant="contained" color="primary" disableElevation>
            <Typography variant="h6" noWrap>
              Filmsy
            </Typography>
          </Button>
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
            <ListItem button component="a" href="/">
              <ListItemIcon>
                <BookmarksTwoToneIcon/>
              </ListItemIcon>
                <ListItemText primary="Bookmarks" />
              </ListItem>
            <ListItem button component="a" href="/add">
              <ListItemIcon>
                <ZoomInTwoToneIcon/>
              </ListItemIcon>
                <ListItemText primary="Add Bookmark" />
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
