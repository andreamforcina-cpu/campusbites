import React from 'react';
import {NavLink,Routes,Route,Navigate,Link} from 'react-router-dom';
import Discover from './pages/Discover';
import Detail from './pages/Detail';
import Saved from './pages/Saved';
import Plan from './pages/Plan';
import {useRecipes} from './contexts/RecipeContext';
export default function App(){const {saved,storageError}=useRecipes();return <><a className="skip" href="#main">Skip to content</a><header><Link className="brand" to="/recipes">Campus<span>Bites</span></Link><nav aria-label="Main navigation"><NavLink to="/recipes" end>Discover</NavLink><NavLink to="/saved">Saved ({saved.length})</NavLink><NavLink to="/plan">Meal plan</NavLink></nav></header><main id="main">{storageError&&<p role="alert">Browser storage is unavailable. Changes will last only for this session.</p>}<Routes><Route path="/" element={<Navigate to="/recipes" replace/>}/><Route path="/recipes" element={<Discover/>}/><Route path="/recipes/:recipeId" element={<Detail/>}/><Route path="/saved" element={<Saved/>}/><Route path="/plan" element={<Plan/>}/><Route path="*" element={<section><h1>Page not found</h1><p>That page is not on the menu.</p><Link to="/recipes">Discover recipes</Link></section>}/></Routes></main><footer>Built for student kitchens. Recipes from <a href="https://www.themealdb.com/">TheMealDB</a>. Check ingredients for allergens. No nutrition or pricing estimates.</footer></>}
