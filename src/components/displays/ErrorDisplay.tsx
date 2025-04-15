import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';

export const ErrorDisplay = ({ error, text }: { error: any; text: string }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        color: 'red',
        textAlign: 'center',
        marginTop: '20px',
        padding: '20px',
        border: '1px solid red',
        borderRadius: '8px',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Error while displaying {text}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {error.message}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {navigate("/")}}
        sx={{ marginTop: '10px' }}
      >
        Go Back
      </Button>
    </Box>
  );
};