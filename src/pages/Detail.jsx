import React,{useEffect,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import {getMeal,ingredients} from '../services/api';
import {useRecipes} from '../contexts/RecipeContext';
export default function Detail(){const {recipeId}=useParams();const [meal,setMeal]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState('');const {saved,toggleSaved}=useRecipes();
 useEffect(()=>{const c=new AbortController();setLoading(true);setError('');getMeal(recipeId,c.signal).then(m=>{if(!c.signal.aborted)setMeal(m)}).catch(e=>{if(!c.signal.aborted)setError(e.message)}).finally(()=>{if(!c.signal.aborted)setLoading(false)});return()=>c.abort();},[recipeId]);
 if(loading)return <p role="status">Loading recipe…</p>;if(error)return <div role="alert"><p>{error}</p><Link to="/recipes">Back to recipes</Link></div>;if(!meal)return <><h1>Recipe not found</h1><Link to="/recipes">Discover recipes</Link></>;
 const isSaved=saved.some(m=>m.idMeal===meal.idMeal);
 return <><Link to="/recipes">← All recipes</Link><section className="detail"><img className="detail-image" src={meal.strMealThumb} alt={meal.strMeal}/><div><p className="eyebrow">{meal.strArea} · {meal.strCategory}</p><h1>{meal.strMeal}</h1><button onClick={()=>toggleSaved(meal)} aria-pressed={isSaved}>{isSaved?'Unsave recipe':'Save recipe'}</button><Link className="button secondary" to="/plan">Open meal plan</Link><h2>Ingredients</h2><ul>{ingredients(meal).map(({name,measure},i)=><li key={i}>{measure} {name}</li>)}</ul></div></section><section className="instructions"><h2>Let’s cook</h2>{meal.strInstructions?.split(/\r?\n/).filter(Boolean).map((p,i)=><p key={i}>{p}</p>)}</section></>;
}
