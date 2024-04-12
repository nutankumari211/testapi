import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddDataForm from './AddDataForm'; 

function DataList() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState({ addCount: 0, updateCount: 0 });
  const [editableItemId, setEditableItemId] = useState(null);
  const [loading, setLoading] = useState(false);
  axios.defaults.withCredentials=true;
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://testapi-ruby.vercel.app/api/data/all');
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error('Error fetching data:', err);
    }
  };

  const fetchCount = async () => {
    try {
      const response = await axios.get('https://testapi-ruby.vercel.app/api/data/count');
      setCount(response.data);
    } catch (err) {
      console.error('Error fetching count:', err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCount();
  }, []); // Remove the dependency array

  const handleEdit = (id) => {
    setEditableItemId(id);
  };

  const handleSave = async (id) => {
    const newName = document.getElementById(`name_${id}`).value;
    const newAge = document.getElementById(`age_${id}`).value;
    const newEmail = document.getElementById(`email_${id}`).value;

    console.log('Saving updated data:', { name: newName, age: newAge, email: newEmail });

    try {
      await axios.put(`https://testapi-ruby.vercel.app/api/data/update/${id}`, {
        name: newName,
        age: newAge,
        email: newEmail
      });
      setEditableItemId(null);
      fetchCount(); // Fetch count after save
      const updatedData = data.map(item => {
        if (item._id === id) {
          return { ...item, name: newName, age: newAge, email: newEmail };
        }
        return item;
      });
      setData(updatedData);
    } catch (err) {
      console.error('Error saving updated data:', err);
    }
  };

  const handleCancel = () => {
    setEditableItemId(null);
  };

  return (
    <div>
      <AddDataForm fetchData={fetchData} fetchCount={fetchCount} />
      <div style={{ border: '1px solid black', padding: '10px', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}>

      <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Data List</h2>
<p style={{ fontSize: '16px', marginBottom: '5px' }}>Add Count: <span style={{ fontWeight: 'bold', color: '#007bff' }}>{count.addCount}</span></p>
<p style={{ fontSize: '16px', marginBottom: '20px' }}>Update Count: <span style={{ fontWeight: 'bold', color: '#28a745' }}>{count.updateCount}</span></p>
      </div>
     

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Age</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{editableItemId === item._id ? <input type="text" id={`name_${item._id}`} defaultValue={item.name} /> : item.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{editableItemId === item._id ? <input type="text" id={`age_${item._id}`} defaultValue={item.age} /> : item.age}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{editableItemId === item._id ? <input type="text" id={`email_${item._id}`} defaultValue={item.email} /> : item.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {editableItemId === item._id ? (
                    <div>
                      <button onClick={() => handleSave(item._id)} style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}>Save</button>
                      <button onClick={handleCancel} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px' }}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => { handleEdit(item._id); }} style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>Update</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DataList;
