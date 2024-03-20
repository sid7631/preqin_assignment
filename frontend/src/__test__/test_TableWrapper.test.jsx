import React from 'react';
import { render, screen, fireEvent, configure } from '@testing-library/react';
import TableWrapper from '../components/TableWrapper';
import config from '../config';

describe('TableWrapper', () => {
  const mockData = [
    {
      "firm_id": 2670,
      "firm_name": "Mjd Jedi fund",
      "AUM": 426920827,
      "date_added": "2010-06-08T00:00:00Z",
      "last_updated": "2024-02-21T00:00:00Z",
      "established_at": "2010-06-08T00:00:00Z",
      "firm_type": "bank",
      "city": "Hong Kong",
      "country": "China",
      "address": "29 Nathan Road, Hong Kong",
      "postal_code": "37E"
    },
    {
      "firm_id": 2792,
      "firm_name": "Ibx Skywalker ltd",
      "AUM": 307975834,
      "date_added": "1997-07-21T00:00:00Z",
      "last_updated": "2024-02-21T00:00:00Z",
      "established_at": "1997-07-21T00:00:00Z",
      "firm_type": "asset manager",
      "city": "New York",
      "country": "United States",
      "address": "19 Fifth Avenue, New York",
      "postal_code": "00347"
    },
  ];

  const mockHeadCells = [
    { id: 'name', label: 'Name' },
    { id: 'age', label: 'Age' },
  ];

  const mockOnClickCallback = jest.fn();

  test('renders table title', () => {
    render(
      <TableWrapper
        data={mockData}
        title={config.pageTitles.investors}
        headCells={config.investorsTableColumns}
        columns={config.investorsTableColumns}
        onClickCallback={mockOnClickCallback}
      />
    );

    expect(screen.getByTestId('table-title')).toHaveTextContent('Investors');
  });

  test('renders table headers', () => {
    render(
      <TableWrapper
        data={mockData}
        title={config.pageTitles.investors}
        headCells={config.investorsTableColumns}
        columns={config.investorsTableColumns}
        onClickCallback={mockOnClickCallback}
      />
    );

    for (const headCell of config.investorsTableColumns) {
      expect(screen.getByText(headCell.label)).toBeInTheDocument();
    }

  });

  test('renders table rows', () => {
    render(
      <TableWrapper
        data={mockData}
        title={config.pageTitles.investors}
        headCells={config.investorsTableColumns}
        columns={config.investorsTableColumns}
        onClickCallback={mockOnClickCallback}
      />
    );

    expect(screen.getByText(2670)).toBeInTheDocument();
    expect(screen.getByText('Mjd Jedi fund')).toBeInTheDocument();
    expect(screen.getByText('bank')).toBeInTheDocument();
    expect(screen.getByText('29 Nathan Road, Hong Kong')).toBeInTheDocument();
  });

  test('calls onClickCallback when row is clicked', () => {
    render(
      <TableWrapper
        data={mockData}
        title={config.pageTitles.investors}
        headCells={config.investorsTableColumns}
        columns={config.investorsTableColumns}
        onClickCallback={mockOnClickCallback}
      />
    );

    const row = screen.getByText(2670);
    fireEvent.click(row);

    expect(mockOnClickCallback).toHaveBeenCalledWith({
      firm_id: 2670,
      firm_name: "Mjd Jedi fund",
      AUM: 426920827,
      date_added: "2010-06-08T00:00:00Z",
      last_updated: "2024-02-21T00:00:00Z",
      established_at: "2010-06-08T00:00:00Z",
      firm_type: "bank",
      city: "Hong Kong",
      country: "China",
      address: "29 Nathan Road, Hong Kong",
      postal_code: "37E"
    });
  });

  // Add more tests for other functionality as needed

});