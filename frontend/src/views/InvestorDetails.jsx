import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Select, MenuItem, Box, Typography, Paper, Container, FormControl, Breadcrumbs, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getInvestorCommitment } from '../api';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import BusinessIcon from '@mui/icons-material/Business';
import config from '../config';
import TableWrapper from '../components/TableWrapper';
import { fetchInvestors } from '../slices/investorsSlice';
import Link from '@mui/material/Link';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
}));

const SubLabel = styled('span')(({ theme }) => ({
    ...theme.typography.caption,
    color: theme.palette.text.secondary,
    textTransform: 'capitalize',
}));

const MainLabel = styled('div')(({ theme }) => ({
    ...theme.typography.subtitle1,
    color: theme.palette.text.primary,
    fontWeight: 400,
}));

const LabelTitle = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.grey[100],
    fontWeight: 500,
    elevation: 0,
    padding: theme.spacing(1),
}));

const InvestorDetails = () => {
    const { firm_id } = useParams();
    const [assetClass, setAssetClass] = useState('');
    const [commitments, setCommitments] = useState(null);
    const dispatch = useDispatch();
    const investors = useSelector(state => state.investors);
    const investor = investors.find(investor => investor.firm_id === parseInt(firm_id));

    const handleChange = (event) => {
        setAssetClass(event.target.value);
    };

    useEffect(() => {
        if (investor === undefined) {
            dispatch(fetchInvestors());
        }
    }, []);

    useEffect(() => {
        if (assetClass) {
            fetchData();
        }
    }, [assetClass]);

    const fetchData = async () => {
        const response = await getInvestorCommitment(assetClass, parseInt(firm_id));
        const data = response.data;
        setCommitments(data);
    };

    const getFormattedDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const DetailRow = ({ label, value, icon }) => {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {icon && <Box sx={{ marginRight: 1 }}>{icon}</Box>}
                <Box>
                    <SubLabel>{label}</SubLabel>
                    <MainLabel>{value}</MainLabel>
                </Box>
            </Box>
        );
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ paddingBottom: 2 }}>
                <Breadcrumbs aria-label="breadcrumb">
                    {config.breadcrumbs.commitments.map((item, index) => (
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
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Item>
                        {investor ? (
                            <Box sx={{ padding: 1 }}>
                                <Typography variant="h5" component="h1" sx={{ textTransform: 'uppercase', marginBottom: 2 }}>
                                    {investor.firm_name}
                                    <Typography variant="caption" component="span" sx={{ marginLeft: 1, textTransform: 'capitalize' }}>
                                        {`Last Updated: ${getFormattedDate(investor.last_updated)}`}
                                    </Typography>
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid xs={6}>
                                        <DetailRow label="FIRM ID" value={investor.firm_id} />
                                    </Grid>
                                    <Grid xs={6}>
                                        <DetailRow label="Start Date" value={getFormattedDate(investor.date_added)} />
                                    </Grid>
                                    <Grid xs={12} sx={{ marginTop: 2 }}>
                                        <LabelTitle elevation={0}>Address</LabelTitle>
                                    </Grid>
                                    <Grid xs={6}>
                                        <DetailRow label={investor.firm_type} value={`${investor.address} ${investor.country}`} icon={<BusinessIcon />} />
                                    </Grid>
                                    <Grid xs={6}>
                                        <DetailRow label="AUM" value={investor.AUM} />
                                    </Grid>
                                    <Grid xs={12} sx={{ marginTop: 2 }}>
                                        <LabelTitle elevation={0}>Commitments</LabelTitle>
                                    </Grid>
                                    <Grid xs={12}>

                                    <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
                                        <InputLabel id="asset-select-label" data-testid="asset-selct-label"> Select Asset Class</InputLabel>
                                        <Select
                                            labelId="asset-select-label"
                                            id="asset-select"
                                            value={assetClass}
                                            label="Select Asset Class"
                                            autoWidth
                                            onChange={handleChange}
                                            data-testid="select-assetclass"
                                        >
                                                <MenuItem value="pe" key={1} data-testid="pe">Private Equity</MenuItem>
                                                <MenuItem value="pd" key={2} data-testid="pd">Private Debt</MenuItem>
                                                <MenuItem value="re" key={3} data-testid="re">Real Estate</MenuItem>
                                                <MenuItem value="inf" key={4} data-testid="inf">Infrastructure</MenuItem>
                                                <MenuItem value="nr" key={5} data-testid="nr">Natural Resources</MenuItem>
                                                <MenuItem value="hf" key={6} data-testid="hf">Hedge Funds</MenuItem>
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                    <Grid xs={12}>
                                        {commitments && <TableWrapper dense={false} data={commitments} title={''} headCells={config.commitmentsTableColumns} columns={config.commitmentsTableColumns} />}
                                    </Grid>
                                </Grid>
                            </Box>
                        ) : (
                            <div>Investor not found</div>
                        )}
                    </Item>
                </Grid>
            </Grid>
        </Container>
    );
};

export default InvestorDetails;
