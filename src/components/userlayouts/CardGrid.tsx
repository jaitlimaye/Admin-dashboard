import { Grid} from '@mui/material';
import { User } from '../../utils/types/data/datatype';
import { UserCard } from '../usercards';

export const CardGrid = ({users } : {users : User[]}) => {
    return(
        <Grid container spacing={3}>
        {users.map((user: User) => (
          <UserCard user={user} key={user.id} />
        ))}
      </Grid>
    )
}