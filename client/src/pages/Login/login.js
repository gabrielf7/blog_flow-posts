import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import api from './../../Api';

import { Link, useHistory } from 'react-router-dom';

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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  
  if((localStorage.getItem('flowEmail', 'flowSenha'))){
    history.push('/dashboard');
  }

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin() {
    try{
      const data = { email: email, senha: senha };
      const resposta = await api.post("/autenticacao/", data);
      
      localStorage.setItem('flowEmail', email);
      localStorage.setItem('flowSenha', senha);

      if(resposta.status === 200){
        history.push('/dashboard');
      }
    } catch (err) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entrar com Login
        </Typography>
        <form className={classes.form}>
          <TextField
            fullWidth
            variant="outlined"
            id="outlined-basic"
            label="Email"
            type="email"
            value={email} 
            onChange={e=>setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            id="password"
            label="Senha"
            variant="outlined"
            margin="normal"
            type="password"
            autoComplete="password"
            value={senha} 
            onChange={e=>setSenha(e.target.value)}
            required
          />
          {/* type="submit" */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Confirmar
          </Button>
          <Grid container>
            <Grid item xs={12} style={{ textAlign:"center" }}>
              <Link to="/register" variant="body2">
                {"Não tem conta? Cadastrar-se"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}