import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const CONTACTS_KEY = 'contacts';

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(CONTACTS_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const checkDuplicate = value =>
    contacts.some(
      ({ name }) => name.toLowerCase() === value.name.toLowerCase()
    );

  const addContact = person => {
    const data = {
      name: person.name,
      number: person.number,
      id: nanoid(),
    };
    checkDuplicate(person)
      ? alert(`This ${person.name} exist`)
      : setContacts([data, ...contacts]);
  };

  const deleteContact = idContact => {
    const newArray = contacts.filter(contact => idContact !== contact.id);
    setContacts(newArray);
  };

  const handleFilter = event => {
    setFilter(event.currentTarget.value.toLowerCase());
  };

  const filterContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 style={{ textAlign: 'center' }}>Contacts</h2>
      <Filter onHandleFilter={handleFilter} />
      <ContactList contactList={filterContacts} onDelete={deleteContact} />
    </div>
  );
}
