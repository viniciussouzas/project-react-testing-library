import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('Testando o componente FavoritePokemon', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);

    const favoriteTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite Pokémon',
    });
    const noFavorite = screen.getByText('No favorite Pokémon found');

    expect(favoriteTitle).toBeInTheDocument();
    expect(noFavorite).toBeInTheDocument();
  });

  test('Teste se apenas são exibidos os Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', {
      name: 'More details',
    });

    userEvent.click(pokemonDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');

    const checkFavPokemon = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });

    userEvent.click(checkFavPokemon);

    act(() => {
      history.push('/favorites');
    });

    const favoritePokemonImg = screen.getByRole('img', {
      name: 'Pikachu sprite',
    });

    expect(favoritePokemonImg).toBeInTheDocument();
  });
});
