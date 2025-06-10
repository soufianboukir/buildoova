import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className='flex flex-col gap-2 justify-center items-center h-screen w-full'>
            <h1 className='text-xl font-semibold flex items-center gap-1'>
                <span className='text-4xl font-semibold'>404</span>
                <div className='w-[2px] bg-black h-5 mx-2'></div>
                <span className='text-2xl font-semibold'>Not found</span>
            </h1>
            <Button>
                <Link href={'/'}>
                    back to home pape
                </Link>
            </Button>
        </div>
    );
};

export default NotFound;
