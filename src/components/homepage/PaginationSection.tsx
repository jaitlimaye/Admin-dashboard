import React from 'react';
import { Box, Pagination, Typography } from '@mui/material';

interface PaginationSectionProps {
  page: number;
  totalItems: number;
  itemsPerPage: number;
  isFetching: boolean;
  onPageChange: (page: number) => void;
}

const PaginationSection: React.FC<PaginationSectionProps> = ({
  page,
  totalItems,
  itemsPerPage,
  isFetching,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Pagination
        count={pageCount}
        page={page}
        onChange={(_, value) => onPageChange(value)}
        color="primary"
      />
      {isFetching && (
        <Typography variant="body2" sx={{ ml: 2 }}>
          Loading new page...
        </Typography>
      )}
    </Box>
  );
};

export default PaginationSection;
