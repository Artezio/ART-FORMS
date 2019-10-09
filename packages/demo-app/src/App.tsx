import * as React from 'react';
import 'bootstrap-scss';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap';
import './data/styles/artezioBootstrapTheme.scss';
import MainLayout from './layouts/MainLayout';
import { Theme } from './interface/layouts/MainLayoutProps';

const themes: Theme[] = [
    {
        title: 'Dark theme',
        href: 'https://bootswatch.com/4/cyborg/bootstrap.css'
    }
]

export const App = () => <MainLayout themes={themes} />;

export default App;