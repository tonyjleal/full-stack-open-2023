const Filter = ({text, handleFilterName}) => {

    return (
      <div>
        filter shown with <input type="text" value={text} onChange={handleFilterName} />
      </div>
    )
}

export default Filter