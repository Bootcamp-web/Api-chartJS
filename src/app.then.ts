import axios, { AxiosResponse } from "axios"


const  getPokemon = (pkmNumber:number)=>{
    if (!pkmNumber) throw new Error("You must pass a pokemon number");
    console.log(`Getting pokemon ${pkmNumber}`);
    const url: string = `https://pokeapi.co/api/v2/pokemon/${pkmNumber}`;
    const response = axios.get(url).then((response:AxiosResponse)=>{
        console.log(response.status)
        const pokemon = response.data
        console.log(pokemon.name)
    }).catch((e:any)=>{
        console.log("Axios error")
        console.log(e.reponse.status)
    })
  

}

try {
    getPokemon(25);
} catch (e) {
    console.log(e);
}