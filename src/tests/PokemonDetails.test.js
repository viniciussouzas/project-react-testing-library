import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente PokemonDetails', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(linkMoreDetails);

    const pokeDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });

    expect(pokeDetails).toBeInTheDocument();

    expect(linkMoreDetails).not.toBeInTheDocument();

    const summaryDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });

    expect(summaryDetails).toBeInTheDocument();

    const paragraphDetails = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );

    expect(paragraphDetails).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: 'More details',
    });

    userEvent.click(linkMoreDetails);

    const gameDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });

    expect(gameDetails).toBeInTheDocument();

    const locationsDetails = screen.getAllByRole('img', {
      name: /pikachu location/i,
    });

    expect(locationsDetails.length).toBe(2);

    expect(locationsDetails[0].src).toBe('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationsDetails[0].alt).toBe('Pikachu location');

    expect(locationsDetails[1].src).toBe('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(locationsDetails[1].alt).toBe('Pikachu location');

    const locationName1 = screen.getByText('Kanto Viridian Forest');

    expect(locationName1).toBeInTheDocument();

    const locationName2 = screen.getByText('Kanto Power Plant');

    expect(locationName2).toBeInTheDocument();
  });

  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: 'More details',
    });

    userEvent.click(linkMoreDetails);

    const checkFavPokemon = screen.getByLabelText('Pokémon favoritado?');

    userEvent.click(checkFavPokemon);

    const isMarkedAsFav = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });

    expect(isMarkedAsFav).toBeInTheDocument();

    userEvent.click(checkFavPokemon);

    expect(isMarkedAsFav).not.toBeInTheDocument();
  });
});
