import Content from './Content';
import Header from './Header'

const Course = ({course}) => {

    const {name, parts} = course;

    return (
        <>
            <Header title={name}></Header>
            <Content parts={parts}></Content>
        </>
    );
}

export default Course;