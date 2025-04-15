import React from 'react';
import { Box, Typography, Button, TextField, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
interface HeaderSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNewUserClick: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  searchQuery,
  onSearchChange,
  onNewUserClick,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <Typography variant="h4" component="h1">
          Users
        </Typography>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={onNewUserClick}>
          Add <AddIcon />
        </Button>
      </Stack>
    </Box>
  );
};

export default HeaderSection;
