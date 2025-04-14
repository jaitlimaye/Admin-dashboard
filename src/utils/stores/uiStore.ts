import {create} from 'zustand';
import { User } from '../types/data/datatype';

export interface UIState {
    editModalEnable: boolean;
    createModalEnable: boolean;
    setEditModalEnable: (value: boolean) => void;
    setCreateModalEnable: (value: boolean) => void;
    data : User;
    setData: (user: User) => void;
}

const useUIStore = create<UIState>((set) => ({
    editModalEnable: false,
    createModalEnable: false,
    setEditModalEnable: (value: boolean) => set({ editModalEnable: value }),
    setCreateModalEnable: (value: boolean) => set({ createModalEnable: value }),
    data : {
        id: 0,
        email: "",
        first_name: "",
        last_name: "",
        avatar: ""},
    setData: (user: User) => set({ data: user})
}));

export default useUIStore;