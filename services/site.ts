import { api } from "@/config/api"

export const viewSite = async (siteName: string) =>{
    const response = await api.get(`/viewSite/${siteName}`);
    return response
}

export const publishSite = async (code: string,siteName: string) =>{
    const response = await api.post(`/publish`,{code,siteName})
    return response
}