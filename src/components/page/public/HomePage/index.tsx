import React, { useState } from 'react';
import Layout from '../../../main/Layout';
import HpHeroSection from './component/HpHeroSection';
import HpTicketTable from './component/HpTicketTable';
import HpLayanan from './component/HpLayanan';

function HomePage() {
    const tiketData = [
        { no: 1, tiket: 'T2024100228', tanggal: '14 Oct 2024', pemohon: 'APLIKASI', kategori: 'APLIKASI', status: 'TIDAK DISETUJUI' },
        { no: 2, tiket: 'T2024100227', tanggal: '08 Oct 2024', pemohon: 'Disdukcapil', kategori: 'APLIKASI', status: 'DISETUJUI' },
        { no: 3, tiket: 'T2024100226', tanggal: '07 Oct 2024', pemohon: 'BPKD', kategori: 'VPS/VM', status: 'TIDAK DISETUJUI' },
        { no: 4, tiket: 'T2024100225', tanggal: '06 Oct 2024', pemohon: 'BAPPEDA', kategori: 'SERVER', status: 'DISETUJUI' },
        { no: 5, tiket: 'T2024100224', tanggal: '05 Oct 2024', pemohon: 'Diskominfo', kategori: 'APLIKASI', status: 'DISETUJUI' },
        { no: 6, tiket: 'T2024100223', tanggal: '04 Oct 2024', pemohon: 'Dinkes', kategori: 'EMAIL', status: 'TIDAK DISETUJUI' },
        { no: 7, tiket: 'T2024100222', tanggal: '03 Oct 2024', pemohon: 'DPMD', kategori: 'VPS/VM', status: 'DISETUJUI' },
        { no: 8, tiket: 'T2024100221', tanggal: '02 Oct 2024', pemohon: 'APLIKASI', kategori: 'DATABASE', status: 'DISETUJUI' },
        { no: 9, tiket: 'T2024100220', tanggal: '01 Oct 2024', pemohon: 'BPKAD', kategori: 'SERVER', status: 'TIDAK DISETUJUI' },
        { no: 10, tiket: 'T2024100219', tanggal: '30 Sep 2024', pemohon: 'DLHK', kategori: 'APLIKASI', status: 'DISETUJUI' },
        { no: 11, tiket: 'T2024100234', tanggal: '05 Oct 2024', pemohon: 'Diskominfo', kategori: 'APLIKASI', status: 'DISETUJUI' },
        { no: 12, tiket: 'T2024100233', tanggal: '04 Oct 2024', pemohon: 'Dinkes', kategori: 'EMAIL', status: 'TIDAK DISETUJUI' },
        { no: 13, tiket: 'T2024100232', tanggal: '03 Oct 2024', pemohon: 'DPMD', kategori: 'VPS/VM', status: 'DISETUJUI' },
        { no: 14, tiket: 'T2024100231', tanggal: '02 Oct 2024', pemohon: 'APLIKASI', kategori: 'DATABASE', status: 'DISETUJUI' },
        { no: 15, tiket: 'T2024100230', tanggal: '01 Oct 2024', pemohon: 'BPKAD', kategori: 'SERVER', status: 'TIDAK DISETUJUI' },
        { no: 16, tiket: 'T2024100239', tanggal: '30 Sep 2024', pemohon: 'DLHK', kategori: 'APLIKASI', status: 'DISETUJUI' },
        { no: 17, tiket: 'T2024100322', tanggal: '03 Oct 2024', pemohon: 'DPMD', kategori: 'VPS/VM', status: 'DISETUJUI' },
        { no: 18, tiket: 'T2024100321', tanggal: '02 Oct 2024', pemohon: 'APLIKASI', kategori: 'DATABASE', status: 'DISETUJUI' },
        { no: 19, tiket: 'T2024100320', tanggal: '01 Oct 2024', pemohon: 'BPKAD', kategori: 'SERVER', status: 'TIDAK DISETUJUI' },
        { no: 20, tiket: 'T2024100319', tanggal: '30 Sep 2024', pemohon: 'DLHK', kategori: 'APLIKASI', status: 'DISETUJUI' },
    ];

    const layananList = ['Aplikasi', 'E-Mail', 'Cloud', 'Sub Domain'];

    return (
        <Layout>
            <HpHeroSection />
            <HpTicketTable tiketData={tiketData} rowsPerPage={5} />
            <HpLayanan layananList={layananList} />
        </Layout>
    );
}

export default HomePage;
