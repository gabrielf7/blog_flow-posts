import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from './../../Api';

import { 
  Container, Grid, CssBaseline, makeStyles, Drawer,
  Toolbar, List, Typography, Divider, IconButton, 
  Box, AppBar, TextField, Button, Paper
}from '@material-ui/core';

import clsx from 'clsx';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import { mainListItems, secondaryListItems } from './../../components/listItems';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a color="inherit" href="https://material-ui.com/">
        Todos os direitos reservados ao Flow POSTS
      </a>{' - '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 350,
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 40,
    height: 40,
  },
  TextField: {
    paddingBottom: 10,
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const history = useHistory();
  const [posts, setPosts] = useState('');

  if(!(localStorage.getItem('flowEmail', 'flowSenha'))){
    history.push('/');
  }

  const [de, setDe] = useState('');
  const [para, setPara] = useState('');
  const [assunto, setAssunto] = useState('');
  const [textoGrande, setTextoGrande] = useState('');

  useEffect(() => {
    api.get(
      '/posts/listar_post'
    ).then(response => {
      setPosts(response.data);
    })
  });

  // {posts.map(post => (

  async function HandleSubmit(){
    try{
      const data = {
        de: de,
        para: para,
        assunto: assunto,
        textoGrande: textoGrande,
      };
      console.log(data)
      const resposta = await api.post("/posts/new_post", data);
      if(resposta.status === 200){
        alert('Post foi criado');
      }

    } catch (err) {
      alert('Houve uma falha ao criar o Post');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Flow POSTS
          </Typography>
          <IconButton onClick={handleLogout} color="inherit">
            <WhatshotIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Post */}
            <Grid item xs={12} md={10} lg={12}>
              <Paper className={fixedHeightPaper}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="outlined-basic"
                  label="De"
                  type="text"
                  value={de} 
                  onChange={e=>setDe(e.target.value)}
                  className={classes.TextField}
                  required
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  id="outlined-basic"
                  label="Para"
                  type="text"
                  value={para} 
                  onChange={e=>setPara(e.target.value)}
                  className={classes.TextField}
                  required
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  id="outlined-basic"
                  label="Assunto"
                  type="text"
                  value={assunto} 
                  onChange={e=>setAssunto(e.target.value)}
                  className={classes.TextField}
                  required
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  id="outlined-basic"
                  label="Mensagem"
                  type="text"
                  value={textoGrande} 
                  onChange={e=>setTextoGrande(e.target.value)}
                  className={classes.TextField}
                  required
                />
                <Button
                  size="medium"
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={HandleSubmit}
                >
                  Confirmar
                </Button>
              </Paper>
            </Grid>
            {/* Recent Posts */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                Recentes Posts
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}