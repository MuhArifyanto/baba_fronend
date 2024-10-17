// src/pages/HomePage.tsx
import React from 'react';
import Layout from '../../main/Layout';
import {
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
} from '@mui/material';

const HomePage: React.FC = () => {
  const tiketData = [
    { no: 1, tiket: 'T2024100228', tanggal: '14 Oct 2024', pemohon: 'APLIKASI', kategori: 'APLIKASI', status: 'TIDAK DISETUJUI' },
    { no: 2, tiket: 'T2024100227', tanggal: '08 Oct 2024', pemohon: 'Disdukcapil', kategori: 'APLIKASI', status: 'DISETUJUI' },
    { no: 3, tiket: 'T2024100226', tanggal: '07 Oct 2024', pemohon: 'BPKD', kategori: 'VPS/VM', status: 'TIDAK DISETUJUI' },
  ];

  const layananList = ['Aplikasi', 'E-Mail', 'Cloud', 'Sub Domain'];

  return (
    <Layout>
      {/* Hero Section */}
      <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ my: 5 }}>
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <img
            // src="https://via.placeholder.com/500x300"
            src="/img/hero-img.png"
            alt="Illustration"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
      </Grid>

      {/* Status Tiket Section */}
      <Typography variant="h4" align="center" gutterBottom>
        STATUS TIKET
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>No Tiket</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Pemohon</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tiketData.map((row) => (
              <TableRow key={row.no}>
                <TableCell>{row.no}</TableCell>
                <TableCell>{row.tiket}</TableCell>
                <TableCell>{row.tanggal}</TableCell>
                <TableCell>{row.pemohon}</TableCell>
                <TableCell>{row.kategori}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Layanan Section */}
      <Typography variant="h4" align="center" gutterBottom>
        LAYANAN
      </Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ mb: 5 }}>
        {layananList.map((layanan) => (
          <Grid item xs={12} md={3} key={layanan}>
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
    </Layout>
  );
};

export default HomePage;
