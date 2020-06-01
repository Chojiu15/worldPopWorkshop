import React, { useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {

  const [population, setPopulation] = useState([])
  const [pop, setPop] = useState({
    country: '',
    population: '',
    year: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(`http://localhost:3000/api/populations`)
      .then(response => setPopulation(response.data))
      .catch(err => console.error(err))
  }

  const queryData = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:3000/api/populations`, pop)
      .then(fetchData)
  }


  return (
    <div style={{ textAlign: 'center' }}>
      {population.map(e => {
        return <li>{e.country} {e.population} {e.year}</li>
      })}
      <form onSubmit={queryData}>
        <input name='country' value={pop.country} required type='text' onChange={(e) => setPop({ ...pop, country: e.target.value })} />
        <input name='population' value={pop.population} required type='text' onChange={(e) => setPop({ ...pop, population: e.target.value })} />
        <input name='year' value={pop.year} required type='text' onChange={(e) => setPop({ ...pop, year: e.target.value })} />
        <button type='submit'>
          ADD DATA
      </button>
      </form>
    </div>
  );
}

export default App;