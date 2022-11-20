const { Router } = require("express");
const router = Router();
const { getApi, getDB, createBreed, dogIdDB } = require("../controllers/index");
const { Temperament } = require("../db");

//------------------------------------------------------------------------------
//[ ] GET /dogs:
//[ ] GET /dogs?name=........:
router.get("/dogs", async (req, res) => {
  try {
    const { name } = req.query; //buscar name de gos por query
    let dogsApi = await getApi(); // traemos lo de la api desde utils
    let dogsDb = await getDB(); //traemos lo de db desde utils too
    let allDogs = dogsApi.concat(dogsDb); //unimos base de datos con api en una variable.
    
    if (name) {
      let dogsName = allDogs.filter((f) => f.name.toLowerCase().includes(name.toLowerCase()));//tolowercase para que los nombres y la busqeuda coincidan
      dogsName.length
        ? res.status(200).send(dogsName)
        : res.status(404).send("NOT FOUND");
    } else {
      res.status(200).send(allDogs);
    }
  } catch (error) {
    console.log(error);
  }
});

// [ ] GET /dogs/{idRaza}
router.get('/dogs/:id', async(req,res) => {
    try {
        const id = req.params.id//recibe parametro id
                
        if(id.includes('-')){
          let dogsDb = await dogIdDB(id); 
          res.status(200).json(dogsDb)
       } else {
          let dogsApi = await getApi()
          const dogIdAPI = dogsApi.filter(d => d.id == id)
          dogIdAPI.length
          ? res.status(200).send(dogIdAPI)
          : res.status(404).send("NOT FOUND")
         }

        
    } catch (error) {
        res.status(404).send("NOT FOUND")
    }
}) 

//[ ] GET /temperaments
router.get('/temperaments', async(req,res) => {
  try {
    const allTemperaments = await Temperament.findAll()
    
    allTemperaments
    ? res.status(200).send(allTemperaments)
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
      if(!req.body.name || !req.body.height || !req.body.weigth){
        res.status(400).send('INCOMPLETE FIELDS')
      } 
      await createBreed(req.body)
      res.status(200).send('BREED CREATED SUCCESFULLY')
    } catch (error) {
      console.log(error)
    }
})// FUNCIONA!!!

module.exports = router;
