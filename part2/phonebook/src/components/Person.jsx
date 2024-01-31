const Person = ({person, handlerDeletePerson}) => {

    const {id, name, number} = person

    return <div>{name} {number} <button onClick={() => handlerDeletePerson(id, name)}>delete</button></div>

}

export default Person