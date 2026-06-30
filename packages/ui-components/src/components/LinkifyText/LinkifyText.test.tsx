import React from 'react';

import { render, screen } from '../../test/test-react-testing-library';
import LinkifyText from './LinkifyText';

describe('<LinkifyText /> component', () => {
  test('should render plain text without links', () => {
    render(<LinkifyText>{'Something went wrong'}</LinkifyText>);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  test('should render http URLs as links', () => {
    render(<LinkifyText>{'Authorization required. Sign up at http://www.abappm.com'}</LinkifyText>);
    const link = screen.getByRole('link', { name: 'http://www.abappm.com' });
    expect(link).toHaveAttribute('href', 'http://www.abappm.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should render https URLs as links', () => {
    render(<LinkifyText>{'Visit https://example.com for details'}</LinkifyText>);
    const link = screen.getByRole('link', { name: 'https://example.com' });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
