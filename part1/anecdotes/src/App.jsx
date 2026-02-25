import { useState } from "react";

const AnecdoteButton = ({ onClick }) => {
  return <button onClick={onClick}>next anecdote</button>;
};

const VoteButton = ({ onClick }) => {
  return <button onClick={onClick}>vote</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Int16Array(anecdotes.length).fill(0));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <br />
      <VoteButton
        onClick={() => {
          const copy = [...votes];
          copy[selected] += 1;
          setVotes(copy);
        }}
      />
      <AnecdoteButton
        onClick={() =>
          setSelected(Math.round(Math.random() * (anecdotes.length - 1)))
        }
      />

      <h1>Anecdote with most votes</h1>
      {
        anecdotes[
          votes.findIndex((it) => votes.toSorted()[votes.length - 1] == it)
        ]
      }
      <br />
      {votes.length}
      <br />
      {votes.toSorted()}
      <p>has {votes.toSorted()[votes.length - 1]} votes</p>
    </div>
  );
};

export default App;
