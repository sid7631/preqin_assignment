import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TableWrapper from '../components/TableWrapper';
import { fetchInvestors } from '../slices/investorsSlice';
import config from '../config';

const InvestorsList = () => {
    const dispatch = useDispatch();
    const investors = useSelector(state => state.investors);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchInvestors());
    }, [dispatch]);

    const onClickCallback = (name) => {
        navigate(`/investors/${name['firm_id']}`);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ paddingBottom: 2 }}>
                <Breadcrumbs aria-label="breadcrumb">
                    {config.breadcrumbs.investors.map((item, index) => (
                        <Link
                            key={index}
                            underline={index === config.breadcrumbs.investors.length - 1 ? 'hover' : 'none'}
                            color={index === config.breadcrumbs.investors.length - 1 ? 'text.primary' : 'inherit'}
                            href={item.href ? item.href : null}
                            aria-current="page"
                        >
                            {item.label}
                        </Link>
                    ))}
                </Breadcrumbs>
            </Box>
            <TableWrapper
                onClickCallback={onClickCallback}
                data={investors}
                dense={true}
                title={config.pageTitles.investors}
                headCells={config.investorsTableColumns}
                columns={config.investorsTableColumns}
            />
        </Container>
    );
};

export default InvestorsList;
