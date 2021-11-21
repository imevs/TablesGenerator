import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe("App", () => {

    it('renders "Copy table" button', () => {
        render(<App/>);
        const linkElement = screen.getByText(/Copy table/i);
        expect(linkElement).toBeInTheDocument();
    });
});

