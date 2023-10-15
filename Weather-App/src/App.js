import React, { useState } from 'react';
import { Box, Container, Grid, Link, SvgIcon, Typography } from '@mui/material';
import Search from './components/Search';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import TodayWeather from './components/TodayWeather/TodayWeather';
import { fetchWeatherData } from './components/OpenWeatherService';
import { transformDateFormat } from './utilities/DatetimeUtils';
import ISTDatetime from './components/Reusable/ISTDatetime';
import Loading from './components/Reusable/Loading';
import Logo from './icons/logo.png';
import Error from './components/Reusable/Error';
import { ALL_DESCRIPTIONS } from './utilities/DateConstants';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
  getTodayForecastWeather,
  getWeekForecastWeather,
} from './utilities/DataUtils';
import me from './icons/Me.png';

function App() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchChangeHandler = async (enteredData) => {
    const [latitude, longitude] = enteredData.value.split(' ');

    setIsLoading(true);

    const currentDate = transformDateFormat();
    const date = new Date();
    let dt_now = Math.floor(date.getTime() / 1000);

    try {
      const [todayWeatherResponse, weekForecastResponse] =
        await fetchWeatherData(latitude, longitude);
      const all_today_forecasts_list = getTodayForecastWeather(
        weekForecastResponse,
        currentDate,
        dt_now
      );

      const all_week_forecasts_list = getWeekForecastWeather(
        weekForecastResponse,
        ALL_DESCRIPTIONS
      );

      setTodayForecast([...all_today_forecasts_list]);
      setTodayWeather({ city: enteredData.label, ...todayWeatherResponse });
      setWeekForecast({
        city: enteredData.label,
        list: all_week_forecasts_list,
      });
    } catch (error) {
      setError(true);
    }

    setIsLoading(false);
  };

  let appContent = (
    <Box
      xs={12}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        minHeight: '500px',
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: { xs: '60px', sm: '60px' },
          color: 'rgba(255,255,0, 1.0)',
          fontFamily: 'math',
          textAlign: 'center',
          margin: '5rem 0',
          maxWidth: '80%',
          lineHeight: '22px',
        }}
      >
        WELCOME
      </Typography>

      <div>
        <img
          src={me}  
          alt="my profile"
          className="rounded-2xl mx-auto w-2/3 md:w-full"
        />
      </div>

      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontSize: { xs: '20px', sm: '20px' },
          color: 'rgba(255,255,255, 0.9)',
          fontFamily: 'math',
          textAlign: 'center',
          margin: '1rem 0',
          maxWidth: '80%',
          lineHeight: '22px',
        }}
      >
        Explore current weather data and weekly forecast of any city
      </Typography>
    </Box>
  );

  if (todayWeather && todayForecast && weekForecast) {
    appContent = (
      <React.Fragment>
        <Grid item xs={12} md={todayWeather ? 6 : 12}>
          <Grid item xs={12}>
            <TodayWeather data={todayWeather} forecastList={todayForecast} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <WeeklyForecast data={weekForecast} />
        </Grid>
      </React.Fragment>
    );
  }

  if (error) {
    appContent = (
      <Error
        margin="3rem auto"
        flex="inherit"
        errorMessage="Something went wrong"
      />
    );
  }

  if (isLoading) {
    appContent = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '500px',
        }}
      >
        <Loading value="1">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: '14px', sm: '16px' },
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1,
              fontFamily: 'Poppins',
            }}
          >
            Searching...
          </Typography>
        </Loading>
      </Box>
    );
  }

  return (
    <Container
      sx={{
        maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
        width: '100%',
        height: '100%',
        margin: '0 auto',
        padding: '1rem 0 3rem',
        marginBottom: '1rem',
        borderRadius: {
          xs: 'none',
          sm: '0 0 1rem 1rem',
        },
        boxShadow: {
          xs: 'none',
          sm: 'rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px',
        },
      }}
    >
      <Grid container columnSpacing={2}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: '100%',
              marginBottom: '1rem',
            }}
          >
            <Box
              component="img"
              sx={{
                height: { xs: '19px', sm: '25px', md: '29px' },
                width: 'auto',
              }}
              alt="logo"
              src={Logo}
            />

            <ISTDatetime />
          
              
            

            <Link
              href="https://github.com/pratiksen18"
              target="_blank"
              underline="none"
              sx={{ display: 'flex' }}
            >
              <GitHubIcon
                sx={{
                  fontSize: { xs: '20px', sm: '22px', md: '26px' },
                  color: 'white',
                  '&:hover': { color: '#0ed9f0' },
                }}
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/pratik-sen-772013280/"
              target="_blank"
              underline="none"
              sx={{ display: 'flex' }}
            >
              <LinkedInIcon
                sx={{
                  fontSize: { xs: '20px', sm: '22px', md: '26px' },
                  color: 'Blue',
                  '&:hover': { color: '#0ed9f0' },
                }}
              />
            </Link>
            <Link
              href="https://www.facebook.com/pratik.sen.33633"
              target="_blank"
              underline="none"
              sx={{ display: 'flex' }}
            >
              <FacebookIcon
                sx={{
                  fontSize: { xs: '20px', sm: '22px', md: '26px' },
                  color: 'Sky',
                  '&:hover': { color: '#0ed9f0' },
                }}
              />
            </Link>
            <Link
              href="https://www.youtube.com/@pratiksen18"
              target="_blank"
              underline="none"
              sx={{ display: 'flex' }}
            >
              <YouTubeIcon
                sx={{
                  fontSize: { xs: '20px', sm: '22px', md: '26px' },
                  color: 'Red',
                  '&:hover': { color: '#fcb3b3' },
                }}
              />
            </Link>
            
          </Box>
          <Search onSearchChange={searchChangeHandler} />
        </Grid>
        {appContent}
      </Grid>
    </Container>
  );
}

export default App;
