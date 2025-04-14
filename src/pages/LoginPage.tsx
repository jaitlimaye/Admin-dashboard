import { useForm } from 'react-hook-form';
import { TextField, Box, Typography, Container } from '@mui/material';
import { SubmitButton } from '../components/Buttons';
import { Link } from "react-router";
import { useMutation } from '@tanstack/react-query';
import { postLoginData } from '../utils/api/apiservice';
import useAuthStore, { IAuth } from '../utils/stores/authStore';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>();
  const setToken  = useAuthStore((state : IAuth) => state.setToken);

  const mutation = useMutation({
    mutationFn: (data : {email: string, password: string}) =>
      postLoginData(data),
    onSuccess: (response) => {
        setToken(response.token);
      },
      onError: (error) => {
        console.error('Login failed:', error);
      },}
    
  );

  const onSubmit = (data : {email: string, password: string}) => {
    mutation.mutate(data);
  };

  return (
    <Container maxWidth="xs" sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            autoComplete="current-password"
          />
          <SubmitButton text="Login" />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
