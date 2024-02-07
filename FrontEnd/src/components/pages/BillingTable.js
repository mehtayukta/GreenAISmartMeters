import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { red } from '@mui/material/colors';

const columns = [
  { id: 'name', label: 'Device_Name', minWidth: 170 },
  { id: 'code', label: 'Units Consumed', minWidth: 100 },
  {
    id: 'population',
    label: 'Cost per Unit',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Total Cost',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('Light1', '10', 20, 200),
  createData('Fan1', '110', 2, 220),
  createData('Light2', '88', 1, 88),
  createData('Fan4', '222', 2, 444),
  createData('Light6', '111', 5, 555),
  createData('Fan7', '22', 14, 308),
  createData('Light10', '100', 7, 700),
  createData('Light10', '60', 4, 240),
  createData('Light10', '75', 4, 300),
  createData('Light10', '320', 1, 320),
  createData('Light10', '750', 1, 750),
  createData('Light10', '15', 10, 150)
];

export default function BillingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 660 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow style ={{}} >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth , color: 'black', backgroundColor: '#89D5D2'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}