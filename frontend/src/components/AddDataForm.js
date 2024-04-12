import React, { useState } from 'react';
import axios from 'axios';

function AddDataForm({ fetchData, fetchCount }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
   axios.defaults.withCredentials=true;
  const handleAdd = async () => {
    try {
      setError(null); 
      if (!name || !age || !email) {
        throw new Error('Please fill in all fields.');
      }
      await axios.post('https://testapi-ruby.vercel.app/api/data/add', { name, age, email });
      setName('');
      setAge('');
      setEmail('');
      fetchData(); 
      fetchCount();
    } catch (err) {
      console.error('Error adding data:', err);
      setError(err.message); 
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Add Data</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <button onClick={handleAdd} style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>Add</button>
    </div>
  );
}

export default AddDataForm;
