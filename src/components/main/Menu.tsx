// src/components/Menu.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Drawer, List, ListItem, ListItemText,ListItemButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ModalLogin from '../modal/ModalLogin';
import '../../assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleLoginModal = () => setIsLoginOpen(!isLoginOpen);
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box
      sx={{ width: 250, backgroundColor: '#f4f4f4', height: '100%', paddingTop: '10px' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItemButton component="a" href="/" className="list-item-button">
          <ListItemText primary="Beranda" />
        </ListItemButton>
        <ListItemButton component="a" href="/layanan" className="list-item-button">
          <ListItemText primary="Layanan" />
        </ListItemButton>
        <button
        className="btn btn-primary btn-block" // Menggunakan kelas Bootstrap
        onClick={toggleLoginModal}
        style={{ marginTop: '8px', marginLeft:'10px' }} // Margin atas
        >Login</button>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" className='bg-color-menu'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component="a" href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/logo/logobaba.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '20px' }}>
            <Button color="inherit" href="/">Beranda</Button>
            <Button color="inherit" href="/layanan">Layanan</Button>
            <Button color="inherit" onClick={toggleLoginModal}>Login</Button>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList}
      </Drawer>
      <ModalLogin isOpen={isLoginOpen} toggle={toggleLoginModal} />
    </>
  );
};

export default Menu;
