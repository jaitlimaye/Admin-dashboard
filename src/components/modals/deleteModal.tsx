import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

interface DeleteModalProps {
    onDelete: () => void;
    onClose: () => void;
}
export const DeleteModal : React.FC<DeleteModalProps> = ({  onDelete, onClose }) => {
    return (
        <Dialog open onClose={onClose}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
            <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="secondary">
            Cancel
            </Button>
            <Button onClick={() => onDelete()} color="primary">
            Delete
            </Button>
        </DialogActions>
        </Dialog>
    );
    }