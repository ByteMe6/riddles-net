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
        <button className="modal-close-btn" onClick={onClose} style={{ marginTop: 16 }}>{closeLabel}</button>
      </div>
    </div>
  );
} 