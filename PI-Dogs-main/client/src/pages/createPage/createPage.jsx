import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postBreed } from "../../redux/actions/actions";
import { Link, useHistory } from "react-router-dom";
import s from "./createPage.module.css";
import Nav from "../../components/nav/nav";

export default function CreateBreed() {
  const history = useHistory();
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [error, setError] = useState({});

  const validate = (inputs) => {
    let errors = {};
    if (!inputs.name || !inputs.name.match(/^[A-Za-z]+$/)) {
      errors.name = "Name is required";
    } else if (!inputs.minHeight || !inputs.minHeight.match(/^([0-9])*$/)) {
      errors.minHeight = "Min height is required and must be a number";
    } else if (!inputs.maxHeight || !inputs.maxHeight.match(/^([0-9])*$/)) {
      errors.maxHeight = "Max height is required and must be a number";
    } else if (parseInt(input.minHeight) >= parseInt(input.maxHeight)) {
      errors.maxHeight = "Max height must be greater than MIN HEIGHT";
    } else if (!inputs.minWeight || !inputs.minWeight.match(/^([0-9])*$/)) {
      errors.minWeight = "Min weight is required and must be a number";
    } else if (!inputs.maxWeight || !inputs.maxWeight.match(/^([0-9])*$/)) {
      errors.maxWeight = "Max weight is required and must be a number";
    } else if (parseInt(input.minWeight) >= parseInt(input.maxWeight)) {
      errors.maxWeight = "Max weight must be greater than MIN WEIGHT";
    } else if (!input.lifeSpan || !inputs.lifeSpan.match(/^([0-9])*$/)) {
      errors.lifeSpan = "Life span should not be empty and must be a number";
    } else if (inputs.lifeSpan > 20) {
      errors.lifeSpan = "Life span should be smaller than 20";
    }
    return errors;
  };

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    lifeSpan: "",
    temperament: [], //array para meter mas de un temp
  });

  let handleChange = (e) => {
    //toma el estado anterior y que valga, lo que valia antes
    e.preventDefault(); //e.target.value(valor que tiene el input)
    setInput({ ...input, [e.target.name]: e.target.value }); //e.target.name(valor de la propiedad que la llamo)
    setError(validate({ ...input, [e.target.name]: e.target.value }));
  };

  let handleSubmit = (e) => {
    if(input.name === '' || 
       input.minHeight === '' ||
       input.maxHeight === '' ||
       input.minWeight === '' ||
       input.maxWeight === '' ||
       input.lifeSpan === '' ) {
        return alert('Please complete the fields')
       }
    e.preventDefault();
    dispatch(
      postBreed({
        ...input, //pasamos los inputs para que el back pueda recibirlo y leerlos
        name: input.name,
        height: `${input.minHeight} - ${input.maxHeight}`, //tanto height como weight los concatenamos
        weight: `${input.minWeight} - ${input.maxWeight}`,
        lifeSpan: input.lifeSpan,
        temperaments: input.temperament,
      })
    );
    alert("Breed created succesfully");
    setInput({
      name: "",
      minHeight: "",
      maxHeight: "",
      maxWeight: "",
      minWeight: "",
      lifeSpan: "",
      temperament: [],
    }); //setInput para limpiar los inputs, cuando le doy al submit
    history.push("/home");
  };

  let handleSelect = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  };

  let deleteTemp = (id) => {
    setInput({
      ...input,
      temperament: [...input.temperament.filter((t) => t !== id)], //filtrame el temperamento ocn el id que te pido para eliminarlo
    });
  };

  return (
    <div>
      <Nav />
       <div className={s.container}>
        <h1 className={s.tittle}>CREATE YOUR OWN BREED</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={s.items}>
            <label>Name: {error.name && <p className={s.error}>{error.name}</p>}</label>
            <input
              type={"text"}
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            
          </div>
          <div className={s.items}>
            <label>Min height: {error.minHeight && <p className={s.error}>{error.minHeight}</p>}</label>
            <input
              type={"number"}
              value={input.minHeight}
              name={"minHeight"}
              onChange={(e) => handleChange(e)}
            />
            
          </div>
          <div className={s.items}>
            <label>Max height: {error.maxHeight && <p className={s.error}>{error.maxHeight}</p>}</label>
            <input
              type={"number"}
              value={input.maxHeight}
              name={"maxHeight"}
              onChange={(e) => handleChange(e)}
            />
            
          </div>
          <div className={s.items}>
            <label>Min weight: {error.minWeight && <p className={s.error}>{error.minWeight}</p>}</label>
            <input
              type={"number"}
              value={input.minWeight}
              name={"minWeight"}
              onChange={(e) => handleChange(e)}
            />
            
          </div>
          <div className={s.items}>
            <label>Max weight:  {error.maxWeight && <p className={s.error}>{error.maxWeight}</p>}</label>
            <input
              type={"number"}
              value={input.maxWeight}
              name={"maxWeight"}
              onChange={(e) => handleChange(e)}
            />
           
          </div>
          <div className={s.items}>
            <label>Life Span: {error.lifeSpan && <p className={s.error}>{error.lifeSpan}</p>}</label>
            <input
              type={"number"}
              value={input.lifeSpan}
              name={"lifeSpan"}
              onChange={(e) => handleChange(e)}
            />
            
          </div>

          <div className={s.items}>
            <label>Temperaments: </label>
            <select onChange={(e) => handleSelect(e)}>
              {temperaments.map((t, id) => {
                return (
                  <option key={id} value={t.id}>
                    {t.name}
                  </option>
                );
              })}
            </select>
            <div className={s.showTemp}>
              {input.temperament.map((e) => {
                let temp = temperaments.filter((t) => t.id === e); //<--filtra los temperamentos, segun el id que elegimos

                return (
                  <div className={s.item} key={e}>
                    {temp[0].name}

                    <div onClick={(c) => deleteTemp(temp[0].id)}>X</div>
                  </div>
                ); //el span, va a filtrar segun el id del temperamento que querramos eliminar
              })}
            </div>
          </div>
          <input className={s.boton} type={"submit"} value={"CREATE"} />
        </form>
      </div>
    </div>
  );
}
