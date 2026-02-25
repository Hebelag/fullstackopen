import { useState } from "react";

const FeedbackHeader = () => <h1>give feedback</h1>;

const StatsHeader = () => <h1>statistics</h1>;

const FeedbackButton = ({ name, onClick }) => {
  return (
    <button key={name} onClick={onClick}>
      {name}
    </button>
  );
};

const FeedbackColumns = (props) => {
  const buttons = props.buttonInfo.map((a) => (
    <FeedbackButton name={a.name} onClick={a.counterFn} />
  ));
  return buttons;
};

const StatisticsLine = ({ name, counter }) => {
  return (
    <p>
      {name} {counter}
    </p>
  );
};

const Statistics = (props) => {
  console.log(props);
  const stats = props.state.map((a) => [a.name, a.counter]);
  const sumCounter = props.state.reduce((acc, curr) => {
    return acc + curr.counter;
  }, 0);
  stats.push(["all", sumCounter]);
  return stats;
};

const StatsTable = (props) => {
  console.log(props);
  const stats = Statistics(props);
  const avg = Average(props);
  const pos = Positive(props);
  console.log(stats, avg, pos);
  console.log(stats[0]);
  return (
    <table>
      <tbody>
        {stats.map((a) => {
          return (
            <tr>
              <td>{a[0]}</td>
              <td>{a[1]}</td>
            </tr>
          );
        })}
        <tr>
          <td>{avg[0]}</td>
          <td>{avg[1].toFixed(1)}</td>
        </tr>
        <tr>
          <td>{pos[0]}</td>
          <td>{(pos[1] * 100).toFixed(1)}%</td>
        </tr>
      </tbody>
    </table>
  );
};

const Average = (props) => {
  const sumValues = props.state.reduce((acc, curr) => {
    return acc + curr.counter * curr.value;
  }, 0);
  console.log(sumValues);
  const sumCounter = props.state.reduce((acc, curr) => {
    return acc + curr.counter;
  }, 0);
  console.log(sumCounter);
  const average = sumCounter != 0 ? sumValues / sumCounter : 0;
  return ["average", average];
};

const Positive = (props) => {
  const sumCounter = props.state.reduce((acc, curr) => {
    return acc + curr.counter;
  }, 0);
  let pos = 0;

  for (let x = 0; x < props.state.length; x++) {
    let feedbackState = props.state[x];
    console.log(feedbackState);
    if (feedbackState.name === "good") {
      pos = feedbackState.counter / sumCounter;
    }
  }
  return ["positive", pos];
};

const App = () => {
  // save clicks of each button to its own state

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbackStates = [
    {
      name: "good",
      counter: good,
      counterFn: () => setGood(good + 1),
      value: 1,
    },
    {
      name: "neutral",
      counter: neutral,
      counterFn: () => setNeutral(neutral + 1),
      value: 0,
    },
    { name: "bad", counter: bad, counterFn: () => setBad(bad + 1), value: -1 },
  ];

  return (
    <div>
      <FeedbackHeader />
      <FeedbackColumns buttonInfo={feedbackStates} />
      <StatsHeader />
      <StatsTable state={feedbackStates} />
    </div>
  );
};

export default App;
