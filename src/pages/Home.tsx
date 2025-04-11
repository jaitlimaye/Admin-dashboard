
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../utils/api/apiservice';
import { Box, Typography, Avatar, Grid, CircularProgress,Container } from '@mui/material';

const Home = () => {
  const { data, isLoading, isError} = useQuery( {queryKey: ['users'],
    queryFn: () => getUsers()});

  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          Failed to load users.
        </Typography>
      </Box>
    );
  }

  const users = data?.data || [];

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>
   
      <Grid container spacing={2}>
        {users.map((user: any) => (
          
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                border: '1px solid #ddd',
                borderRadius: 2,
              }}
            >
              <Avatar src={user.avatar} alt={`${user.first_name} ${user.last_name}`} sx={{ width: 64, height: 64 }} />
              <Typography variant="h6">{`${user.first_name} ${user.last_name}`}</Typography>
              <Typography variant="body2" color="textSecondary">
                {user.email}
              </Typography>
            </Box>
          
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
