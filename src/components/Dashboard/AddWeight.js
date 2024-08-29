import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWeight } from '../../slices/weightSlice';

const AddWeight = () => {
  const [weight, setWeight] = useState('');
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <div>Please log in to add your weight.</div>;
  }

  const handleAddWeight = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    try {
      dispatch(addWeight({ id: Date.now(), weight, date: today, userId: user.id }));
      setWeight('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Add Weight</h2>
      <form onSubmit={handleAddWeight}>
        <div>
          <label>Weight</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        </div>
        <button type="submit">Add Weight</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddWeight;
