import React, { useReducer } from 'react';
import {useQuery } from '@tanstack/react-query';
import { Container, Box, Divider, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import { HeaderSection,FiltersSection,PaginationSection, ModalsSection } from '../components/homepage';
import { ListGrid } from '../components/userlayouts';
import { ErrorDisplay, Loading } from '../components/displays';
import { getUsers} from '../utils/api/apiservice';
import useUIStore from '../utils/stores/uiStore';
import { reducer, initialState } from '../utils/reducers/homePageReducer';
import { useSettingsStore } from '../utils/stores/settingsStore';
import { User } from '../utils/types/data/datatype';

const Home: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { delay} = useSettingsStore();
  const { page, searchQuery, sortBy, sortAsc, usersPerPage } = state;
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['users', delay],
    queryFn: () => getUsers(delay),
  });

  
  const {
    setData,
    setCreateModalEnable,
  } = useUIStore();

  const initialuserdata: User = {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorDisplay error={error} text={"user list"} />;

  // Filter, sort and paginate users
  const users: User[] = (data || []) as User[];
  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortAsc ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortAsc ? 1 : -1;
    return 0;
  });
  const paginatedUsers = sortedUsers.slice((page - 1) * usersPerPage, page * usersPerPage);

  // Handlers for UI actions and modal events
  const handleNewUser = () => {
    setData(initialuserdata);
    setCreateModalEnable(true);
  };

  

  const handlePageChange = (newPage: number) => {
    dispatch({ type: 'SET_PAGE', payload: newPage });
  };

  if (users.length === 0) {
    return (
      <Container
        sx={{
          pt: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 3,
          width: '100%',
        }}
      >
        <Typography variant="h6" color="error">
          No users found.
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        <HeaderSection
          searchQuery={searchQuery}
          onSearchChange={(value) => dispatch({ type: 'SET_SEARCH', payload: value })}
          onNewUserClick={handleNewUser}
        />
        <FiltersSection
          sortBy={sortBy}
          sortAsc={sortAsc}
          usersPerPage={usersPerPage}
          onSortChange={(value) => dispatch({ type: 'SET_SORT', payload: value })}
          onOrderChange={(asc) => dispatch({ type: 'SET_SORT_ASC', payload: asc })}
          onUsersPerPageChange={(value) => dispatch({ type: 'SET_USERS_PER_PAGE', payload: value })}
        />
        <Divider sx={{ mb: 2 }} />
        <Box>
          <ListGrid users={paginatedUsers} />
        </Box>
        <PaginationSection
          page={page}
          totalItems={filteredUsers.length}
          itemsPerPage={usersPerPage}
          isFetching={isFetching}
          onPageChange={handlePageChange}
        />
      </Container>
      <ModalsSection />
    </>
  );
};

export default Home;
