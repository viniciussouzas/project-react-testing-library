import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Testando o componente About', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(aboutTitle).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraph1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    const paragraph2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const aboutImg = screen.getByRole('img', {
      name: 'Pokédex',
    });

    expect(aboutImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
