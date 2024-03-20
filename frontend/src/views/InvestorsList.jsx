import React, { useEffect } from 'react'
import { getInvestors } from '../api';
import { useState } from 'react';
import TableWrapper from '../components/TableWrapper';
import { Box, Container } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvestors } from '../slices/investorsSlice';
import config from '../config';

const InvestorsList = () => {

    // const [investors, setInvestors] = useState(null);
    const dispatch = useDispatch();
    const investors = useSelector(state => state.investors);

    useEffect(() => {
        // fetchData();
        dispatch(fetchInvestors());
    },[dispatch]);

    // const fetchData = async () => {
    //     const response = await getInvestors();
    //     const data = await response.data;
    //     setInvestors(data);
    //     console.log(data);
    // }

  return (
    <Container maxWidth="lg">
        <Box sx={{paddingBottom:2}}>

        <Breadcrumbs aria-label="breadcrumb">
            {config.breadcrumbs.investors.map((item, index) => {
                return (
                    <Link
                        key={index}
                        underline={index === config.breadcrumbs.investors.length - 1 ? "hover" : "none"}
                        color={index === config.breadcrumbs.investors.length - 1 ? "text.primary" : "inherit"}
                        href={item.href ? item.href : null}
                        aria-current="page"
                    >
                        {item.label}
                    </Link>
                );
            }
            )}
      </Breadcrumbs>
        </Box>
    <TableWrapper data={investors} dense={true} title={config.pageTitles.investors} headCells={config.investorsTableColumns} columns={config.investorsTableColumns} />
    </Container>
    
  )
}

export default InvestorsList