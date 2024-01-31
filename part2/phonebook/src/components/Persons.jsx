import Person from "./Person"

const Persons = ({persons, handlerDeletePerson}) => {

    return (
        <>
            {
                persons.map( person  =>  
                    <Person key={person.name} person={person} handlerDeletePerson={handlerDeletePerson} />
                )
            }        
           
        </>
    )
}

export default Persons