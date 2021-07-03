import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
import CountUp from 'react-countup';
import { Chart } from './Chart';

// import { fetchGlobalData } from '../api/IndexApi';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#111111',
  },
  childpaper: {
    padding: '10px',
    marginBottom: '10px',
    borderBottom: '7px solid blue'
  },
  childpaper2: {
    padding: '10px',
    marginBottom: '10px',
    borderBottom: '7px solid green',
  },
  childpaper3: {
    padding: '10px',
    marginBottom: '10px',
    borderBottom: '7px solid #D32001',
  },
}));

export default function MainGrid({ data, country}) {
  data = {
    confirmed: data.confirmed,
    recovered: data.recovered,
    deaths: data.deaths
  }
  // const [useData, setData] = useState({})

  // useEffect(() => {
  //   const fetchApi = async () => {
  //     setData(await fetchGlobalData());

  //   }
  //   fetchApi();

  // }, [])

  const classes = useStyles();
  if (!data.confirmed) {
    return 'Loading...'
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8} lg={9}>
          <Paper className={classes.paper} elevation={3}>
            <Chart data={data} country={country} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <Paper className={classes.paper}>
            <h2>{country ? `${country}` : "Global"} Stats</h2>
            <Paper elevation={3} className={classes.childpaper}>
              <h3 className="totalCase">Total Cases</h3>

              <Typography variant="h3">
                <CountUp
                  start={0}
                  end={data.confirmed.value}
                  duration={2.5}
                  separator=","
                />
              </Typography>

            </Paper>
            <Paper elevation={3} className={classes.childpaper2}>
              <h3 className="recovered">Recovered</h3>
              <Typography variant="h3">
                <CountUp
                  start={0}
                  end={data.recovered.value}
                  duration={2.5}
                  separator=","
                />
              </Typography>
            </Paper>
            <Paper elevation={3} className={classes.childpaper3}>
              <h3 className="deaths">Deaths</h3>
              <Typography variant="h3">
                <CountUp
                  start={0}
                  end={data.deaths.value}
                  duration={2.5}
                  separator=","
                />
              </Typography>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

