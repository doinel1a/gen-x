import Image from 'next/image';
import React from 'react';
import logoLight from '../assets/imgs/gen-x-light.svg';
import { ThemeToggle } from './theme/toggle';

export default function Nav() {
  return (
    <nav className='fixed top-0 flex w-full justify-between'>
      <div className='relative isolate flex w-full bg-blue-600 px-5 py-4 shadow-lg lg:w-auto'>
        <span className='triangle triangle-r' />
        <Image src={logoLight} alt='gen X logo' width={100} />
      </div>

      <div className='relative isolate flex w-auto bg-blue-600 px-5 py-4 shadow-lg'>
        <span className='triangle triangle-l' />
        <ThemeToggle />
      </div>
    </nav>
  );
}
