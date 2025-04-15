import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import useUIStore from "../../utils/stores/uiStore";

interface DeleteModalProps {
    onDelete: (id : string) => void;
    onClose: () => void;
}
const DeleteModal : React.FC<DeleteModalProps> = ({  onDelete, onClose }) => {
    const {data} = useUIStore();
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
            <Button onClick={() => onDelete(data.id.toString())} color="primary">
            Delete
            </Button>
        </DialogActions>
        </Dialog>
    );
    }

    export default DeleteModal;