import { useParams, useNavigate } from "react-router";
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Loading, ErrorDisplay } from "../components/displays";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../utils/api/apiservice";
import { EditableField } from "../components/EditableField";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  if (!id) {
    return <div>No user ID provided</div>;
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserData(id),
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorDisplay error={error} text={`user with id ${id}`} />;
  if (Object.keys(data).length === 0) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          No such user found.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/home")}>
          Go Back to Home
        </Button>
      </Container>
    );
  }

  const { first_name, last_name, email, avatar } = data.data;

  const fullName = `${first_name} ${last_name}`;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        p={3}
        borderRadius={2}
        boxShadow={3}
        sx={{ backgroundColor: "#fff" }}
      >
        <img
          src={avatar}
          alt={fullName}
          style={{ borderRadius: "50%", width: 150, height: 150 }}
        />

        {/* Name Section */}
        <Grid sx = {{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center', width:"100%",gap: 1 }}>
          <EditableField field={first_name} label="First Name" field_key="first_name" userId={id}/>
          <EditableField field={last_name} label="Last Name" field_key="last_name" userId={id}/>
        
        <EditableField field={email} label="Email" field_key="email" userId={id}/>
        </Grid>
      </Box>
      <Box sx= {{display:'flex',flexDirection: 'row', justifyContent : 'flex-end'}}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/home")}
        sx={{ mt: 2 }}
      >
        Back to Home
      </Button>
      </Box>
    </Container>
  );
};

export default UserDetails;
