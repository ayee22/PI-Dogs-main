const { Router } = require("express");
const router = Router();
const { getApi, getDB, createBreed, dogIdDB } = require("../controllers/index");
const { Temperament } = require("../db");

//------------------------------------------------------------------------------
//[ ] GET /dogs:
//[ ] GET /dogs?name=........:
router.get("/dogs", async (req, res) => {
  try {
    const { name } = req.query; //buscar name de dog por query
    let dogsApi = await getApi(); // traemos lo de la api desde utils
    let dogsDb = await getDB(); //traemos lo de db desde utils too
    let allDogs = dogsApi.concat(dogsDb); //unimos base de datos con api en una variable.
    
    if (name) {
      let dogsName = allDogs.filter((f) => f.name.toLowerCase().includes(name.toLowerCase()));//tolowercase para que los nombres y la busqeuda coincidan
      dogsName.length // si dogs tiene algo
        ? res.status(200).send(dogsName) //mostralo
        : res.status(404).send("NOT FOUND");
    } else {
      res.status(200).send(allDogs); //si no buscamos por query, entonces que nos retorne todos los dogs
    }
  } catch (error) {
    console.log(error);
  }
});

// [ ] GET /dogs/{idRaza}
router.get('/dogs/:id', async(req,res) => {
    try {
        const id = req.params.id//recibe parametro id
                
        if(id.includes('-')){             //si el id que queremos buscar tiene '-'
          let dogsDb = await dogIdDB(id); //que me guarde en la variable dogsDB, los dogs traido
          res.status(200).json(dogsDb)    //y me lo muestra
       } else {
          let dogsApi = await getApi()                         // guardo en una variable, los traidos de la api
          const dogIdAPI = dogsApi.filter(d => d.id == id)     //filtro, los traidos por la api, por id
          dogIdAPI.length                       //si los traidos por la api, tiene longitud y matchean
          ? res.status(200).send(dogIdAPI)      //lo muestro
          : res.status(404).send("NOT FOUND")   //otherwise no lo muestro
         }

        
    } catch (error) {
        res.status(404).send("NOT FOUND")
    }
}) 

//[ ] GET /temperaments
router.get('/temperaments', async(req,res) => {
  try {
    const allTemperaments = await Temperament.findAll() // guardo en una variable, los temperamentos de la db
    
    allTemperaments                           //si existe en  allTemperaments
    ? res.status(200).send(allTemperaments)  // lo muestro
    : res.status(404).send("NOT FOUND")
  
  } catch (error) {
    console.log(error)
  }

}) // funciona

router.post('/dogs', async (req,res)=>{
    try {
      //console.log(req.body.name)
      //console.log(req.body.height)
      //console.log(req.body.weigth)
      //console.log(req.body.temperament)
      if(!req.body.name || !req.body.height || !req.body.weight){ //valide los que son obligatorios para la base de datos por el momento
        res.status(400).send('INCOMPLETE FIELDS')
      } 
      await createBreed(req.body) //si esta completo y le pase lo que me pido
      res.status(200).send('BREED CREATED SUCCESFULLY')
    } catch (error) {
      console.log(error)
    }
})// FUNCIONA!!!

/* router.post('/temperaments', async(req, res) => {
  const {name} = req.body
  if (!name) {
    res.status(400).send('TEMPERAMENT NEEDED')
  } else {
    const temperament = await Temperament.create({
      name
    })
    console.log(temperament)
    res.status(202).send(temperament)
  }
}) */

module.exports = router;
