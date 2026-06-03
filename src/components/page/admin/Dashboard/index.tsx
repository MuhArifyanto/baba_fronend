import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  Grid2 as Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import '../../../../assets/style.css';

// Interface untuk data tiket
interface Tiket {
  no: number;
  tiket: string;
  tanggal: string;
  pemohon: string;
  kategori: string;
  status: 'DISETUJUI' | 'TIDAK DISETUJUI' | 'MENUNGGU';
  deskripsi: string;
  lampiran?: string;
  teknisi?: string;
  catatan?: string;
}

const DRAWER_WIDTH = 260;

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

  // State data tiket dummy
  const [tiketData, setTiketData] = useState<Tiket[]>([
    { 
      no: 1, 
      tiket: 'T2024100228', 
      tanggal: '14 Oct 2024', 
      pemohon: 'APLIKASI', 
      kategori: 'APLIKASI', 
      status: 'TIDAK DISETUJUI',
      deskripsi: 'Pengajuan perbaikan bug pada form input profil Bisma.',
      lampiran: 'bug_screenshot.png',
      catatan: 'Deskripsi pengajuan kurang jelas dan tidak melampirkan surat permohonan resmi.'
    },
    { 
      no: 2, 
      tiket: 'T2024100227', 
      tanggal: '08 Oct 2024', 
      pemohon: 'Disdukcapil', 
      kategori: 'APLIKASI', 
      status: 'DISETUJUI',
      deskripsi: 'Pengajuan pembuatan integrasi API data kependudukan untuk aplikasi SiKasep.',
      lampiran: 'Surat_Rekomendasi_Disdukcapil.pdf',
      teknisi: 'Ahmad (Teknisi Aplikasi)',
      catatan: 'Dokumen lengkap. Diteruskan ke tim developer.'
    },
    { 
      no: 3, 
      tiket: 'T2024100226', 
      tanggal: '07 Oct 2024', 
      pemohon: 'BPKD', 
      kategori: 'VPS/VM', 
      status: 'TIDAK DISETUJUI',
      deskripsi: 'Penambahan RAM VPS database keuangan sebesar 16GB.',
      lampiran: 'form_spek_server.pdf',
      catatan: 'Kuota kapasitas server hosting penuh, harap sesuaikan alokasi anggaran terlebih dahulu.'
    },
    { 
      no: 4, 
      tiket: 'T2024100225', 
      tanggal: '06 Oct 2024', 
      pemohon: 'BAPPEDA', 
      kategori: 'SERVER', 
      status: 'DISETUJUI',
      deskripsi: 'Setup VM baru untuk aplikasi e-Planning perencanaan daerah.',
      lampiran: 'Nota_Dinas_BAPPEDA.pdf',
      teknisi: 'Dedi (Teknisi Sistem)',
      catatan: 'Telah disiapkan VM dengan Ubuntu 22.04 LTS.'
    },
    { 
      no: 5, 
      tiket: 'T2024100224', 
      tanggal: '05 Oct 2024', 
      pemohon: 'Diskominfo', 
      kategori: 'APLIKASI', 
      status: 'DISETUJUI',
      deskripsi: 'Pembaruan sertifikat SSL domain *.bekasikab.go.id.',
      lampiran: 'SSL_renewal_doc.pdf',
      teknisi: 'Chandra (Teknisi Cloud)',
      catatan: 'SSL berhasil dipasang dan diperpanjang hingga 2027.'
    },
    { 
      no: 6, 
      tiket: 'T2024100223', 
      tanggal: '04 Oct 2024', 
      pemohon: 'Dinkes', 
      kategori: 'EMAIL', 
      status: 'TIDAK DISETUJUI',
      deskripsi: 'Pengajuan email baru untuk puskesmas-sukatani@bekasikab.go.id.',
      lampiran: 'surat_pengantar_dinkes.pdf',
      catatan: 'Harap menggunakan domain puskesmas yang telah terstandarisasi.'
    },
    { 
      no: 7, 
      tiket: 'T2024100222', 
      tanggal: '03 Oct 2024', 
      pemohon: 'DPMD', 
      kategori: 'VPS/VM', 
      status: 'DISETUJUI',
      deskripsi: 'Deployment database postgresql di server cloud lokal.',
      lampiran: 'surat_dpmd.pdf',
      teknisi: 'Chandra (Teknisi Cloud)',
      catatan: 'DB Server siap digunakan port 5432.'
    },
    { 
      no: 8, 
      tiket: 'T2024100221', 
      tanggal: '02 Oct 2024', 
      pemohon: 'APLIKASI', 
      kategori: 'DATABASE', 
      status: 'DISETUJUI',
      deskripsi: 'Migrasi database aplikasi ke server hosting baru.',
      lampiran: 'db_migration_plan.pdf',
      teknisi: 'Dedi (Teknisi Sistem)',
      catatan: 'Migrasi selesai tanpa ada data loss.'
    },
    { 
      no: 9, 
      tiket: 'T2024100220', 
      tanggal: '01 Oct 2024', 
      pemohon: 'BPKAD', 
      kategori: 'SERVER', 
      status: 'TIDAK DISETUJUI',
      deskripsi: 'Permohonan sewa rack colocation server.',
      lampiran: 'surat_bpkad.pdf',
      catatan: 'Kapasitas rack server Diskominfosantik sedang penuh.'
    },
    { 
      no: 10, 
      tiket: 'T2024100219', 
      tanggal: '30 Sep 2024', 
      pemohon: 'DLHK', 
      kategori: 'APLIKASI', 
      status: 'DISETUJUI',
      deskripsi: 'Penambahan fitur maps titik pembuangan sampah liar.',
      lampiran: 'rencana_fitur_dlhk.pdf',
      teknisi: 'Ahmad (Teknisi Aplikasi)',
      catatan: 'Fitur map leaflet js berhasil ditambahkan.'
    },
    { 
      no: 11, 
      tiket: 'T2024100234', 
      tanggal: '05 Oct 2024', 
      pemohon: 'Diskominfo', 
      kategori: 'APLIKASI', 
      status: 'DISETUJUI',
      deskripsi: 'Penambahan kapasitas user login SIMPEG.',
      lampiran: 'nota_dinas_simpeg.pdf',
      teknisi: 'Ahmad (Teknisi Aplikasi)',
      catatan: 'Sudah diset batas concurrent user dinaikkan ke 1000.'
    },
    { 
      no: 12, 
      tiket: 'T2024100233', 
      tanggal: '04 Oct 2024', 
      pemohon: 'Dinkes', 
      kategori: 'EMAIL', 
      status: 'TIDAK DISETUJUI',
      deskripsi: 'Reset password email sekretariat dinkes.',
      lampiran: 'identitas_operator.jpg',
      catatan: 'Surat tugas operator dinas tidak sah.'
    },
    // Tambahkan data dengan status MENUNGGU untuk simulasi persetujuan admin
    { 
      no: 13, 
      tiket: 'T2024100340', 
      tanggal: '26 May 2026', 
      pemohon: 'Kecamatan Cikarang', 
      kategori: 'SUB DOMAIN', 
      status: 'MENUNGGU',
      deskripsi: 'Pengajuan pembuatan subdomain cikarang-pusat.bekasikab.go.id untuk profil kecamatan.',
      lampiran: 'Surat_Permohonan_Subdomain_Cikarang.pdf'
    },
    { 
      no: 14, 
      tiket: 'T2024100341', 
      tanggal: '27 May 2026', 
      pemohon: 'Kelurahan Wanasari', 
      kategori: 'APLIKASI', 
      status: 'MENUNGGU',
      deskripsi: 'Laporan kendala: Aplikasi e-Kelurahan tidak dapat menginput data domisili baru warga.',
      lampiran: 'Screenshot_Error_Domisili.png'
    },
    { 
      no: 15, 
      tiket: 'T2024100342', 
      tanggal: '27 May 2026', 
      pemohon: 'Kecamatan Tambun', 
      kategori: 'DATABASE', 
      status: 'MENUNGGU',
      deskripsi: 'Pembuatan backup database SIMPEDDA kecamatan Tambun Selatan tahun 2025.',
      lampiran: 'Form_Permintaan_Data.pdf'
    },
  ]);

  // State untuk Detail & Alur Kerja Persetujuan (Halaman Non-Melayang)
  const [selectedTiket, setSelectedTiket] = useState<Tiket | null>(null);
  const [assigneeTeknisi, setAssigneeTeknisi] = useState('');
  const [catatanAdmin, setCatatanAdmin] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  const DAFTAR_TEKNISI = [
    'Ahmad (Teknisi Aplikasi)',
    'Budi (Teknisi Jaringan & Sub Domain)',
    'Chandra (Teknisi Cloud / VM)',
    'Dedi (Teknisi Sistem & Database)'
  ];

  // Hitung jumlah tiket per kategori secara dinamis dari tiketData
  const getChartData = () => {
    const counts = {
      'Aplikasi': 0,
      'E-Mail': 0,
      'Cloud': 0,
      'Sub Domain': 0,
    };
    tiketData.forEach((t) => {
      const cat = t.kategori.toUpperCase();
      if (cat === 'APLIKASI') {
        counts['Aplikasi']++;
      } else if (cat === 'EMAIL') {
        counts['E-Mail']++;
      } else if (cat === 'SUB DOMAIN') {
        counts['Sub Domain']++;
      } else {
        counts['Cloud']++; // VPS/VM, SERVER, DATABASE masuk ke Cloud
      }
    });
    return Object.keys(counts).map((key) => ({
      name: key,
      value: counts[key as keyof typeof counts],
    }));
  };

  const chartData = getChartData();
  const COLORS = ['#37517e', '#00a2e8', '#2ecc71', '#f39c12'];
  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  // Cek apakah user memiliki cookie authToken
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const token = getCookie('authToken');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Akses Ditolak',
        text: 'Anda harus login terlebih dahulu untuk mengakses halaman admin.',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/');
      });
    }
  }, [navigate]);

  // Handler untuk menghapus cookie & logout
  const handleLogout = () => {
    Swal.fire({
      title: 'Apakah Anda yakin ingin keluar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Logout',
          text: 'Anda telah keluar dari dashboard admin.',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate('/');
        });
      }
    });
  };

  // Proses persetujuan dan pengiriman ke teknisi
  const handleApproveAndAssign = () => {
    if (!selectedTiket) return;
    if (!assigneeTeknisi) {
      Swal.fire({
        icon: 'error',
        title: 'Teknisi Belum Dipilih',
        text: 'Silakan pilih teknisi terlebih dahulu sebelum menyetujui pengajuan.',
      });
      return;
    }

    setTiketData((prev) =>
      prev.map((t) =>
        t.no === selectedTiket.no
          ? {
              ...t,
              status: 'DISETUJUI',
              teknisi: assigneeTeknisi,
              catatan: catatanAdmin || 'Telah disetujui dan diteruskan ke teknisi untuk dikerjakan.'
            }
          : t
      )
    );

    SwalSuccess('Tiket Disetujui', `Tiket berhasil disetujui dan diteruskan ke ${assigneeTeknisi}.`);
    setSelectedTiket(null);
    setAssigneeTeknisi('');
    setCatatanAdmin('');
  };

  const handleRejectTicket = () => {
    if (!selectedTiket) return;

    setTiketData((prev) =>
      prev.map((t) =>
        t.no === selectedTiket.no
          ? {
              ...t,
              status: 'TIDAK DISETUJUI',
              catatan: catatanAdmin || 'Pengajuan ditolak oleh admin.'
            }
          : t
      )
    );

    SwalSuccess('Tiket Ditolak', 'Status tiket diubah menjadi TIDAK DISETUJUI.');
    setSelectedTiket(null);
    setCatatanAdmin('');
    setIsRejecting(false);
  };

  const SwalSuccess = (title: string, text: string) => {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };

  // Filter pencarian
  const filteredData = tiketData.filter((row) =>
    Object.values(row).some(
      (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Jika di Dashboard, hanya tampilkan tiket yang 'MENUNGGU'
  // Jika di Kelola Tiket, tampilkan semua tiket
  const displayedTickets = activeMenu === 'dashboard'
    ? filteredData.filter((t) => t.status === 'MENUNGGU')
    : filteredData;

  const pageCount = Math.ceil(displayedTickets.length / rowsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  // Hitung jumlah statistik
  const totalTiket = tiketData.length;
  const disetujuiCount = tiketData.filter(t => t.status === 'DISETUJUI').length;
  const ditolakCount = tiketData.filter(t => t.status === 'TIDAK DISETUJUI').length;
  const menungguCount = tiketData.filter(t => t.status === 'MENUNGGU').length;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f6f9' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: '#37517e',
            color: '#fff',
            borderRight: 'none',
          },
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <img
              src="/logo/logobaba.png"
              alt="Logo BABA"
              style={{ height: '45px', marginBottom: '10px' }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              BABA ADMIN
            </Typography>
          </Box>
        </Toolbar>
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                selected={activeMenu === 'dashboard'}
                onClick={() => {
                  setActiveMenu('dashboard');
                  setCurrentPage(0);
                }}
                sx={{
                  mx: 1.5,
                  borderRadius: '8px',
                  mb: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#fff', minWidth: '40px' }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                selected={activeMenu === 'tiket'}
                onClick={() => {
                  setActiveMenu('tiket');
                  setCurrentPage(0);
                }}
                sx={{
                  mx: 1.5,
                  borderRadius: '8px',
                  mb: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#fff', minWidth: '40px' }}>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Kelola Tiket" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate('/')}
                sx={{
                  mx: 1.5,
                  borderRadius: '8px',
                  mb: 1,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#fff', minWidth: '40px' }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Halaman Publik" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ mt: 'auto' }}>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  mx: 1.5,
                  borderRadius: '8px',
                  mt: 4,
                  color: '#ff7675',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 118, 117, 0.15)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#ff7675', minWidth: '40px' }}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 4, width: `calc(100% - ${DRAWER_WIDTH}px)` }}>
        {/* Header / Topbar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#37517e' }}>
              {selectedTiket 
                ? `Detail Pengajuan #${selectedTiket.tiket}` 
                : activeMenu === 'dashboard' ? 'Admin Dashboard' : 'Kelola Tiket Pengajuan'
              }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Diskominfosantik Kabupaten Bekasi
            </Typography>
          </Box>
          {selectedTiket ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setSelectedTiket(null);
                setIsRejecting(false);
                setAssigneeTeknisi('');
                setCatatanAdmin('');
              }}
              sx={{ borderRadius: '20px', textTransform: 'none', px: 3 }}
            >
              Kembali ke Daftar Tiket
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/')}
              sx={{ borderRadius: '20px', textTransform: 'none' }}
            >
              Lihat Beranda Publik
            </Button>
          )}
        </Box>

        {selectedTiket ? (
          /* Render HALAMAN DETAIL (bukan dialog melayang) */
          <Card
            sx={{
              p: 4,
              borderRadius: '16px',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
              bgcolor: '#ffffff',
            }}
          >
            {/* Header sub-page */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#37517e' }}>
                Lembar Review Permohonan Layanan
              </Typography>
              <StatusChip status={selectedTiket.status} />
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Grid container spacing={4}>
              {/* Kolom Kiri: Detail Informasi Permohonan */}
              <Grid size={{ xs: 12, md: 7 }}>
                <Stack spacing={3.5}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                        NOMOR TIKET
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, mt: 0.5, color: '#37517e' }}>
                        {selectedTiket.tiket}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                        TANGGAL PENGAJUAN
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                        {selectedTiket.tanggal}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid size={{xs: 6}}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                        INSTANSI PEMOHON / OPD
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5, color: '#2c3e50' }}>
                        {selectedTiket.pemohon}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                        KATEGORI LAYANAN
                      </Typography>
                      <Chip 
                        label={selectedTiket.kategori} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                        sx={{ mt: 0.5, fontWeight: 600 }} 
                      />
                    </Grid>
                  </Grid>

                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600, mb: 1 }}>
                      DESKRIPSI / ISI PENGAJUAN USER
                    </Typography>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 3, 
                        bgcolor: '#f8f9fb', 
                        borderRadius: '12px',
                        border: '1.5px dashed rgba(0,0,0,0.08)' 
                      }}
                    >
                      <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                        {selectedTiket.deskripsi}
                      </Typography>
                    </Paper>
                  </Box>

                  {selectedTiket.lampiran && (
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600, mb: 1 }}>
                        LAMPIRAN DOKUMEN PENDUKUNG
                      </Typography>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="medium"
                        onClick={(e) => {
                          e.preventDefault();
                          Swal.fire({
                            icon: 'info',
                            title: 'Unduh Lampiran',
                            text: `Mengunduh berkas mock: ${selectedTiket.lampiran}`,
                            timer: 1500,
                            showConfirmButton: false
                          });
                        }}
                        sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '8px' }}
                      >
                        Unduh: {selectedTiket.lampiran}
                      </Button>
                    </Box>
                  )}
                </Stack>
              </Grid>

              {/* Kolom Kanan: Aksi & Alur Kerja Persetujuan */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Paper 
                  elevation={0}
                  variant="outlined"
                  sx={{ 
                    p: 3.5, 
                    borderRadius: '12px', 
                    height: '100%',
                    bgcolor: '#fafbfc',
                    border: '1px solid rgba(0, 0, 0, 0.08)'
                  }}
                >
                  {/* Status: MENUNGGU -> Tampilkan Form Approval */}
                  {selectedTiket.status === 'MENUNGGU' && (
                    <Stack spacing={3}>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700, color: '#37517e' }}>
                        <AssignmentIndIcon /> Alur Persetujuan & Penugasan
                      </Typography>

                      <Divider />

                      {!isRejecting ? (
                        <Stack spacing={2.5}>
                          <FormControl fullWidth size="small">
                            <InputLabel id="pilih-teknisi-label">Pilih Teknisi Pelaksana *</InputLabel>
                            <Select
                              labelId="pilih-teknisi-label"
                              value={assigneeTeknisi}
                              label="Pilih Teknisi Pelaksana *"
                              onChange={(e) => setAssigneeTeknisi(e.target.value)}
                              sx={{ borderRadius: '8px', bgcolor: '#fff' }}
                            >
                              {DAFTAR_TEKNISI.map((tek) => (
                                <MenuItem key={tek} value={tek}>
                                  {tek}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <TextField
                            label="Catatan atau Instruksi Pengerjaan (Opsional)"
                            multiline
                            rows={4}
                            size="small"
                            fullWidth
                            value={catatanAdmin}
                            onChange={(e) => setCatatanAdmin(e.target.value)}
                            placeholder="Masukkan catatan khusus untuk teknisi..."
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', bgcolor: '#fff' } }}
                          />

                          <Button
                            variant="contained"
                            fullWidth
                            onClick={handleApproveAndAssign}
                            disabled={!assigneeTeknisi}
                            sx={{ 
                              py: 1.2,
                              textTransform: 'none', 
                              borderRadius: '8px',
                              fontWeight: 600,
                              backgroundColor: '#37517e',
                              '&:hover': {
                                backgroundColor: '#2d4368'
                              }
                            }}
                          >
                            Setujui & Kirim ke Teknisi
                          </Button>

                          <Button
                            variant="outlined"
                            color="error"
                            fullWidth
                            onClick={() => {
                              setIsRejecting(true);
                              setCatatanAdmin('');
                            }}
                            sx={{ py: 1, textTransform: 'none', borderRadius: '8px', fontWeight: 600 }}
                          >
                            Tolak Pengajuan
                          </Button>
                        </Stack>
                      ) : (
                        <Stack spacing={2.5}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#e74c3c' }}>
                            Mohon berikan alasan penolakan tiket pengajuan ini:
                          </Typography>
                          <TextField
                            label="Alasan Penolakan *"
                            multiline
                            rows={4}
                            size="small"
                            fullWidth
                            required
                            value={catatanAdmin}
                            onChange={(e) => setCatatanAdmin(e.target.value)}
                            placeholder="Tulis alasan penolakan di sini..."
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', bgcolor: '#fff' } }}
                          />

                          <Button
                            variant="contained"
                            color="error"
                            fullWidth
                            onClick={handleRejectTicket}
                            disabled={!catatanAdmin.trim()}
                            sx={{ py: 1.2, textTransform: 'none', borderRadius: '8px', fontWeight: 600 }}
                          >
                            Konfirmasi Tolak
                          </Button>

                          <Button
                            variant="outlined"
                            color="inherit"
                            fullWidth
                            onClick={() => {
                              setIsRejecting(false);
                              setCatatanAdmin('');
                            }}
                            sx={{ py: 1, textTransform: 'none', borderRadius: '8px', fontWeight: 600 }}
                          >
                            Batal
                          </Button>
                        </Stack>
                      )}
                    </Stack>
                  )}

                  {/* Status: DISETUJUI -> Tampilkan Detail Pengerjaan */}
                  {selectedTiket.status === 'DISETUJUI' && (
                    <Stack spacing={2.5}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#2ecc71' }}>
                        <CheckCircleIcon sx={{ color: '#2ecc71' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          Tiket Disetujui
                        </Typography>
                      </Box>
                      <Divider />
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                          TEKNISI PELAKSANA
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5, color: '#2c3e50' }}>
                          {selectedTiket.teknisi}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                          CATATAN / INSTRUKSI ADMIN
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.5, color: '#555', fontStyle: 'italic', lineHeight: 1.5 }}>
                          {selectedTiket.catatan}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 2, p: 2, bgcolor: '#eefcf5', borderRadius: '8px', border: '1px solid #c3e6cb' }}>
                        <Typography variant="body2" sx={{ color: '#155724', fontWeight: 600, textAlign: 'center' }}>
                          Status pekerjaan telah diteruskan ke teknisi untuk dikerjakan.
                        </Typography>
                      </Box>
                    </Stack>
                  )}

                  {/* Status: TIDAK DISETUJUI -> Tampilkan Detail Penolakan */}
                  {selectedTiket.status === 'TIDAK DISETUJUI' && (
                    <Stack spacing={2.5}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#e74c3c' }}>
                        <CancelIcon sx={{ color: '#e74c3c' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          Tiket Ditolak
                        </Typography>
                      </Box>
                      <Divider />
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                          ALASAN PENOLAKAN
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.5, color: '#721c24', fontWeight: 600, lineHeight: 1.5 }}>
                          {selectedTiket.catatan}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 2, p: 2, bgcolor: '#fdf3f2', borderRadius: '8px', border: '1px solid #f5c6cb' }}>
                        <Typography variant="body2" sx={{ color: '#721c24', fontWeight: 600, textAlign: 'center' }}>
                          Pengajuan ini tidak disetujui untuk diproses lebih lanjut.
                        </Typography>
                      </Box>
                    </Stack>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Card>
        ) : (
          /* Render LIST VIEW UTAMA: Statistik, Grafik & Tabel */
          <>
            {activeMenu === 'dashboard' && (
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card sx={{ borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Total Tiket</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>{totalTiket}</Typography>
                      </Box>
                      <AvatarCustom color="#37517e" icon={<ReceiptIcon style={{ color: '#fff' }} />} />
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card sx={{ borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Tiket Disetujui</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1, color: '#2ecc71' }}>{disetujuiCount}</Typography>
                      </Box>
                      <AvatarCustom color="#2ecc71" icon={<CheckCircleIcon style={{ color: '#fff' }} />} />
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card sx={{ borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Tidak Disetujui</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1, color: '#e74c3c' }}>{ditolakCount}</Typography>
                      </Box>
                      <AvatarCustom color="#e74c3c" icon={<CancelIcon style={{ color: '#fff' }} />} />
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card sx={{ borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Menunggu Approval</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1, color: '#f39c12' }}>{menungguCount}</Typography>
                      </Box>
                      <AvatarCustom color="#f39c12" icon={<HourglassEmptyIcon style={{ color: '#fff' }} />} />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {/* Grafik Kategori Layanan Terpopuler */}
            {activeMenu === 'dashboard' && (
              <Card
                sx={{
                  p: 3,
                  borderRadius: '12px',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                  mb: 4,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#37517e', mb: 3 }}>
                  Kategori Layanan Terpopuler (Donut Chart)
                </Typography>
                <Grid container spacing={4} alignItems="center">
                  <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ width: '100%', height: 260, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={95}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]} 
                                style={{ outline: 'none', cursor: 'pointer' }}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value: any, name: any) => {
                              const val = Number(value);
                              const pct = totalValue > 0 ? ((val / totalValue) * 100).toFixed(1) : 0;
                              return [`${val} Tiket (${pct}%)`, name];
                            }}
                            contentStyle={{
                              backgroundColor: '#ffffff',
                              borderRadius: '8px',
                              border: 'none',
                              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                              padding: '10px 14px',
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      {/* Center Text displaying Total Tickets */}
                      <Box
                        sx={{
                          position: 'absolute',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2c3e50', lineHeight: 1 }}>
                          {totalValue}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, mt: 0.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          Total Tiket
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid size={{ xs: 12, md: 7 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                      {chartData.map((item, index) => {
                        const pct = totalValue > 0 ? (item.value / totalValue) * 100 : 0;
                        const color = COLORS[index % COLORS.length];
                        return (
                          <Box key={item.name} sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ width: 14, height: 14, borderRadius: '4px', backgroundColor: color }} />
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                                  {item.name}
                                </Typography>
                              </Box>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                                {item.value} Tiket ({pct.toFixed(0)}%)
                              </Typography>
                            </Box>
                            {/* Beautiful custom progress bar */}
                            <Box sx={{ width: '100%', height: 8, bgcolor: '#eef2f5', borderRadius: '4px', overflow: 'hidden' }}>
                              <Box 
                                sx={{ 
                                  width: `${pct}%`, 
                                  height: '100%', 
                                  backgroundColor: color, 
                                  borderRadius: '4px',
                                  transition: 'width 1.0s ease-in-out'
                                }} 
                              />
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            )}

            {/* Tabel Data Tiket */}
            <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#37517e' }}>
                  {activeMenu === 'dashboard' ? 'Tiket Menunggu Approval (Tugas Admin)' : 'Daftar Semua Permohonan Layanan'}
                </Typography>
                <TextField
                  label="Cari Tiket / Pemohon"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(0);
                  }}
                  sx={{ width: { xs: '100%', sm: 300 } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: 'rgba(55, 81, 126, 0.05)' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>No</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>No Tiket</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Tanggal Pengajuan</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Nama Pemohon</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Kategori Layanan</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Status Tiket</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Aksi Admin</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedTickets.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                          <Typography color="text.secondary">
                            {activeMenu === 'dashboard' ? 'Semua permohonan telah diproses. Kerja bagus!' : 'Tidak ada data tiket ditemukan.'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      displayedTickets
                        .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                        .map((row, index) => (
                          <TableRow key={row.no} hover>
                            <TableCell>{currentPage * rowsPerPage + index + 1}</TableCell>
                            <TableCell sx={{ fontWeight: '600' }}>{row.tiket}</TableCell>
                            <TableCell>{row.tanggal}</TableCell>
                            <TableCell>{row.pemohon}</TableCell>
                            <TableCell>
                              <Chip label={row.kategori} size="small" variant="outlined" />
                            </TableCell>
                            <TableCell>
                              <StatusChip status={row.status} />
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              <Button
                                variant={row.status === 'MENUNGGU' ? 'contained' : 'outlined'}
                                size="small"
                                color={row.status === 'MENUNGGU' ? 'primary' : 'inherit'}
                                startIcon={<VisibilityIcon />}
                                onClick={() => {
                                  setSelectedTiket(row);
                                }}
                                sx={{ 
                                  textTransform: 'none', 
                                  borderRadius: '20px', 
                                  fontSize: '11px',
                                  py: 0.5,
                                  px: 1.5,
                                  fontWeight: 600,
                                  boxShadow: 'none',
                                  ...(row.status === 'MENUNGGU' && {
                                    backgroundColor: '#37517e',
                                    '&:hover': {
                                      backgroundColor: '#2d4368'
                                    }
                                  })
                                }}
                              >
                                {row.status === 'MENUNGGU' ? 'Tinjau & Proses' : 'Lihat Detail'}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              {pageCount > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}
                    forcePage={currentPage}
                  />
                </Box>
              )}
            </Paper>
          </>
        )}
      </Box>

// Komponen Pembantu
const AvatarCustom = ({ color, icon }: { color: string; icon: React.ReactNode }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      backgroundColor: color,
    }}
  >
    {icon}
  </Box>
);

const StatusChip = ({ status }: { status: 'DISETUJUI' | 'TIDAK DISETUJUI' | 'MENUNGGU' }) => {
  let color: 'success' | 'error' | 'warning' = 'warning';
  let label = 'MENUNGGU';

  if (status === 'DISETUJUI') {
    color = 'success';
    label = 'DISETUJUI';
  } else if (status === 'TIDAK DISETUJUI') {
    color = 'error';
    label = 'TIDAK DISETUJUI';
  }

  return (
    <Chip
      label={label}
      color={color}
      size="small"
      sx={{
        fontWeight: 'bold',
        fontSize: '11px',
        borderRadius: '6px',
      }}
    />
  );
};

export default AdminDashboard;
