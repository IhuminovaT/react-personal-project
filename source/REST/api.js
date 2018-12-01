import { MAIN_URL, TOKEN } from './config';

const headers = {
    "Authorization": TOKEN,
    "Content-Type": "application/json"
};
export const api = {
    fetchTasks: async () => {
        return fetch(MAIN_URL, {
            method: 'GET',
            headers
        });
    },
    createTasks: async (data) => {
        return fetch(MAIN_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
    },
    updateTask: async (data) => {
        return fetch(MAIN_URL, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
        });
    },
    deleteTask: async (data) => {
        return fetch(`${MAIN_URL}/${data.id}`, {
            method: 'DELETE',
            headers
        });
    },
};
