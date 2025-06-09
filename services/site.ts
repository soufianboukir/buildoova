import { api } from "@/config/api"

export const publishSite = async (code: string,siteName: string) =>{
    const response = await api.post(`/publish`,{code,siteName})
    return response
}