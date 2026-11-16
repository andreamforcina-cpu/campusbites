import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {RecipeProvider} from './contexts/RecipeContext';
import App from './App';
import './styles.css';
createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><RecipeProvider><App/></RecipeProvider></BrowserRouter></React.StrictMode>);
