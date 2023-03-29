import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testando o componente Pokedex', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const pokeFoundTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered Pokémon',
    });

    expect(pokeFoundTitle).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    pokemonList.forEach((pokemon) => {
      const currentPokemon = screen.getByText(pokemon.name);

      expect(currentPokemon).toBeInTheDocument();

      const buttonNextPoke = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });
      userEvent.click(buttonNextPoke);
    });
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getAllByRole('link', {
      name: 'More details',
    });

    expect(linkMoreDetails.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filterButtons = screen.getAllByTestId('pokemon-type-button');

    pokemonList.forEach((pokemon) => {
      const buttonLength = filterButtons
        .filter((button) => button.innerHTML === pokemon.type);

      expect(buttonLength.length).toBe(1);
    });

    const filterAll = screen.getByRole('button', {
      name: 'All',
    });

    expect(filterAll).toBeInTheDocument();
  });

  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
    renderWithRouter(<App />);

    const filterButtons = screen.getAllByTestId('pokemon-type-button');

    filterButtons.forEach((button) => {
      const currFilterButton = screen.getByRole('button', {
        name: button.innerHTML,
      });

      userEvent.click(currFilterButton);

      pokemonList.forEach((pokemon) => {
        if (pokemon.type === currFilterButton.innerHTML) {
          const pokeOnScreen = screen.getByText(pokemon.name);

          expect(pokeOnScreen).toBeInTheDocument();

          const nextPokeButton = screen.getByRole('button', {
            name: 'Próximo Pokémon',
          });

          userEvent.click(nextPokeButton);
        }
      });
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const filterElectric = screen.getByRole('button', {
      name: 'Electric',
    });

    userEvent.click(filterElectric);

    const pikachuFiltered = screen.getByRole('img', {
      name: 'Pikachu sprite',
    });

    expect(pikachuFiltered).toBeInTheDocument();

    const filterAll = screen.getByRole('button', {
      name: 'All',
    });

    userEvent.click(filterAll);

    pokemonList.forEach((pokemon) => {
      const currentPokemon = screen.getByText(pokemon.name);

      expect(currentPokemon).toBeInTheDocument();

      const nextPokeButton = screen.getByRole('button', {
        name: 'Próximo Pokémon',
      });
      userEvent.click(nextPokeButton);
    });
  });
});
