import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, onConfirm, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          {children}
        </div>
        <div className="modal-actions">
          <button className="modal-button" onClick={onConfirm}>Yes</button>
          <button className="modal-button" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
