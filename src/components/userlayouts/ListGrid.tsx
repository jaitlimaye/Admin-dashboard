import { Grid} from '@mui/material';
import { User } from '../../utils/types/data/datatype';
import { UserListCard } from '../usercards';

export const ListGrid = ({users } : {users : User[]}) => {
    return(
        <Grid container spacing={2}>
          {users.map((user) => (
            <UserListCard user={user} key={user.id} />
          ))}
        </Grid>
    )
}