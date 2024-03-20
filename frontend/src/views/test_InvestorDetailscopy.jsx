import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import InvestorDetails from './InvestorDetails';
import { fetchInvestors } from '../slices/investorsSlice';
import { getInvestorCommitment } from '../api';

jest.mock('react-redux');
jest.mock('react-router-dom');
jest.mock('../api');

describe('InvestorDetails', () => {
  const mockFirmId = '2670';
  const mockInvestor = {
    firm_id: 2670,
    firm_name: 'Mjd Jedi fund',
    AUM: 426920827,
    date_added: '2010-06-08T00:00:00Z',
    last_updated: '2024-02-21T00:00:00Z',
    established_at: '2010-06-08T00:00:00Z',
    firm_type: 'bank',
    city: 'Hong Kong',
    country: 'China',
    address: '29 Nathan Road, Hong Kong',
    postal_code: '37E',
  };
  const mockCommitments = [
    {
      commitment_id: 1,
      asset_class: 'pe',
      amount: 1000000,
      date: '2022-01-01T00:00:00Z',
    },
    {
      commitment_id: 2,
      asset_class: 're',
      amount: 2000000,
      date: '2022-02-01T00:00:00Z',
    },
  ];

  beforeEach(() => {
    useSelector.mockImplementation(callback => callback({
      investors: [mockInvestor],
    }));
    useDispatch.mockReturnValue(jest.fn());
    useParams.mockReturnValue({ firm_id: mockFirmId });
    getInvestorCommitment.mockResolvedValue({ data: mockCommitments });
  });

  test('renders investor details', () => {
    render(<InvestorDetails />);

    expect(screen.getByText(mockInvestor.firm_name)).toBeInTheDocument();
    expect(screen.getByText(mockInvestor.firm_id)).toBeInTheDocument();
    expect(screen.getByText(mockInvestor.AUM)).toBeInTheDocument();
    expect(screen.getByText(`${mockInvestor.address} ${mockInvestor.country}`)).toBeInTheDocument();
  });

  test('fetches investors if investor is not found', () => {
    useSelector.mockImplementation(callback => callback({
      investors: [],
    }));

    render(<InvestorDetails />);

    expect(fetchInvestors).toHaveBeenCalled();
  });

  test('fetches commitments when asset class is selected', async () => {
    render(<InvestorDetails />);

    const select = screen.getByTestId('select-assetclass');
    fireEvent.change(select, { target: { value: 'pe' } });

    expect(getInvestorCommitment).toHaveBeenCalledWith('pe', mockInvestor.firm_id);
    expect(await screen.findByText(mockCommitments[0].amount)).toBeInTheDocument();
    expect(screen.getByText(mockCommitments[1].amount)).toBeInTheDocument();
  });
});