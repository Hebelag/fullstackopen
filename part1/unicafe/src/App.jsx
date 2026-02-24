const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Content = (props) => {
  const output = props.parts.map((a) => (
    <Part part={a.name} exercise={a.exercises} />
  ));
  return output;
};

const Total = (props) => {
  const total = props.exercises.reduce((a, b) => a + b);
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };
  console.log(course);

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  );
};

export default App;
