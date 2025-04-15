import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { User } from '../../utils/types/data/datatype';

interface FiltersSectionProps {
  sortBy: keyof User;
  sortAsc: boolean;
  usersPerPage: number;
  onSortChange: (value: keyof User) => void;
  onOrderChange: (value: boolean) => void;
  onUsersPerPageChange: (value: number) => void;
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  sortBy,
  sortAsc,
  usersPerPage,
  onSortChange,
  onOrderChange,
  onUsersPerPageChange,
}) => {
  return (
      <Grid container spacing={2} alignItems="center">
        <Grid sx={{xs:12,sm:4}}>
          <FormControl fullWidth>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={sortBy}
              label="Sort By"
              onChange={(e) => onSortChange(e.target.value as keyof User)}
            >
              <MenuItem value="first_name">First Name</MenuItem>
              <MenuItem value="last_name">Last Name</MenuItem>
              <MenuItem value="email">Email</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid sx={{xs:12,sm:4}}>
          <FormControl fullWidth>
            <InputLabel id="order-label">Order</InputLabel>
            <Select
              labelId="order-label"
              value={sortAsc ? 'asc' : 'desc'}
              label="Order"
              onChange={(e) => onOrderChange(e.target.value === 'asc')}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid sx={{xs:12,sm:4}}>
          <FormControl fullWidth>
            <InputLabel id="items-label">Items Per Page</InputLabel>
            <Select
              labelId="items-label"
              value={usersPerPage}
              label="Items Per Page"
              onChange={(e) => onUsersPerPageChange(Number(e.target.value))}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
  );
};

export default FiltersSection;
