import React from 'react';

export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className='w-full border-t border-t-tertiary bg-secondary px-8 py-2'>
      <p className='text-center text-sm'>
        &copy; doinel1a &nbsp;—&nbsp; {date}
      </p>
    </footer>
  );
}
