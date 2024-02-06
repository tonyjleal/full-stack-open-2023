import { useState } from 'react'
import { useEffect } from 'react'
import countriesService from './services/countries'
import Countries from './components/Countries'


function App() {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {    
    countriesService.getAll()
                    .then( returnedValue => setCountries(returnedValue))  
  }, [])

  const handleSearch = event => {
    const searchName = event.target.value
    if(searchName) {
      const filterCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchName.toLowerCase()))
      setCountriesToShow(filterCountries)      
    }
  }


  return (
    <>  
      find countries <input type="text" onChange={handleSearch}/>
      <Countries countries={countriesToShow}/> 
    </>
  )
}

export default App
