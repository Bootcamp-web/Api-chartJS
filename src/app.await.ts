import axios, { AxiosResponse } from "axios"


const  getPokemon = async (pkmNumber:number)=>{
    try{
        if (!pkmNumber) throw new Error("You must pass a pokemon number");
        console.log(`Getting pokemon ${pkmNumber}`);
        const url: string = `https://pokeapi.co/api/v2/pokemon/${pkmNumber}`;
        const response = await axios.get(url);    
        const pokemon = response.data;
        return pokemon.name;
        
    }
    catch (e:any){
            console.log("AXIOS return an error if htpp code es > 400");
            console.log(e.response.status)
        }
    
    
}

(async () => {
    const pkm = await getPokemon(25);
    console.log(pkm)
    return pkm;
})();
//const pkm = (async () => await getPokemon(25))();
