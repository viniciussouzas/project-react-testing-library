import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente App', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    const favPokemonLink = screen.getByRole('link', {
      name: 'Favorite Pokémon',
    });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favPokemonLink).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });

    userEvent.click(homeLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });

    userEvent.click(aboutLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const favPokemonLink = screen.getByRole('link', {
      name: 'Favorite Pokémon',
    });

    userEvent.click(favPokemonLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/xablau');
    });

    const notFound = screen.getByRole('heading', {
      name: 'Page requested not found',
    });

    expect(notFound).toBeInTheDocument();
  });
});
