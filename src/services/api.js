const BASE='https://www.themealdb.com/api/json/v1/1';
async function request(path,signal){
 const response=await fetch(`${BASE}/${path}`,{signal});
 if(!response.ok) throw new Error('Recipes are unavailable right now. Please try again.');
 const data=await response.json();
 if(!data || !Object.prototype.hasOwnProperty.call(data,'meals')) throw new Error('Unexpected recipe response. Please try again.');
 return data.meals || [];
}
export const searchMeals=(query,signal)=>request(`search.php?s=${encodeURIComponent(query.trim())}`,signal);
export const getMeal=async(id,signal)=>(await request(`lookup.php?i=${encodeURIComponent(id)}`,signal))[0] || null;
export function ingredients(meal){return Array.from({length:20},(_,i)=>({name:meal[`strIngredient${i+1}`]?.trim(),measure:meal[`strMeasure${i+1}`]?.trim()})).filter(i=>i.name);}
