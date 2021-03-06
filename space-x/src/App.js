import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import useStyles from './styles';
import axios from 'axios';
import useStateRef from 'react-usestateref';
import Posts from './components/posts/Posts';

export default function App() {
  const [year, setYear, yearRef] = useStateRef("");
  const [launch, setLaunch, launchRef] = useStateRef("");
  const [landing,setLanding, landingRef] = useStateRef("");
  const [posts, setPosts] = useState();
  const classes = useStyles();	
  const navigate = useNavigate();
  const launchs = ["true","false"];
  const landings = ["true","false"];
  const years = ["2006","2007","2008","2009","2010","2011","2012","2013","2014", "2015", "2016", "2017","2018","2019","2020","2021"];
  
  const ChangeUrl = () => {
    let url = "?limit=100";
    
    if(yearRef.current !== "")
      url = url + "&launch_year=" + yearRef.current;
    if(launchRef.current !== "")
      url = url + "&launch_success=" + launchRef.current;
    if(landingRef.current !== "")
      url = url + "&land_success=" + landingRef.current;
    navigate(url);
  }
  
  useEffect(() => {
    window.addEventListener("beforeunload", navigate('/'));
  
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    let baseurl = "https://api.spaceXdata.com/v3/";
    let url = "launches?limit=100";
    
    if(year !== "")
      url = url + "&launch_year=" + year;
    if(launch !== "")
      url = url + "&launch_success=" + launch;
    if(landing !== "")
      url = url + "&land_success=" + landing;
    axios.get(baseurl + url).then((response) => {
      setPosts(response.data);
    });
  },[year,launch,landing,setPosts]);

  const handleyear = ( newyear ) => {
    if(year === newyear)
      setYear("");
    else
      setYear(newyear);
    ChangeUrl();
  };

  const handlelaunch = ( newlaunch ) => {
    if(launch === newlaunch)
      setLaunch("");
    else
      setLaunch(newlaunch);
    ChangeUrl();
  };

  const handlelanding = ( newlanding ) => {
    if(landing === newlanding)
      setLanding("");
    else 
      setLanding(newlanding);
    ChangeUrl();
  };

  return (
      <Container maxWidth="xl" className={classes.color}>
        <Grid item xs={12} container justify="space-between" alignItems="stretch" spacing={3} sx = {{  }} >
          <Grid item xs={12} md={3} >
            <Paper elevation = {3} sx = {{ mt: 2, pt: 2, pl : 1, pb : 3 }} >
              <Typography variant="h6" gutterBottom component="div">
                  Filters
              </Typography>
              <Grid item xs={11}>
                <Typography variant="subtitle1" gutterBottom component="div" align="center">
                  <u>Launch Year</u>                
                </Typography>
                <Typography variant="subtitle2" gutterBottom component="div" align="center">
                </Typography>
              </Grid>
              <Grid item xs={12} container justify="space-between" alignItems="stretch" spacing={3}>
                {years?.map((y) => 
                  y === year ? (
                    <Grid item key={y} xs={6} display="flex" alignItems="center" justifyContent="center">
                      <Button size="small" value={y}  variant="contained" className={ classes.darkGreen } color="success" onClick={() => handleyear(y)}> {y} </Button>
                    </Grid>
                  ) : (
                    <Grid item key={y} xs={6} display="flex" alignItems="center" justifyContent="center">
                      <Button size="small" value={y} variant="contained" className={ classes.lightGreen } color="success" onClick={() => handleyear(y)}> {y} </Button>
                    </Grid>
                  )
                )}
              </Grid>
              <Grid item xs={11} sx={{ pt: 1, pb: 2 }} >
                <Typography variant="subtitle1" gutterBottom component="div" align="center">
                  <u>Succesful Launch</u>                
                </Typography>
              </Grid>
              <Grid item xs={12} container justify="space-between" alignItems="stretch" spacing={3}>
                {launchs?.map((y) => 
                  y === launch ? (
                    <Grid item key={y} xs={6} display="flex" alignItems="center" justifyContent="center">
                    <Button size="small" value={y}  variant="contained" className={ classes.darkGreen } color="success" onClick={() => handlelaunch(y)}> {y} </Button>
                    </Grid>
                  ) : (
                    <Grid item key={y} xs={6} display="flex" alignItems="center" justifyContent="center">
                    <Button size="small" value={y} variant="contained" className={ classes.lightGreen } color="success" onClick={() => handlelaunch(y)}> {y} </Button>
                    </Grid>
                  )
                )}
              </Grid>
              <Grid item xs={11} sx={{ pt: 1, pb: 2 }} >
                <Typography variant="subtitle1" gutterBottom component="div" align="center">
                  <u>Succesful Landing</u>                
                </Typography>
              </Grid>
              <Grid item xs={12} container justify="space-between" alignItems="stretch" spacing={3}>
                {landings?.map((y) => 
                  y === landing ? (
                    <Grid item key={y} xs={6} display="flex" alignItems="center" justifyContent="center">
                    <Button size="small" value={y}  variant="contained" className={ classes.darkGreen } color="success" onClick={() => handlelanding(y)}> {y} </Button>
                    </Grid>
                  ) : (
                    <Grid item key={y} xs={6} display="flex" alignItems="center" justifyContent="center">
                    <Button size="small" value={y} variant="contained" className={ classes.lightGreen } color="success" onClick={() => handlelanding(y)}> {y} </Button>
                    </Grid>
                  )
                )}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Posts posts = {posts} />
          </Grid>
          <Grid item xs = {12} >
            <Typography variant="subtitle1" gutterBottom component="div" align="center"> Developer Name : Swapnil Guduru </Typography>
          </Grid>
        </Grid>
      </Container>
  );
}
