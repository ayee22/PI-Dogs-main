const { API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temperament } = require("../db");

//-----------------------FUNCTION GETAPI---------------------------------------
const getApi = async () => {
  try {
    const url = await axios.get(
      `https://api.thedogapi.com/v1/breeds?key=${API_KEY}`
    );
    const apiInfo = url.data.map((d) => {
      return {
        id: d.id,
        name: d.name,
        height: d.height.metric,
        weight: d.weight.metric === 'NaN' ? '' : d.weight.metric.split(' - '),
        lifeSpan: d.life_span,
        image: d.image.url,
        temperament: d.temperament,
        created: false
      };
    });
    //console.log(apiInfo)
    return apiInfo;
  } catch (error) {
    console.log(error);
  }
}; // funciona

//-----------------------FUNCTION GETDB----------------------------------------------
const getDB = async () => {
  try {
    let dogsDB = await Dog.findAll({ include: { model: Temperament } });
    //console.log(dogsDB)
    return dogsDB;
  } catch (error) {
    console.log(error);
  }
}; // si funciona

//-----------------------GET TEMPERAMENTS(funcion para guardar los temperaments a la db) ------------------------------
const getTemperaments = async () => {
    try {
      
      let data = await getApi();
      const temperaments = [
        ...new Set(
            data
            .map((d) => d.temperament)
            .filter((d) => d !== undefined)
            .join(",")
            .split(",")
            .map((w) => w.trim())
            ),
          ];
      
      let existTable = await Temperament.findAll()
      if(!existTable.length) {
        return await Temperament.bulkCreate(temperaments.map((t) => ({ name: t })));
      } 
      console.log("database loaded")
    } catch (error) {
        console.log(error)
    }
}; // funciona

//-------------------------------------CREATE RAZA-------------------------
const createBreed = async ({name, height, weigth, lifeSpan, temperament}) => {
  try {
      const searchBreed = await Dog.findOne({where: {name: name}})
      if(!searchBreed){
        let newBreed = await Dog.create({
          name,
          height,
          weigth,
          lifeSpan,
          created: true
        })
        //console.log(newBreed.__proto__)
        await newBreed.addTemperament(temperament)
      }
  } catch (error) {
    console.log(error)
  }
} 

//------------------------DOG por ID en DB -------------------------
const dogIdDB = async(id) => {
  if(id){
    const existInDB = await Dog.findByPk(id, {
      include: {model: Temperament}
    }) 
    return existInDB
  } 
}


module.exports = {
  getApi,
  getDB,
  getTemperaments,
  createBreed,
  dogIdDB
};
