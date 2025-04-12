import { Box, Typography, Avatar, Grid,Button} from '@mui/material';
import { User } from '../../utils/types/data/datatype';
export const UserListCard = ({user}:{user : User}) => {
    return (
        <Grid size = { {xs : 12}}>
              <Box sx={{ display: 'flex',flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between',p:2, border: '1px solid #ccc', borderRadius: 1 }}>
              <Box sx={{ display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'center', gap: 1 }}>
                <Avatar src={user.avatar} alt={user.first_name} sx={{ mr: 5 }} />
              
                  <Typography variant="h5">{`${user.first_name} ${user.last_name}`}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ display: 'column',flexDirection: 'row',alignItems: 'flex-end'}}>{user.email}</Typography>
                </Box>  
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