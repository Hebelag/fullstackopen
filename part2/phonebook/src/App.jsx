import { useState, useEffect } from "react";
import personService from "./services/persons";

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

const Persons = ({ persons, nameFilter, deletePerson }) => {
  return persons
    .filter((p) => p.name.toLowerCase().includes(nameFilter.toLowerCase()))
    .map((p) => {
      return (
        <div key={p.name}>
          {p.name} {p.number}
          <button onClick={() => deletePerson(p.id)}>delete</button>
        </div>
      );
    });
};

const ErrorNotification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }

  if (isError) {
    return <div className="errorField">{message}</div>;
  } else {
    return <div className="confirmation">{message}</div>;
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const fetchAllPersons = () => {
    personService.getAll().then((persons) => {
      console.log("promise fulfilled");
      setPersons(persons);
    });
  };

  useEffect(() => {
    console.log("effect");
    fetchAllPersons();
  }, []);

  const handleAddPerson = (event) => {
    const personObject = { name: newName, number: newNumber };
    event.preventDefault();

    personService
      .getByName(personObject.name)
      .then((foundPerson) => {
        if (foundPerson) {
          const confirmChangeNumber = confirm(
            `${foundPerson.name} is already added to phonebook, replace the old number with a new one?`,
          );
          if (confirmChangeNumber) {
            personService
              .updateNumber(personObject, foundPerson.id)
              .then((response) => {
                console.log("update persons");
                setPersons(
                  persons.map((p) =>
                    p.id === foundPerson.id ? response.data : p,
                  ),
                );
              })
              .catch((error) => {
                setIsError(true);
                setErrorMessage(`${error}`);
                setTimeout(() => {
                  setErrorMessage(null);
                }, 1500);
              });
          }
        } else {
          if (persons.find((p) => p.name === personObject.name)) {
            setIsError(true);
            setErrorMessage(
              `Information of ${personObject.name} has already been removed from the server.`,
            );
            personService.getAll().then((persons) => setPersons(persons));
            setTimeout(() => {
              setErrorMessage(null);
            }, 1000);
            return;
          }
          personService
            .create(personObject)
            .then((newPerson) => {
              setPersons(persons.concat(newPerson));
              setNewName("");
              setNewNumber("");
              setErrorMessage(
                `${newPerson.name} was successfully added to the phonebook!`,
              );
              setIsError(false);
              setTimeout(() => {
                setErrorMessage(null);
              }, 1000);
            })
            .catch((error) => {
              setIsError(true);
              setErrorMessage(`${error.response.data.error}`);
              setTimeout(() => {
                setErrorMessage(null);
              }, 1500);
            });
        }
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(`${error}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 1500);
      });
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

  const deletePerson = (id) => {
    personService.deletePerson(id).then((response) => {
      console.log(`${response.status}`);
      setPersons(persons.filter((p) => p.id !== id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        onHandleNameFilter={handleInputNameFilter}
        nameFilter={nameFilter}
      />
      <h3>Add a new Person (with phone number)</h3>
      <ErrorNotification message={errorMessage} isError={isError} />
      <PersonForm
        onSubmit={handleAddPerson}
        onNameInputChange={handleInputName}
        nameValue={newName}
        onNumberInputChange={handleInputNumber}
        numberValue={newNumber}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        nameFilter={nameFilter}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
