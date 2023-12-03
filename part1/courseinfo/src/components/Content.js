import Part from '../components/Part'


const Content = (props) => {
    return (
        <div> 
            {
            props.parts.map(element =>
                <Part name={element.name} exercises={element.exercises} />)
            }            
        </div>
    );
}

export default Content;