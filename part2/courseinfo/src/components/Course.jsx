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

export default Course;
