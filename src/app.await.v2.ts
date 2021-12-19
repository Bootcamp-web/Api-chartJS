import axios, { AxiosResponse } from "axios"
import _ from "lodash"
import fs from "fs-extra"

const  getPokemon = async (pkmNumber:number)=>{
    try{
        
        console.log(`Getting pokemon ${pkmNumber}`);
        const url: string = `https://pokeapi.co/api/v2/pokemon/${pkmNumber}`;
        const response = await axios.get(url);    
        const pokemon = response.data;
        return pokemon.name;
        
    }
    catch (e:any){
            console.log("AXIOS return an error if htpp code es > 400");
        }   
    
}

(async () => {
    const pokemos = await Promise.all(
        _.range(1,11).map((e:number)=> getPokemon(e))
    )
    
    console.log(pokemos);
    fs.writeJSONSync("pokemos.json",pokemos)
   
})();