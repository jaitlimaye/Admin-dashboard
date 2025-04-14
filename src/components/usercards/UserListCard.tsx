import { Box, Typography, Avatar, Grid,Button} from '@mui/material';
import { User } from '../../utils/types/data/datatype';
import { useNavigate} from "react-router";
import useUIStore from '../../utils/stores/uiStore';

export const UserListCard = ({user}:{user : User}) => {
  const navigate = useNavigate();
    const handleUserClick = (id : number) => {
      navigate(`/user/${id}`);
    }

    const {setEditModalEnable,setData} = useUIStore();
    const handleEditClick = (e : any) => {
        e.stopPropagation();
        setData(user);
        setEditModalEnable(true);
    }

    return (
     
        <Grid size = { {xs : 12}}>
              <Box
              onClick={() => handleUserClick(user.id)}
  sx={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 2,
    border: '1px solid #ccc',
    transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
    '&:hover': {
      boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
    
      backgroundColor: '#f0f0f0', 
      cursor: 'pointer'
    },
  }}
>
              <Box sx={{ display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'center', gap: 1 }}>
                <Avatar src={user.avatar} alt={user.first_name} sx={{ mr: 5 }} />
              
                  <Typography variant="h5">{`${user.first_name} ${user.last_name}`}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ display: 'column',flexDirection: 'row',alignItems: 'flex-end'}}>{user.email}</Typography>
                </Box>  
                <Box sx={{ display: 'flex', gap: 1, zIndex: 999 }}>
                <Button variant="outlined" color="primary" size="small" onClick={(e) => handleEditClick(e)}>
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