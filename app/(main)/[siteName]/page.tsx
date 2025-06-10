'use client'
import Loading from '@/components/Loading';
import { viewSite } from '@/services/site';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ViewSite = ({params}: {params: {siteName: string}}) => {
    const siteName = params.siteName;
    const [siteCode,setSiteCode] = useState<string>('');
    const [loading,setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() =>{
        const getSiteCode = async () =>{
            try{
                const response = await viewSite(siteName)
                if(response.status === 200){
                    setSiteCode(response.data.code)
                }else{
                    router.push('/404')
                }
            }catch{
                router.push('/404')
            }finally{
                setLoading(false)
            }
        }
        if(siteName){
            getSiteCode()
        }
    },[siteName])
    
    if (loading) return <Loading isAiGenerates={false}/>

    return (
        <div>
            {
                siteCode && (
                    <div
                        className="preview relative z-0"
                        dangerouslySetInnerHTML={{ __html: siteCode }}
                    />
                )
            }
        </div>
    )
}

export default ViewSite;