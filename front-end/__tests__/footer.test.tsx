import Footer from '@/components/footer';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Footer - Rendering', () => {
  it('Should render the Footer', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');

    expect(footer).toBeInTheDocument();
  });

  it('Should have an Anchor w/ "doinel1a" text', () => {
    render(<Footer />);

    const anchor = screen.getByRole('link');
    const anchorText = anchor.textContent;

    expect(anchor).toBeInTheDocument();
    expect(anchorText).toBe('doinel1a');
  });
});
