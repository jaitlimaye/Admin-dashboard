import {
    Typography,
    IconButton,
    TextField,
    Box
  } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
  import CheckIcon from "@mui/icons-material/Check";
  import CloseIcon from "@mui/icons-material/Close";
  
  import { useState } from "react";
export const EditableField = ({field,label} : {field:string, label:string}) => {
    const [isEditing, setIsEditing] = useState(false);
      const [editedField, setEditedField] = useState("");
    return (
        <Box sx={{ display: "flex",flexDirection:"row",justifyContent:"center", alignItems: "center", width: "100%", gap: 1, height:"24px",p:2 }}>
            <Typography  sx={{  display: "flex",flexDirection:"row", justifyContent:"flex-end" ,alignItems: "flex-end", width : "40%"}}>
                {label} :
            </Typography>
            {isEditing ? (
                <>
                <TextField
                    value={editedField}
                    onChange={(e) => setEditedField(e.target.value)}
                    sx={{ display: "flex", alignItems: "center", width : "30%"}}
                />
                <Box sx={{ display: "flex", width : "30%", flexDirection:"row", justifyContent:"flex-end" ,alignItems: "flex-end"}}>
                <IconButton onClick={() => setIsEditing(false)}>
                    <CloseIcon />
                </IconButton>
                <IconButton onClick={() => setIsEditing(false)}>
                    <CheckIcon />
                </IconButton>
                </Box>
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