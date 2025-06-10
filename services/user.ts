import { api } from "@/config/api"

export const updateUserProfile = async (name: string, username: string) =>{
    const response = await api.put(`/updateProfile`,{name,username});
    return response
}