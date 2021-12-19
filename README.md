# Api-chartJS

1. [Introducción  yarn](#schema1)
2. [Arrancar yarn](#schema2)
3. [Instalar los paquetes necesarios](#schema3)
4. [Añadir el script para que compile Typescript y ejecutarlo](#schema4)
5. [Configurar eslint](#schema5)
6. [Añadir nuestras reglas a eslint](#schema6)
7. [7 Instalar axios para las apis](#schema7)
8. [Primer petición a una api con axios](#schema8)
9. [Utilizamos promesas](#schema9)
10. [Mejorando el código](#schema10)
11. [Programación defensiva](#schema11)
12. [Promesas con async await](#schema12)
13. [Promise all](#schema13)
14. [Guardar el resultado en un archivo json con fs-extra](#schema14)

<hr>

<a name="schema1"></a>

# 1 Instalar Yarn 
Comprobar con 
~~~bash
yarn --version
~~~
Si tienen versión, no hace falta volver a instalar. Sino hay que hacer lo siguiente:
~~~bash
npm install --global yarn
~~~
<hr>

<a name="schema2 "></a>

# 2 Arrancar yarn
~~~bash
yarn init -y
~~~
<hr>

<a name="schema3"></a>

# 3 Instalar los paquetes necesarios
~~~bash
yarn add typescript ts-node-dev eslint  
~~~
<hr>

<a name="schema4"></a>

# 4 Añadir el script para que compile Typescript y ejecutarlo
~~~js
 "scripts": {
    "build": "tsc"
  },
~~~
~~~bash
yarn build tsc --init
~~~
<hr>

<a name="schema5"></a>

# 5 Configurar eslint
~~~bash
yarn run eslint --init
~~~

Después de esto hay que borrar la carpeta node-modules
y volver a instalar yarn
~~~bash
yarn install
~~~

<hr>

<a name="schema6"></a>

# 6 Añadir nuestras reglas a eslint
~~~js
  "rules": {
		"quotes": ["error", "double"],
		"no-console": "off",
		"indent": ["error", "tab"],
		"allowIndentationTabs": true
	}
~~~

<hr>

<a name="schema7"></a>

# 7 Instalar axios para las apis
~~~bash
yarn add axios
~~~

<hr>

<a name="schema8"></a>

# 8 Primer petición a una api con axios
~~~js
import axios from "axios"

const  getPokemon = ()=>{
    const url:string = "https://pokeapi.co/api/v2/pokemon/25"
    const response = axios.get(url)
    console.log(response)

}
~~~
~~~bash
$ ts-node-dev src/app.ts
[INFO] 18:39:49 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 4.5.4)
hola
Promise { <pending> }
undefined
Done in 2.31s.

~~~
Esto nos devuelve una promesa.

<hr>

<a name="schema9"></a>


# 9 Utilizamos promesas
~~~js
const  getPokemon = ()=>{
    const url:string = "https://pokeapi.co/api/v2/pokemon/25"
    const response = axios.get(url).then((response:AxiosResponse)=>{
        console.log(response.status)
    }).catch((e:any)=>{
        console.log("Axios error")
           console.log(e.reponse.status)
    })
  

}

getPokemon()
~~~
~~~bash
yarn run v1.22.17
$ ts-node-dev src/app.ts
[INFO] 18:45:15 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 4.5.4)
200
Done in 1.76s.

~~~
<hr>

<a name="schema10"></a>

# 10 Mejorando el código

~~~js
const  getPokemon = (pkmNumber:number)=>{
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

getPokemon(25)
~~~

~~~bash
(base) ➜  api-chartJS git:(main) ✗ yarn run dev
yarn run v1.22.17
$ ts-node-dev src/app.ts
[INFO] 18:50:05 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 4.5.4)
Getting pokemon 25
200
pikachu
Done in 1.64s.

~~~

<hr>

<a name="schema11"></a>

# 11 Programación defensiva

~~~js
try {
    getPokemon(25);
} catch (e) {
    console.log(e);
}
~~~
<hr>

<a name="schema12"></a>

# 12 Promesas con async await
~~~js
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
   console.log( getPokemon(25));
~~~
Nos devuelve una promesa, entonces tenemos que añadir
~~~js
(async () => {
    const pkm = await getPokemon(25);
    console.log(pkm)
    return pkm;
})();
~~~

<hr>

<a name="schema13"></a>


# 13 Promise all
Primero instalamos lodash 
~~~bash
yarn add lodash
~~~
Y como al importar nos muestra un error, tenemos que instalar  los types de lodash
~~~bash
yarn add @types/lodash
~~~

~~~js

(async () => {
    const pokemos = await Promise.all(
        _.range(1,11).map((e:number)=> getPokemon(e))
    )
    
    console.log(pokemos)
   
})();
~~~
Nos devuelve
~~~
[
  'bulbasaur',  'ivysaur',
  'venusaur',   'charmander',
  'charmeleon', 'charizard',
  'squirtle',   'wartortle',
  'blastoise',  'caterpie'
]

~~~

<hr>

<a name="schema14"></a>

# 14 Guardar el resultado en un archivo json con fs-extra
~~~bash
yarn add fs-extra @types/fs-extra
~~~
~~~js
(async () => {
    const pokemos = await Promise.all(
        _.range(1,11).map((e:number)=> getPokemon(e))
    )
    
    console.log(pokemos);
    fs.writeJSONSync("pokemos.json",pokemos)
   
})();
~~~
Y nos genera una archivo `pokemos.json`