import React from 'react';
import { Modal, Box, Typography, Button, Stack } from '@mui/material';

interface SettingsModalProps {
  onClose: () => void;
  onSave: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onSave }) => {
  return (
    <Modal open onClose={onClose} aria-labelledby="settings-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="settings-modal-title" variant="h6" component="h2" gutterBottom>
          Settings
        </Typography>
        {/* Add your settings form or content here */}
        <Typography variant="body2" sx={{ mb: 3 }}>
          Configure your settings here.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onSave}>
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default SettingsModal;
