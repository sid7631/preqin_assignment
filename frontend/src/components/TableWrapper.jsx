import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import NoDataOverlay from './NoDataOverlay';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {props.headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const TableWrapper = (props) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(props.dense);
    const [rowsPerPage, setRowsPerPage] = useState(50);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.value === 'true');
    };

    const handleClick = (event, name) => {
        if (props.onClickCallback && typeof props.onClickCallback === 'function') {
            props.onClickCallback(name);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.data.length) : 0;

    return (
        <Box sx={{ width: '100%' }} data-testid="table-wrapper">
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" id="tableTitle" component="div" sx={{ padding: 2, textTransform: 'uppercase' }} data-testid="table-title">
                        {props.title}
                    </Typography>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={dense}
                            onChange={handleChangeDense}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Comfortable" />
                            <FormControlLabel value={false} control={<Radio />} label="Compact" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                {props.data.length === 0 ? (
                    <NoDataOverlay />
                ) : (
                    <>
                        <TableContainer>
                            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'medium' : 'small'}>
                                <EnhancedTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    headCells={props.headCells}
                                />

                                <TableBody>
                                    {[...props.data]
                                        .sort(getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row)}
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={index}
                                            >
                                                {props.columns.map((column, index) => (
                                                    <TableCell key={index} align="left">
                                                        {row[column.id]}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50, 100]}
                            component="div"
                            count={props.data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default TableWrapper;
