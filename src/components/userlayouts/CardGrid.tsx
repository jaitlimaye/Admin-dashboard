import { Grid } from '@mui/material';
import { User } from '../../utils/types/data/datatype';
import { UserCard } from '../usercards';

export const CardGrid = ({users } : {users : User[]}) => {
    return(
        <Grid container size = {{xs : 12, sm : 6, md : 4}} spacing={3} justifyContent="center" alignItems="center" sx = {{paddingTop : 2}}>
          {users.map((user: User) => (
              <UserCard user={user}  key={user.id} />
          ))}
        </Grid>
    )
}