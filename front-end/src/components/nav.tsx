import React from 'react';
import { ThemeToggle } from './theme/toggle';

export default function Nav() {
  return (
    <nav className='fixed top-0 flex w-full justify-between'>
      <div className='relative isolate flex w-full bg-blue-600 px-5 py-4 shadow-lg lg:w-auto'>
        <span className='triangle triangle-r' />
        <p className='flex items-center justify-center text-2xl font-semibold text-[#f8fafc] md:text-3xl'>
          from abi gen
        </p>
      </div>

      <div className='relative isolate flex w-auto bg-blue-600 px-5 py-4 shadow-lg'>
        <span className='triangle triangle-l' />
        <ThemeToggle />
      </div>
    </nav>
  );
}
