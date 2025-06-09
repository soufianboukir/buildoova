import { FormData } from "@/app/start/page";
import { api } from "@/config/api"

export const generateSite = async (formData: FormData) =>{
    console.log(formData);
    
    const response = await api.post('/generate',formData);    
    return response;
}