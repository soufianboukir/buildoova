import { auth } from '@/auth'
import React from 'react'

export const page = async () => {
    const session = await auth()
    console.log(session);
    
    return (
        <div>
            <h1 className='text-4xl font-semibold'>Questions page</h1>
        </div>
    )
}
