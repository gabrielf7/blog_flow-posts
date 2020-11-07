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

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  if((localStorage.getItem('flowEmail', 'flowSenha'))){
    history.push('/dashboard');
  }
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleSubmit(e){
    e.preventDefault();

    const data = {
      nome: nome,
      email: email,
      senha: senha,
    };
    
    try{
      const resposta = await api.post('/user/new_user', data);
      
      if(resposta.status === 200){
        alert('Cadastrado com Sucesso.');
        history.push('/');
      }else{
        if(resposta.status === 500){
          alert('Não cadastrado');
        }
      }
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
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
          Cadastrar-se
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <TextField
            fullWidth
            id="Name"
            label="Nome"
            variant="outlined"
            margin="normal"
            type="text"
            autoComplete="name"
            value={nome} 
            onChange={e=>setNome(e.target.value)}
            autoFocus
            required
          />
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            autoComplete="email"
            value={email} 
            onChange={e=>setEmail(e.target.value)}
            autoFocus
            required
          />
          <TextField
            fullWidth
            id="password"
            label="Senha"
            variant="outlined"
            margin="normal"
            type="password"
            autoComplete="current-password"
            value={senha} 
            onChange={e=>setSenha(e.target.value)}
            autoFocus
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Confirmar
          </Button>
          <Grid container>
            <Grid item xs={12} style={{ textAlign:"center" }}>
              <Link to="/" variant="body2">
                {"Já possui uma conta? Faça login"}
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