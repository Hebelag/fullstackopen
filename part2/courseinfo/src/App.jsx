const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </div>
  );
  /*return course.map((c) => {
    return (
      <div>
        <Header text={c.name} />
        <Content text={c.parts} />
      </div>
    );
  });*/
};

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Content = ({ parts }) => {
  return parts.map((p) => {
    return (
      <div key={p.id}>
        <Part part={p} />
      </div>
    );
  });
};

const Part = ({ part }) => {
  return (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
