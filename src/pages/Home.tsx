import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../utils/api/apiservice';
import { Box, Typography, Container, Button, TextField, MenuItem, Select, FormControl, InputLabel} from '@mui/material';
import { ErrorDisplay,Loading } from '../components/displays';
import { User } from '../utils/types/data/datatype';
import { CardGrid , ListGrid } from '../components/userlayouts';
import { useState } from 'react';

const Home = () => {
  const [viewMode, setViewMode] = useState('list'); // Toggle between 'list' and 'card'
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorDisplay error={error} text={"user list"} />;
  }

  const users: User[] = data?.data || [] as User[];
  if (users.length === 0) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          No users found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ paddingTop: 4, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', mb: 3 }}>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Users
        </Typography>
        <Button variant="contained" color="primary">
          New User
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="view-mode-label">View</InputLabel>
          <Select
            labelId="view-mode-label"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
          >
            <MenuItem value="list">List</MenuItem>
            <MenuItem value="card">Card</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Search" variant="outlined" sx={{ flex: 1, mx: 2 }} />
        <Button variant="contained" color="primary">
          Filter
        </Button>
      </Box>

      {/* User List */}
      {viewMode === 'list' ? (
        <ListGrid users={users} />
      ) : (
        <CardGrid users={users} />
      )}
    </Container>
  );
};

export default Home;
