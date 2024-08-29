import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteWeight } from '../../slices/weightSlice';
import { Link } from 'react-router-dom';
import Modal from '../Modal';

const WeightList = () => {
  const weights = useSelector((state) => state.weight.weights);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [weightDifference, setWeightDifference] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  if (!user) {
    return <div>Please log in to view your weight list.</div>;
  }

  const userWeights = weights.filter(weight => weight.userId === user.id);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteWeight({ id: deleteId, userId: user.id }));
    setShowModal(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCalculateDifference = () => {
    const filteredWeights = userWeights.filter(weight => {
      const date = new Date(weight.date).toISOString().split('T')[0];
      return date >= startDate && date <= endDate;
    });

    if (filteredWeights.length > 0) {
      const startWeight = filteredWeights[0].weight;
      const endWeight = filteredWeights[filteredWeights.length - 1].weight;
      setWeightDifference(endWeight - startWeight);
    } else {
      setWeightDifference(null);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userWeights.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(userWeights.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <h2>Weight List</h2>
      <div className="date-inputs">
        <label>
          Start Date
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button className="calculate-button" onClick={handleCalculateDifference}>Calculate Difference</button>
      </div>
      {weightDifference !== null && (
        <p className="weight-difference">Weight Difference: {weightDifference} kg</p>
      )}
      <table className="weight-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight (kg)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((weight) => (
            <tr key={weight.id}>
              <td>{new Date(weight.date).toLocaleDateString()}</td>
              <td>{weight.weight}</td>
              <td>
                <button className="delete-button" onClick={() => handleDeleteClick(weight.id)}>Delete</button>
                <Link className="edit-button" to={`/edit-weight/${weight.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => handlePageChange(number)}>
            {number}
          </button>
        ))}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteConfirm}
      >
        Are you sure you want to delete this weight entry?
      </Modal>
    </div>
  );
};

export default WeightList;
