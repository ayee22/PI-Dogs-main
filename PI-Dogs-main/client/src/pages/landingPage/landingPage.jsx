import React from "react";
import { Link } from "react-router-dom";
import s from './landingPage.module.css'

export default function landingPage(){
    return(
        <div className={s.body}>
            <div>
                <h1 className={s.tittle}>WELCOME TO MY DOG APP!</h1>
                <Link to='/home'>
                    <button className={s.button}>START</button>
                </Link>
            </div>
        </div>
    )
}