import {create} from 'zustand';
import { User } from '../types/data/datatype';

export interface UIState {
    editModalEnable: boolean;
    createModalEnable: boolean;
    deleteModalEnable: boolean;
    setEditModalEnable: (value: boolean) => void;
    setCreateModalEnable: (value: boolean) => void;
    setDeleteModalEnable: (value: boolean) => void;
    data : User;
    setData: (user: User) => void;
}

const useUIStore = create<UIState>((set) => ({
    editModalEnable: false,
    createModalEnable: false,
    deleteModalEnable: false,
    setEditModalEnable: (value: boolean) => set({ editModalEnable: value }),
    setCreateModalEnable: (value: boolean) => set({ createModalEnable: value }),
    setDeleteModalEnable: (value: boolean) => set({ deleteModalEnable: value }),
    data : {
        id: 0,
        email: "",
        first_name: "",
        last_name: "",
        avatar: ""},
    setData: (user: User) => set({ data: user})
}));

export default useUIStore;