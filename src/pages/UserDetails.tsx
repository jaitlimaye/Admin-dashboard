import { useParams, useNavigate } from "react-router";
import {Box, Typography, Container, Button } from '@mui/material';
import { Loading,ErrorDisplay } from "../components/displays";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../utils/api/apiservice";

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    if (!id) {
        return <div>No user ID provided</div>;
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users', id],
        queryFn: () => getUserData(id),
    });
    
    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorDisplay error={error} text={`user with id ${id}`} />;
    }
    if (Object.keys(data).length === 0) {
        return (
            <Container>
                <Typography variant="h6" color="error">
                    No such user found.
                </Typography>
                <Button variant="contained" color="primary" onClick={() => navigate('/home')}>
                    Go Back to Home
                </Button>
            </Container>
        );
    }
    

    const { first_name, last_name, email, avatar } = data.data;

    return (
        <Container>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <img src={avatar} alt={`${first_name} ${last_name}`} style={{ borderRadius: '50%', width: 150, height: 150 }} />
                <Typography variant="h5">{`${first_name} ${last_name}`}</Typography>
                <Typography variant="body1">{email}</Typography>
            </Box>
        </Container>
    );
};

export default UserDetails;