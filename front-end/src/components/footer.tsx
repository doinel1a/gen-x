import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className='fixed bottom-0 flex w-full items-center justify-center border-t border-border p-1'>
      <p>
        made w/ ❤️ by&nbsp;
        <Link
          href='https://business-link.d1a.app'
          target='_blank'
          className='px-1 font-semibold text-blue-500 transition-colors hover:text-blue-600 focus:text-blue-600'
        >
          doinel1a
        </Link>
      </p>
    </footer>
  );
}
