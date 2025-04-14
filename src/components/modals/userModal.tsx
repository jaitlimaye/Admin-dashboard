import React, { useState } from 'react';
import { Box, Button, TextField, Avatar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import {User} from '../../utils/types/data/datatype';

interface UserModalProps {
    user: User;
    onSave: (updatedUser: User) => void;
    onClose: () => void;
    title : string
}

const UserModal: React.FC<UserModalProps> = ({ user, onSave, onClose,title }) => {
    const [formData, setFormData] = useState({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave({ ...user, ...formData });
    };

    const getDefaultAvatar = () => {
        return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    };

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Box display="flex" justifyContent="center" mb={2}>
                    {user.avatar ? (
                        <Avatar src={user.avatar} alt="User Avatar" sx={{ width: 80, height: 80 }} />
                    ) : (
                        <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
                            {getDefaultAvatar()}
                        </Avatar>
                    )}
                </Box>
                <TextField
                    margin="normal"
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
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