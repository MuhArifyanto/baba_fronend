import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import '../../assets/style.css'

const Footer= () => {
  return (
    <Box className="bg-color-baba" sx={{py: 3, mt: 5 }}>
      <Container>
        <Typography variant="body2" align="center">
          © Copyright Diskominfosantik Kabupaten Bekasi 2024
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
