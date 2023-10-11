import Nav from '@/components/nav';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Nav - Rendering', () => {
  it('Should render the Nav', () => {
    render(<Nav />);

    const nav = screen.getByRole('navigation');

    expect(nav).toBeInTheDocument();
  });

  it('Should have a P w/ "from abi gen" text', () => {
    render(<Nav />);

    const paragraph = screen.getByText('from abi gen');

    expect(paragraph).toBeInTheDocument();
  });
});
