import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import useStyles from './styles';
import axios from 'axios';
import useStateRef from 'react-usestateref';

export default function App() {
  const [year, setYear, yearRef] = useStateRef("");
  const [launch, setLaunch, launchRef] = useStateRef("");
  const [landing,setLanding, landingRef] = useStateRef("");
  const classes = useStyles();	
  const navigate = useNavigate();
  const launchs = ["true","false"];
  const landings = ["true","false"];
  const years = ["2006","2007","2008","2009","2010","2011","2012","2013","2014", "2015", "2016", "2017","2018","2019","2020","2021"];
  
  const ChangeUrl = () => {
    let url = "launches?limit=100";
    
    if(yearRef.current !== "")
      url = url + "&launch_year=" + yearRef.current;
    if(launchRef.current !== "")
      url = url + "&launch_success=" + launchRef.current;
    if(landingRef.current !== "")
      url = url + "&land_success=" + landingRef.current;
    navigate(url);
  }
  
  useEffect(() => {
    let baseurl = "https://api.spaceXdata.com/v3/";
    let url = "launches?limit=100";
    
    if(year !== "")
      url = url + "&launch_year=" + year;
    if(launch !== "")
      url = url + "&launch_success=" + launch;
    if(landing !== "")
      url = url + "&land_success=" + landing;
    console.log(url);
    axios.get(baseurl + url).then((response) => {
      console.log(response.data);
    });
  },[year,launch,landing]);

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
      <Container maxWidth="xl">
          <Grid item xs={12} sm={3} >
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
            <Grid item xs={11}>
              <Typography sx={{ mt: 2 }} variant="subtitle1" gutterBottom component="div" align="center">
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
            <Grid item xs={11}>
              <Typography sx={{ mt: 2 }} variant="subtitle1" gutterBottom component="div" align="center">
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
          </Grid>
          <Grid item xs={12} sm={9}>
          </Grid>
      </Container>
  );
}
