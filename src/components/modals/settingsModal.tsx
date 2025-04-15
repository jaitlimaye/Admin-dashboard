import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Stack, Slider } from '@mui/material';

interface SettingsModalProps {
  onClose: () => void;
  onSave: (newDelay: number) => void;
  delay: number;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onSave, delay }) => {
  const [localDelay, setLocalDelay] = useState(delay);

  const handleSliderChange = (event: Event, value: number | number[]) => {
    event.preventDefault(); // Prevent default behavior of the event
    setLocalDelay(value as number);
  };

  const handleSave = () => {
    onSave(localDelay);
  };

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
        <Typography variant="body2" sx={{ mb: 3 }}>
          Configure your settings here.
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Set Delay (in seconds):
        </Typography>
        <Slider
          value={localDelay}
          onChange={handleSliderChange}
          aria-labelledby="delay-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={10}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default SettingsModal;
