const Languages = ({languages}) =>  <ul> { Object.values(languages).map(language => <li key={language}>{language}</li>)}</ul>


export default Languages