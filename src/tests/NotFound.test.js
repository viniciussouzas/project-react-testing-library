import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testando o componente NotFound', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found',
    });

    expect(notFoundTitle).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const notFoundImg = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });

    expect(notFoundImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
