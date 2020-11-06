import React from 'react';
import { Link } from 'react-router-dom';
import { CssBaseline, Container, Grid, Button, makeStyles } from '@material-ui/core';
import { orange, teal }from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  Button: {
    color: teal['A400'],
    border: `1px solid ${orange[900]} `,
  },
}));

export default function Page404 () {
  const classes = useStyles();
  return(
    <div style={{ backgroundColor: "#284b63" }}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid container item xs={12} display="flex" justify="center" alignItems="center">
            <h1 style={{ marginTop: 50, color: 'white' }}>
              Página 404
            </h1>
          </Grid>
          <Grid container item xs={12} display="flex" justify="center" alignItems="center">
            <p style={{ color: 'white' }}>Esta página não existe ou está em desenvolvimento</p>
          </Grid>
          <Grid container item xs={12} display="flex" justify="center" alignItems="center">
            <Button component={Link} to="/" variant="outlined" className={classes.Button}>
              Volte para o Dashboard
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
