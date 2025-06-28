import React from 'react';

export default function AccountModal({ isOpen, onClose, title, closeLabel, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
        </div>
        {children}
        <div className="modal-buttons-container">
          <button className="modal-close-btn" onClick={onClose}>{closeLabel}</button>
        </div>
      </div>
    </div>
  );
} 