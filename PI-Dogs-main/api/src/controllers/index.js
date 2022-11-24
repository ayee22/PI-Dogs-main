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
        temperaments: d.temperament,
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
   let dogsDB = await Dog.findAll({ include: 
      { model: Temperament, 
        attributes: ["name"],
          through: {
              attributes: [],
            }
      }
    });
    
    //console.log(dogsDB)
    return dogsDB
  } catch (error) {
    console.log(error);
  }
}; // si funciona

//-----------------------GET TEMPERAMENTS(funcion para guardar los temperaments a la db) ------------------------------
const getTemperaments = async () => {
    try {
      
      let data = await getApi(); //traigo lo de la api
      const temperaments = [     
        ...new Set(              //new set devuleve un array sin copias
            data                 // mapeo lo de la api, buscnado sus temperamentos
            .map((d) => d.temperaments)
            .filter((d) => d !== undefined) //busco todos los que no sean undefined
            .join(",")
            .split(",")
            .map((w) => w.trim()) //trim quita espacios
            ),
          ];
      
      let existTable = await Temperament.findAll() //encuentra lo que hay en temperamentes
      if(!existTable.length) { //si temperament no tiene nada
        return await Temperament.bulkCreate(temperaments.map((t) => ({ name: t }))); //bulkcreate para que agrege todos de una vez solo por nombre
      } 
      console.log("database loaded")
    } catch (error) {
        console.log(error)
    }
}; // funciona

//-------------------------------------CREATE RAZA-------------------------
const createBreed = async ({name, height, weight, lifeSpan, temperament}) => { //le pasamos como parametro, las properties que necesitamos para postear
  try {
      const searchBreed = await Dog.findOne({where: {name: name}}) //encuentra uno para crearlo y que no se repita
      if(!searchBreed){ //si no hay ninfuno que se repita
        let newBreed = await Dog.create({ //crea una nueva raza con las propieedades:
          name,
          height,
          weight,
          lifeSpan,
          created: true
        })
        //console.log(newBreed.__proto__)
        await newBreed.addTemperament(temperament) //con el addTemperament le pasamos el id del temperament para que se relacionen
      }
  } catch (error) {
    console.log(error)
  }
} 

//------------------------DOG por ID en DB -------------------------
const dogIdDB = async(id) => {
  if(id){
    const existInDB = await Dog.findByPk(id, { //busque en dob por pk y tambien en el modelo de temperament
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
