import React from 'react'
import s from './filters.module.css'


export default function Filters({orderAlph, filterWeight, filterByAPIorDB, temperaments, filterTemp}) {
  

  return (
     <div className={s.filters}>
        <select defaultValue="filters" onChange={(e)=> orderAlph(e)}>
         <option value="filters" selected={true} disabled={true}>Filter by:</option>
         <option value="A-Z">A-Z</option>
         <option value="Z-A">Z-A</option>
        </select>
        <select defaultValue="weight" onChange={(e) => filterWeight(e)}>
          <option value="weight" selected={true} disabled={true}>Weight</option>
          <option value="weight-max">Max Weight</option>
          <option value="weight-min">Min Weight</option>
        </select>
        <select defaultValue="filter" onChange={(e) => filterByAPIorDB(e)}>
          <option value="filter" selected={true} disabled={true}>API/DB</option>
          <option value="db">Database</option>
          <option value="api">API</option>
        </select>
        <select defaultValue="temperament" onChange={(e) => filterTemp(e)}>
          <option value="temperament" selected={true} disabled={true}>Temperaments</option>
          <option value="all">All</option>
          {
            temperaments.map(t => {
              return <option value={t.name} key={t.id}>{t.name}</option>
            })
          }
        </select>
     </div>





  )
}
