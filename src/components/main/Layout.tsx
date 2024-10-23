
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container, Box } from '@mui/material';
import HelpdeskButton from './HelpdeskButton';

interface LayoutProps{
  children: React.ReactNode
}

const Layout =({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Box sx={{ minHeight: '80vh', py: 5 }}>
        <Container>{children}</Container>
        <HelpdeskButton />
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
