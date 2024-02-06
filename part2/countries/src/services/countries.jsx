import axios from 'axios'

const baseUrl = `https://studies.cs.helsinki.fi/restcountries`
const endPointName = `api/name`
const endPointAll = `api/all`


const getByFullName = (name) => {
    const request = axios.get(`${baseUrl}/${endPointName}/${name}`)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(`${baseUrl}/${endPointAll}`)
    return request.then(response => response.data)
}

export default { getAll, getByFullName }