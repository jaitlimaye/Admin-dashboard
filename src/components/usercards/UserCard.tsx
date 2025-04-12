import { Box, Typography, Avatar, Grid, Button } from '@mui/material';
import { User } from '../../utils/types/data/datatype';
export const UserCard = ({user}:{user : User}) => {
    return (
        <Grid size={{xs : 12, sm : 6, md : 4}} >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                border: '1px solid #ddd',
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer',
                },
              }}
            >
              <Avatar src={user.avatar} alt={`${user.first_name} ${user.last_name}`} sx={{ width: 64, height: 64, mb: 1 }} />
              <Typography variant="h6">{`${user.first_name} ${user.last_name}`}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                {user.email}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" color="primary" size="small">
                  Edit
                </Button>
                <Button variant="outlined" color="error" size="small">
                  Delete
                </Button>
              </Box>
            </Box>
          </Grid>
    )
}