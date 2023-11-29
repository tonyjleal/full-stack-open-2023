import Part from '../components/Part'


const Content = (props) => {
    return (
        <div> 
            <Part part={props.part1} excercises={props.exercises1} />
            <Part part={props.part2} excercises={props.exercises2} />
            <Part part={props.part3} excercises={props.exercises3} />
        </div>
    );
}

export default Content;