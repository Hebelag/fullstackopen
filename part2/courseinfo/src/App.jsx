const Course = ({ courses }) => {
  return courses.map((c) => {
    return (
      <div key={c.id}>
        <Header text={c.name} />
        <Content parts={c.parts} />
      </div>
    );
  });
};

const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const Content = ({ parts }) => {
  const partList = parts.map((p) => {
    return (
      <div key={p.id}>
        <Part part={p} />
      </div>
    );
  });

  return (
    <>
      {partList}
      <Total parts={parts} />
    </>
  );
};

const Part = ({ part }) => {
  return (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((acc, curr) => {
    return acc + curr.exercises;
  }, 0);

  return <h3>total of {total} exercises</h3>;
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <h1>Web development curriculum</h1>
      <Course courses={courses} />
    </>
  );
};

export default App;
