import { httpAxios } from "@/helper/axios";

export async function addTask(task){
    const result = await httpAxios
        .post("/api/works",task)
        .then((response) => response.data);
    return result;
}

export async function getTasks(userId){
    const result = await httpAxios
        .get(`/api/users/${userId}/works`)
        .then((response) => response.data);
    return result;
}
export async function deleteTask(workId){
    const result = await httpAxios
        .delete(`/api/works/${workId}`)
        .then((response) => response.data);
    return result;
}