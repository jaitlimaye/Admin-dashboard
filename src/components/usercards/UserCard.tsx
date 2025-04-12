import { Box, Typography, Avatar, Button } from '@mui/material';
import { User } from '../../utils/types/data/datatype';
export const UserCard = ({user}:{user : User}) => {
    return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            border: '1px solid #ddd',
            borderRadius: 3,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            width: 240, // Fixed width for consistency
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Avatar src={user.avatar} alt={`${user.first_name} ${user.last_name}`} sx={{ width: 80, height: 80, mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            {`${user.first_name} ${user.last_name}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3, textAlign: 'center' }}>
            {user.email}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
            <Button variant="contained" color="primary" size="small">
              Edit
            </Button>
            <Button variant="contained" color="error" size="small">
              Delete
            </Button>
          </Box>
        </Box>
    )
}