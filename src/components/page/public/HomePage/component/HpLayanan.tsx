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
      <Grid container spacing={3} columns={12} sx={{ flexGrow: 1 }}>
        {layananList.map((layanan) => (
          <Grid size={{ xs: 6, md: 3 }}  key={layanan}>
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
