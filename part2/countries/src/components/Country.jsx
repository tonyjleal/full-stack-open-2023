import Languages from "./Languages"

const Country = ({country}) => {

    const flagStyle = {
        borderColor: '#ddd', 
        borderWidth: 1,
        borderStyle: 'solid'
    }

    return (
        <>
            <h2>
                {
                    country.name.common
                }
            </h2>

            <div>
                capital {country.capital[0]}    <br/>                
                area  {country.area}
            </div>

            <p><strong>languages:</strong></p>
            <Languages languages={country.languages} />

            <img src={country.flags.png} alt={country.flags.alt} height={150} style={flagStyle}/>
        </>
    )

}


export default Country