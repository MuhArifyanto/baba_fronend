// src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Container, Typography } from '@mui/material';
import Menu from './Menu';
import '../../assets/style.css'

const Header = () => {
  return (
    <AppBar position="sticky" className="bg-color-baba">
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Menu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
