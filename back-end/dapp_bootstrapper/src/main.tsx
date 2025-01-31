import './scss/globals.scss';
import './css/globals.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

const container = document.querySelector('#root');
const root = createRoot(container as HTMLElement);

root.render(<App />);
