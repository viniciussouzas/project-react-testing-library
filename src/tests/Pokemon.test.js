import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getAllByText('Electric');
    expect(pokemonType.length).toBe(2);

    const pokemonWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pokemonWeight).toBeInTheDocument();

    const pokemonImg = screen.getByRole('img', {
      name: 'Pikachu sprite',
    });
    expect(pokemonImg.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(linkMoreDetails.href).toBe('http://localhost/pokemon/25');
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: 'More details',
    });

    userEvent.click(linkMoreDetails);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemon/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: 'More details',
    });

    userEvent.click(linkMoreDetails);

    const checkFavPokemon = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });

    userEvent.click(checkFavPokemon);

    const isMarkedAsFav = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });

    expect(isMarkedAsFav.src).toBe('http://localhost/star-icon.svg');
  });
});
