import { useMutation } from "@tanstack/react-query";
import useUIStore from "../../utils/stores/uiStore";
import { DeleteModal, SettingsModal, UserModal } from "../modals"
import { createUserRequest } from "../../utils/types/request/createUserRequesttype";
import { postCreateUserData, putEditUserData, deleteUserData } from "../../utils/api/apiservice";
import { User } from "../../utils/types/data/datatype";
import useSnackbarStore from "../../utils/stores/snackbarStore";
import { useSettingsStore } from "../../utils/stores/settingsStore";

const ModalsSection = () => {
    
    const { showSnackbar } = useSnackbarStore();
    const { delay, setDelay } = useSettingsStore();
    const createMutation = useMutation({
        mutationFn: (newuserdata: createUserRequest) => postCreateUserData(newuserdata),
        onSuccess: () => showSnackbar(`User Created Successfully!`, "success"),
        onError: (err) => showSnackbar(`Error creating user ${err}`, "error"),
      });
    
      const editMutation = useMutation({
        mutationFn: (edituserdata: User) => putEditUserData(edituserdata),
        onSuccess: () => showSnackbar(`User Edited Successfully!`, "success"),
        onError: (err) => showSnackbar(`Error editing user ${err}`, "error"),
      });

      const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteUserData(id)
    });

      
    
    const {
        setEditModalEnable,
        settingModalEnable,
        setSettingModalEnable,
        editModalEnable,
        createModalEnable,
        setCreateModalEnable,
        setDeleteModalEnable,
        deleteModalEnable,
      } = useUIStore();

    const handleEditClose = () => setEditModalEnable(false);
      const handleCreateClose = () => setCreateModalEnable(false);
      const handleDeleteClose = () => setDeleteModalEnable(false);
      const handleSettingsClose = () => setSettingModalEnable(false);
      const handleSettingsSave = (localdelay: number) => {
        setDelay(localdelay);
        setSettingModalEnable(false);
      };
      const handleEditSave = (user: User) => {
        editMutation.mutate(user);
        setEditModalEnable(false);
      };
      const handleCreateSave = (newuser: createUserRequest) => {
        createMutation.mutate(newuser);
        showSnackbar(`Delay set to ${delay} secs`, "success");
        setCreateModalEnable(false);
      };
      const handleDelete = (id: string) => {
        deleteMutation.mutate(id);
        showSnackbar(`User Deleted Successfully!`, "success"),
        setDeleteModalEnable(false);
    };
    return(
        <>
            {editModalEnable && <UserModal onClose={handleEditClose} onSave={handleEditSave} title="Edit User" />}
      {createModalEnable && <UserModal onClose={handleCreateClose} onSave={handleCreateSave} title="Create User" />}
      {deleteModalEnable && <DeleteModal onClose={handleDeleteClose} onDelete={(id:string) => handleDelete(id)} />}
      {settingModalEnable && (
        <SettingsModal onClose={handleSettingsClose} onSave={handleSettingsSave} delay={delay} />
      )}
        </>
    )
}

export default ModalsSection;
