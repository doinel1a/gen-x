import Home from '@/app/page';
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

describe('Home page - Rendering', () => {
  describe('Main - Rendering', () => {
    it('Should have an H2 w/ "Smart contract details" text', () => {
      render(<Home />);

      const h2Heading = screen.getByRole('heading');
      const h2HeadingText = h2Heading.textContent;

      expect(h2Heading).toBeInTheDocument();
      expect(h2HeadingText).toBe('Smart contract details');
    });
  });
});
