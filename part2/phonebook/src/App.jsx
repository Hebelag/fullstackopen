import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ onHandleNameFilter, nameFilter }) => {
  return (
    <p>
      Filter shown with{" "}
      <input onChange={onHandleNameFilter} value={nameFilter} />
    </p>
  );
};

const PersonForm = ({
  onSubmit,
  onNameInputChange,
  nameValue,
  onNumberInputChange,
  numberValue,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={onNameInputChange} value={nameValue} />
      </div>
      <div>
        number: <input onChange={onNumberInputChange} value={numberValue} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, nameFilter }) => {
  return persons
    .filter((p) => p.name.toLowerCase().includes(nameFilter.toLowerCase()))
    .map((p) => {
      return (
        <p key={p.name}>
          {p.name} {p.number}
        </p>
      );
    });
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

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

  const handleInputNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        onHandleNameFilter={handleInputNameFilter}
        nameFilter={nameFilter}
      />
      <h3>Add a new Person (with phone number)</h3>
      <PersonForm
        onSubmit={handleAddPerson}
        onNameInputChange={handleInputName}
        nameValue={newName}
        onNumberInputChange={handleInputNumber}
        numberValue={newNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;
