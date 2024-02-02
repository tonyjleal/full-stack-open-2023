const PersonForm = ({methodAdd, newPerson, handleNewName, handleNewNumber}) => {

    const {name, number} = newPerson

    return (
        <form onSubmit={methodAdd}>
            <div>
            name: <input value={name} onChange={handleNewName}/>
            </div>
            <div>
            number: <input type='tel' value={number} onChange={handleNewNumber} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )

}

export default PersonForm