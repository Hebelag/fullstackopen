import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleAddPerson = (event) => {
    event.preventDefault();
    const newPObject = { name: newName };
    setPersons(persons.concat(newPObject));
    setNewName("");
  };

  const handleInput = (event) => {
    setNewName(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input onChange={handleInput} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((p) => {
        return <p key={p.name}>{p.name}</p>;
      })}
    </div>
  );
};

export default App;
