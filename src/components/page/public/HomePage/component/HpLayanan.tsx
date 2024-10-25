import { Typography, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';

type LayananSectionProps = {
  layananList: string[];
};

const HpLayanan = ({ layananList }: LayananSectionProps) => {
  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        LAYANAN
      </Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ mb: 5 }}>
        {layananList.map((layanan) => (
          <Grid size={3} key={layanan}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center">
                  {layanan}
                </Typography>
                <Typography variant="body2" align="center">
                  Lihat Panduan
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HpLayanan;
