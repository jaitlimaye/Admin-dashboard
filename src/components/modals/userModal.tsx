import React, { useState } from 'react';
import { Box, Button, TextField, Avatar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import {User} from '../../utils/types/data/datatype';
import useUIStore from '../../utils/stores/uiStore';

interface UserModalProps {
    onSave: (updatedUser: User) => void;
    onClose: () => void;
    title : string
}

const UserModal: React.FC<UserModalProps> = ({onSave, onClose,title }) => {
    const {data} = useUIStore();
    const [formData, setFormData] = useState({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave({ ...data, ...formData });
    };

  

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Box display="flex" justifyContent="center" mb={2}>
                   
                        <Avatar src={data.avatar} alt={`${data.first_name} ${data.last_name}`} sx={{ width: 80, height: 80 }} />
                  
                   
                </Box>
                <TextField
                    margin="normal"
                    fullWidth
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserModal;