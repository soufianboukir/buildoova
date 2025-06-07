import { auth } from '@/auth';
import React from 'react'

const Dashboard = async () => {
    const session = await auth()
    console.log(session);
    
    return (
        <div>
            <h1>dashboard page</h1>
        </div>
    )
}

export default Dashboard;