import { Grid } from '@mui/material';
import React from 'react';
import AirConditions from './AirConditions';
import DailyForecast from './DailyForecast';
import Details from './Details';

const TodayWeather = ({ data, forecastList }) => {
  return (
    <Grid container sx={{ padding: '3rem 0rem 0rem' }}>
      <Details data={data} />
      <AirConditions data={data} />
      <DailyForecast data={data} forecastList={forecastList} />
    </Grid>
  );
};

export default TodayWeather;
