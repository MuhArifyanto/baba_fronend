import { Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';

const HpHeroSection= () => {
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ my: 5 }}>
      <Grid size={6}>
        <Typography variant="h3" gutterBottom>
          BEKASI BIKIN APLIKASI
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Layanan Rekayasa Perangkat Lunak Diskominfosantik Kabupaten Bekasi
        </Typography>
        <Button variant="contained" color="primary" size="small">
          Lihat Layanan
        </Button>
      </Grid>
      <Grid size={6}>
        <img
          src="/img/hero-img.png"
          alt="Illustration"
          style={{ width: '100%', height: 'auto' }}
        />
      </Grid>
    </Grid>
  );
};

export default HpHeroSection;
