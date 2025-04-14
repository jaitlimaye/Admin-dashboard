import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../utils/api/apiservice';
import { Box, Typography, Container, Button, TextField, MenuItem, Select, FormControl, InputLabel, IconButton, Pagination, Divider, Stack, Grid } from '@mui/material';
import { ErrorDisplay, Loading } from '../components/displays';
import { User } from '../utils/types/data/datatype';
import { CardGrid, ListGrid } from '../components/userlayouts';
import { useState, useReducer } from 'react';
import { State, Action } from '../utils/types/ui/homepagestate';
import Navbar from '../components/Navbar';
import useUIStore from '../utils/stores/uiStore';
import UserModal from '../components/modals/userModal';
const initialState: State = {
  page: 1,
  searchQuery: "",
  sortBy: "first_name",
  sortAsc: true,
  usersPerPage: 5,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "NEXT_PAGE":
      return { ...state, page: state.page + 1 };
    case "PREV_PAGE":
      return { ...state, page: Math.max(1, state.page - 1) };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload, page: 1 };
    case "SET_SORT":
      return {
        ...state,
        sortBy: action.payload,
      };
    case "SET_SORT_ASC":
      return { ...state, sortAsc: action.payload };
    case "SET_USERS_PER_PAGE":
      let topuser = ((state.page - 1) * state.usersPerPage) + 1;
      let currpage = Math.ceil(topuser / action.payload);
      return { ...state, usersPerPage: action.payload, page: currpage };
    default:
      return state;
  }
}
const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { page, searchQuery, sortBy, sortAsc, usersPerPage } = state;
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(), // Fetch all users
  });
  
  const { setEditModalEnable, editModalEnable,createModalEnable,setCreateModalEnable } = useUIStore();
  const userdata = {
    id: 0,
    first_name: "John",
    last_name: "Doe",
    email : 'aa',
    avatar: 'sfas',
  }
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorDisplay error={error} text={"user list"} />;
  }

  const users: User[] = data || [] as User[];
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortAsc ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortAsc ? 1 : -1;
    return 0;
  });

  const paginatedUsers = sortedUsers.slice((page - 1) * usersPerPage, page * usersPerPage);
  const handleEditClose = () => {
    setEditModalEnable(false);
  };
  const handleCreateClose = () => {
    setCreateModalEnable(false);
  };
  const handleEditSave = (user : User) => {
    console.log('close')
  };
  if (users.length === 0) {
    return (
      <Container sx={{
        paddingTop: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        mb: 3,
        width : "100%"
      }}>
        <Typography variant="h6" color="error">
          No users found.
        </Typography>
      </Container>
    );
  }

  return (
    <>
    <Navbar />
    <Container
      sx={{
        paddingTop: 4,
        paddingX: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        mb: 3,
        minWidth : "100%"
      }}
    >
      <Box sx={{ width: '100%', mb: 4 }}>
      {/* Header Section */}
      <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 2,
        minWidth : "100%"
    }}
  >
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2, width: '100%' }}>
    <Typography variant="h4" component="h1">
      Users
    </Typography>
    <TextField
      fullWidth
      label="Search"
      variant="outlined"
      value={searchQuery}
      onChange={(e) =>
        dispatch({ type: 'SET_SEARCH', payload: e.target.value })
      }
    />
    <Button variant="contained" color="primary" onClick={() => setCreateModalEnable(true)}>
      New User
    </Button>
    </Stack>
  </Box>
  
      <Box>
    
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{
        mb: 2,
        borderRadius: 2,
      }}
    >
      <Grid size = {{xs : 12 ,sm : 6, md : 3}}>
        <FormControl fullWidth>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            value={sortBy}
            label="Sort By"
            onChange={(e) =>
              dispatch({
                type: 'SET_SORT',
                payload: e.target.value as keyof User,
              })
            }
          >
            <MenuItem value="first_name">First Name</MenuItem>
            <MenuItem value="last_name">Last Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid size ={{xs : 12 ,sm : 6, md : 3}}>
        <FormControl fullWidth>
          <InputLabel id="order-label">Order</InputLabel>
          <Select
            labelId="order-label"
            value={sortAsc ? 'asc' : 'desc'}
            label="Order"
            onChange={(e) =>
              dispatch({
                type: 'SET_SORT_ASC',
                payload: e.target.value === 'asc',
              })
            }
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid size ={{xs : 12 ,sm : 6, md : 3}}>
        <FormControl fullWidth>
          <InputLabel id="items-label">Items Per Page</InputLabel>
          <Select
            labelId="items-label"
            value={usersPerPage}
            label="Items Per Page"
            onChange={(e) =>
              dispatch({
                type: 'SET_USERS_PER_PAGE',
                payload: Number(e.target.value),
              })
            }
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
      </Grid>

    </Grid>
  
  </Box>
  <Divider sx={{ mb: 2 }} />
      </Box>

        <ListGrid users={paginatedUsers} />
      
      {/* Pagination Section */}
      <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(filteredUsers.length / usersPerPage)}
          page={page}
          onChange={(_, value) => dispatch({ type: 'SET_PAGE', payload: value })}
          color="primary"
        />
        {isFetching && (
          <Typography variant="body2" sx={{ ml: 2 }}>
            Loading new page...
          </Typography>
        )}
      </Box>
    </Container>
        {editModalEnable && (
          <UserModal user={userdata}  onClose={() => handleEditClose()}  onSave={handleEditSave} title='Edit User'/>)}
          {createModalEnable && (
            <UserModal user={userdata}  onClose={() => handleCreateClose()}  onSave={handleEditSave} title='Create User'/>)}
    </>
  );
};

export default Home;