import { render, screen } from '@testing-library/react';
import Home from '../page';

jest.mock('@/components/PostList', () => ({
  __esModule: true,
  default: () => <div data-testid="post-list">PostList Mock</div> // add ID to PostList component
}));

describe('Home Page', () => {
  it('renders the main heading', async () => {
    render(<Home />);
    
    expect(
      await screen.findByRole('heading', { 
        name: /latest posts/i,
        level: 1 // lookning for a h1 heading
      })
    ).toBeInTheDocument();
  });

  it('renders the PostList component', async () => {
    render(<Home />);
    expect(await screen.findByTestId('post-list')).toBeInTheDocument(); // find PostList ID
  });
});