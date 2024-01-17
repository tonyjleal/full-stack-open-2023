const PersonForm = ({methodAdd, newName, newNumber, handleNewName, handleNewNumber}) => {
    return (
        <form onSubmit={methodAdd}>
            <div>
            name: <input value={newName} onChange={handleNewName}/>
            </div>
            <div>
            number: <input type='tel' value={newNumber} onChange={handleNewNumber} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )

}

export default PersonForm