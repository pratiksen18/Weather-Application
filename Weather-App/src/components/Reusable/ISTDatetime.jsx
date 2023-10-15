import { Typography } from '@mui/material';
import React from 'react';
import { getISTDatetime } from '../../utilities/DatetimeUtils';

const ISTDatetime = () => {
  const istFullDate = getISTDatetime();
  const istTimeValue = (
    <Typography
      variant="h3"
      component="h3"
      sx={{
        fontWeight: '600',
        fontSize: { xs: '14px', sm: '16px' },
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: 1,
        paddingRight: '2px',
        fontFamily: 'Poppins',
      }}
    >
      {istFullDate} IST
    </Typography>
  );
  return istTimeValue;
};

export default ISTDatetime;
