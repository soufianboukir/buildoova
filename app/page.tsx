import Link from 'next/link';
import React from 'react'

const Home = () => {
    return (
        <div>
            <h1 className='text-4xl font-semibold'>
                home page
                <br />
                <Link href={'/start'} className='text-blue-600'>go to start</Link>
            </h1>
        </div>
    )
}

export default Home;