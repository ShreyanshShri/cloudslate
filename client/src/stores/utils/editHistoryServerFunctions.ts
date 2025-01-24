import axios from "axios";

import useAlertStore from "../AlertStore";
import useEditHistoryStore from "../EditsHistoryStore";

import { history_el } from "../../types/historyTypes";

export const addEntityToServer = async (el: history_el, file_id : string) => {
    const {entity} = el;
    const setAlert = useAlertStore.getState().setAlert;
    if (entity === undefined || entity === null) {
        console.error("Entity is undefined")
        setAlert("Entity is undefined", "error");
    }
    if(file_id === 'new') { 
        setAlert("please create a file first", "error");
        return;
     }
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/editor/edit/push?id=${file_id}`, {
            type: entity?.type,
            data: entity?.data
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(response.data.message);
    } catch (err: any) {
        const hardSave = useEditHistoryStore.getState().hardSave;
        hardSave(file_id);
        console.log("Attempted Hard Save");
        // setAlert(err.response.data.message, "error");
        // console.error(err.response.data.message);
    }
}

export const updateEntityInServer = async (el: history_el, file_id : string) => {
    const setAlert = useAlertStore.getState().setAlert;
    const {entity, index} = el;
    if (entity === undefined || entity === null) {
        console.error("Entity is undefined")
        setAlert("Entity is undefined", "error");
    }
    if(file_id.length !== 24) { 
        setAlert("please provide a valid file ID", "error");
        return;
     }
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/editor/edit/entity-at-index?id=${file_id}`, {
            index,
            data: entity?.data,
            type: entity?.type
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(response.data.message);
    } catch (err: any) {
        const hardSave = useEditHistoryStore.getState().hardSave;
        hardSave(file_id); 
        console.log("Attempted Hard Save");
        // setAlert(err.response.data.message, "error");
        // console.error(err.response.data.message);
    }
}

export const deleteEntityInServer = async (el: history_el, file_id : string) => {
    const setAlert = useAlertStore.getState().setAlert;
    const {index} = el;

    if(file_id === 'new') { 
        setAlert("please create a file first", "error");
        return;
     }
    try {
        const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/editor/edit/entity-at-index?id=${file_id}`, {
            data: {
                index,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(response.data.message);
    } catch (err: any) {
        const hardSave = useEditHistoryStore.getState().hardSave;
        hardSave(file_id);
        console.log("Attempted Hard Save");
        // setAlert(err.response.data.message, "error");
        // console.error(err.response.data.message);
    }
}
