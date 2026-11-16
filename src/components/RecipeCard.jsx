import React from 'react';
import {Link} from 'react-router-dom';
import {useRecipes} from '../contexts/RecipeContext';
export default function RecipeCard({meal}){
 const {saved,toggleSaved}=useRecipes(); const isSaved=saved.some(m=>m.idMeal===meal.idMeal);
 return <article className="card"><img src={meal.strMealThumb} alt="" loading="lazy"/><div className="card-content"><p className="eyebrow">{meal.strArea || 'Recipe'} · {meal.strCategory || 'Explore'}</p><h2><Link to={`/recipes/${meal.idMeal}`}>{meal.strMeal}</Link></h2><button onClick={()=>toggleSaved(meal)} aria-pressed={isSaved}>{isSaved?'Unsave':'Save'} {meal.strMeal}</button></div></article>;
}
