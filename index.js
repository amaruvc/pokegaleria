const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.static("static"));

app.get("/pokemones", async (req, res) => {
  try {
    const randomoffs = Math.round(Math.random() * 1000);
    console.log(randomoffs);
    const pokeapi = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=150&offset=${randomoffs}`
    );
    const pokemones = pokeapi.data.results;

    const pokeurl = await Promise.all(
      pokemones.map(async (p) => {
        const tempData = await axios.get(p.url);
        return {
          img: tempData.data.sprites.front_default,
          nombre: tempData.data.name,
        };
      })
    );
    res.send(pokeurl);
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("Server up en puerto 5000");
});
