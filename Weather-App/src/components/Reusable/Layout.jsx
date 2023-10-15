import { Grid } from '@mui/material';
import React from 'react';
import Header from './Header';

const Layout = ({ content, title, sx, mb, sectionSubHeader }) => {
  return (
    <Grid container sx={sx}>
      <Grid item xs={12}>
        <Header title={title} mb={mb || '0'} />
        {sectionSubHeader || null}
      </Grid>
      {content}
    </Grid>
  );
};

export default Layout;
