import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import useAuthStore,{IAuth} from '../utils/stores/authStore';
import useUIStore from '../utils/stores/uiStore';
import useSnackbarStore from '../utils/stores/snackbarStore';

const Navbar: React.FC = () => {
    const setToken  = useAuthStore((state : IAuth) => state.setToken);
    const {showSnackbar } = useSnackbarStore();
    const {setSettingModalEnable} = useUIStore();
      
    const handleLogout = () => {
        showSnackbar(`Logged out Successfully!`,"success");
        setToken(null); 
        window.location.href = '/login';
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Admin Dashboard
                </Typography>
                <IconButton color="inherit" aria-label="settings" onClick={() => setSettingModalEnable(true)}>
                    <SettingsIcon />
                </IconButton>
                <Button color="inherit" onClick={handleLogout} sx = {{border: 1, borderColor: "white"}}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;