import Country from "./Country"

const Countries = ({countries, setCountriesToShow}) => {

    if (!countries) return null

    if (countries.length > 10) return <div>Too many matches, specify another filter</div>

    if (countries.length == 1) return <Country key={countries[0].name.common} country={countries[0]} />
    

    return  (
        <>
            {
                countries.map(country => 
                                <div key={country.name.common}>
                                    {country.name.common} <button onClick={() => setCountriesToShow([country])}>show</button>
                                </div>)
            }
        </>
    )
   
}

export default Countries;
