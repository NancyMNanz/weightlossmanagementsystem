import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editWeight } from '../../slices/weightSlice';

const EditWeight = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const weight = useSelector((state) => state.weight.weights.find((w) => w.id === Number(id) && w.userId === user.id));
  const [newWeight, setNewWeight] = useState(weight ? weight.weight : '');

  if (!user) {
    return <div>Please log in to edit your weight.</div>;
  }

  const handleEditWeight = (e) => {
    e.preventDefault();
    dispatch(editWeight({ id: Number(id), weight: newWeight, date: weight.date, userId: user.id }));
    navigate('/dashboard');
  };

  if (!weight) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Edit Weight</h2>
      <form onSubmit={handleEditWeight}>
        <div>
          <label>Weight</label>
          <input
            type="number"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditWeight;
