import React from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import InvestorDetails from '../views/InvestorDetails';
import { fetchInvestors } from '../slices/investorsSlice';
import { getInvestorCommitment } from '../api';
import config from '../config';
import { act } from 'react-dom/test-utils';

jest.mock('react-redux');
jest.mock('react-router-dom');
jest.mock('../api', () => ({
  getInvestorCommitment: jest.fn(),
}));
jest.mock('../slices/investorsSlice', () => ({
  fetchInvestors: jest.fn(),
}));

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
      id: 34728,
      asset_class: "pe",
      firm_id: 2670,
      currency: "HKD",
      amount: "6M"
    },
    {
      id: 90806,
      asset_class: "pe",
      firm_id: 2670,
      currency: "EUR",
      amount: "20M"
    }
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

  test('renders commitments table when asset class is selected', async () => {
    render(<InvestorDetails />);

    const selectLabel = /Select Asset Class/i;
    const selectEl = await screen.findByLabelText(selectLabel);

    expect(selectEl).toBeInTheDocument();

    act(() => {
      userEvent.click(selectEl);
    });

    const optionsPopupEl = await screen.findByRole("listbox", {
      name: selectLabel
    });

    act(() => {
      userEvent.click(within(optionsPopupEl).getByText(/Private Equity/i))
    });
    expect(await screen.findByText(34728)).toBeInTheDocument();

  });

  test('calls fetchInvestors when investor is not found', () => {
    useSelector.mockImplementation(callback => callback({
      investors: [],
    }));

    render(<InvestorDetails />);

    expect(fetchInvestors).toHaveBeenCalled();
  });
});