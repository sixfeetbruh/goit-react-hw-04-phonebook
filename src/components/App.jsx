import { useState, useEffect } from 'react';
import { Section } from './Section/Section';
import { PhonebookForm } from './PhonebookComponent/Form/Form';
import { ContactList } from './PhonebookComponent/ContactList/ContactList';
import { Filter } from './PhonebookComponent/Filter/Filter';
import initialValue from '../json/initialValue';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? initialValue
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    setContacts([...contacts, contact]);
  };

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const handleFilterChange = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    const normalizedValue = filter.toLowerCase().trim();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedValue)
    );
  };

  const clearFilterField = () => {
    setFilter('');
  };

  return (
    <>
      <Section title="Add new contacts">
        <PhonebookForm
          contacts={contacts}
          addContact={addContact}
        ></PhonebookForm>
      </Section>

      <Section title="Filter contacts">
        <Filter
          onChange={handleFilterChange}
          value={filter}
          onClick={clearFilterField}
        ></Filter>
      </Section>

      <Section title="Contact List">
        {contacts.length ? (
          <ContactList
            contactList={getFilteredContacts()}
            onDelete={deleteContact}
          ></ContactList>
        ) : (
          <h2 style={{ textAlign: 'center' }}>There is no added contacts</h2>
        )}
      </Section>
    </>
  );
};
