import React from 'react';

interface IProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function Container({ id, title, children }: IProps) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className='flex flex-col gap-y-7 rounded-sm bg-primary p-5'
    >
      <h2 id={`${id}-title`} className='text-2xl font-semibold'>
        {title}
      </h2>

      {children}
    </section>
  );
}
