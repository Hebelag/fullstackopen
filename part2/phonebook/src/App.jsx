import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleAddPerson = (event) => {
    event.preventDefault();
    const names = persons.map((a) => a.name);
    if (names.find((a) => a === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPObject = { name: newName, number: newNumber };
      setPersons(persons.concat(newPObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleInputName = (event) => {
    setNewName(event.target.value);
  };

  const handleInputNumber = (event) => {
    setNewNumber(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input onChange={handleInputName} value={newName} />
        </div>
        <div>
          number: <input onChange={handleInputNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((p) => {
        return (
          <p key={p.name}>
            {p.name} {p.number}
          </p>
        );
      })}
    </div>
  );
};

export default App;
