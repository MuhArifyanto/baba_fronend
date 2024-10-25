import { useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';
import ReactPaginate from 'react-paginate';

type Tiket = {
    no: number;
    tiket: string;
    tanggal: string;
    pemohon: string;
    kategori: string;
    status: string;
    };

type TicketTableProps = {
    tiketData: Tiket[];
    rowsPerPage: number;
};

const HpTicketTable = ({ tiketData, rowsPerPage }: TicketTableProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    const filteredData: Tiket[] = tiketData.filter((row) =>
        Object.values(row).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const pageCount = Math.ceil(filteredData.length / rowsPerPage);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(0); // Reset ke halaman pertama saat pencarian berubah
    };

    const handlePageClick = (data: { selected: number }) => {
        setCurrentPage(data.selected);
    };

    return (
        <>
        <Typography variant="h4" align="center" gutterBottom>
            STATUS TIKET
        </Typography>
        <TextField
            label="Cari Tiket"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mb: 3, width: '100%' }}
        />
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
                {filteredData.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map((row: Tiket, index: number) => (
                <TableRow key={row.no}>
                    <TableCell>{currentPage * rowsPerPage + index + 1}</TableCell>
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

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
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
            />
        </div>
        </>
    );
};

export default HpTicketTable;
