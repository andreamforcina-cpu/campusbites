import React,{createContext,useContext,useState,useEffect} from 'react';
const RecipeContext=createContext(null);
const KEY='campusbites-v1';
function readStore(){try{const s=JSON.parse(localStorage.getItem(KEY));return {saved:Array.isArray(s?.saved)?s.saved.filter(m=>m && typeof m.idMeal==='string' && typeof m.strMeal==='string'):[],plan:Array.isArray(s?.plan)?s.plan.filter(p=>p && typeof p.day==='string' && p.meal && typeof p.meal.idMeal==='string'):[]};}catch{return {saved:[],plan:[]};}}
export function RecipeProvider({children}){
 const [state,setState]=useState(readStore);
 const [storageError,setStorageError]=useState(false);
 useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(state));setStorageError(false);}catch{setStorageError(true);}},[state]);
 const toggleSaved=meal=>setState(s=>({...s,saved:s.saved.some(m=>m.idMeal===meal.idMeal)?s.saved.filter(m=>m.idMeal!==meal.idMeal):[...s.saved,meal]}));
 const planMeal=(day,meal)=>setState(s=>({...s,plan:[...s.plan.filter(p=>p.day!==day),{day,meal}]}));
 const removePlan=day=>setState(s=>({...s,plan:s.plan.filter(p=>p.day!==day)}));
 return <RecipeContext.Provider value={{...state,toggleSaved,planMeal,removePlan,storageError}}>{children}</RecipeContext.Provider>;
}
export function useRecipes(){const context=useContext(RecipeContext);if(!context)throw new Error('RecipeProvider required');return context;}
