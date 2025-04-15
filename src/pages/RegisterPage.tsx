import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { TextField, Box, Typography, Container } from '@mui/material';
import { SubmitButton } from '../components/Buttons';
import { Link } from "react-router";
import { postRegisterData } from '../utils/api/apiservice';
import { registerRequest } from '../utils/types/request/registerRequesttype';
import useSnackbarStore from '../utils/stores/snackbarStore';

const RegisterPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<registerRequest>();
  const {showSnackbar } = useSnackbarStore();
  const password = watch('password');

  const mutation = useMutation({
    mutationFn: (req :registerRequest) => postRegisterData(req),
    onSuccess: () => {
      showSnackbar(`Registration Successful`,"success");
      // Add navigation or success message logic here
    },
    onError: (error) => {
      showSnackbar(`Login failed:${error}`,"error");
    },
  });

  const onSubmit = (data: registerRequest) => {
    if (data.password !== data.confirmPassword) {
      showSnackbar('Passwords do not match!',"error");
      return;
    }
    mutation.mutate(data); // Submit only email and password
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Register
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
            error={!!errors.confirmPassword}
          />
          <SubmitButton text="Register"  />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
