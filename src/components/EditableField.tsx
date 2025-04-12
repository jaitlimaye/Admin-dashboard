import {
    Typography,
    IconButton,
    TextField,
    Box,
    CircularProgress
  } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
  import CheckIcon from "@mui/icons-material/Check";
  import CloseIcon from "@mui/icons-material/Close";
  import { useMutation } from "@tanstack/react-query";
import { patchUserData } from "../utils/api/apiservice";
  import { useState } from "react";

export const EditableField = ({field,label,userId,field_key,} : {field:string, label:string,userId : string,field_key :string}) => {
        const [isEditing, setIsEditing] = useState(false);
      const [editedField, setEditedField] = useState("");
      const { mutate, isPending } = useMutation({
        mutationFn: (newValue: string) =>
          patchUserData(userId, { [field_key]: newValue }),
        onSuccess: () => {
          setIsEditing(false);
          // You could also show a snackbar or refetch user data here
        },
        onError: (err) => {
          console.error("Error updating user:", err);
          // Show error toast/snackbar here if needed
        }
      });
    return (
        <Box sx={{ display: "flex",flexDirection:"row",justifyContent:"center", alignItems: "center", width: "100%", gap: 1, height:"24px",p:2 }}>
            <Typography  sx={{  display: "flex",flexDirection:"row", justifyContent:"flex-end" ,alignItems: "flex-end", width : "40%"}}>
                {label} :
            </Typography>
            {isEditing ? (
                <>
                {isPending ?
                <Box sx={{ display: "flex", alignItems: "center", width : "100%"}}>
                 <CircularProgress size={20} /> 
                 </Box>: (<>
                <TextField
                    value={editedField}
                    onChange={(e) => setEditedField(e.target.value)}
                    sx={{ display: "flex", alignItems: "center", width : "30%"}}
                />
                <Box sx={{ display: "flex", width : "30%", flexDirection:"row", justifyContent:"flex-end" ,alignItems: "flex-end"}}>
                <IconButton onClick={() => setIsEditing(false)}>
                    <CloseIcon />
                </IconButton>
                <IconButton onClick={() => mutate(editedField)}>
                    <CheckIcon />
                </IconButton>
                </Box>
                </>)}
                </>
            ) : (
                <>
                <Typography  sx={{ display: "flex", alignItems: "center", width : "30%"}}>{field}</Typography>
                <Box sx={{ display: "flex", width : "30%", flexDirection:"row", justifyContent:"flex-end" ,alignItems: "flex-end"}}>
                <IconButton
                    size="small"
                    
                    onClick={() => {
                    setIsEditing(true);
                    setEditedField(field);
                    }}
                >
                    <EditIcon fontSize="small" />
                </IconButton>
                </Box>
                </>
            )}
            
        </Box>
    )
}