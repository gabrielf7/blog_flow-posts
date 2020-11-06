import React from 'react';
import Router from './router';
import { 
  CssBaseline, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  
}));

export default function App(){
  const classes = useStyles();

  return (
    <div className="App">
      <CssBaseline />
      <div className={classes.root}>
        <Router />
      </div>
    </div>
  );
}
