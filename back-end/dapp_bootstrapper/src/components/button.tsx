import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IProperties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconProp;
}

export default function Button({
  icon,
  className,
  children,
  onClick,
  ...props
}: IProperties) {
  return (
    <button
      className={`rounded-sm bg-accent-primary px-3 py-1 hover:bg-accent-primary-state focus:bg-accent-primary-state ${
        className || ''
      }`}
      onClick={onClick}
      {...props}
    >
      {children}

      {icon ? (
        <>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          &nbsp; <FontAwesomeIcon icon={icon} />
        </>
      ) : (
        <></>
      )}
    </button>
  );
}
