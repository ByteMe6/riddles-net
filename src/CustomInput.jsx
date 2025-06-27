import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function CustomInput({ value, onChange, type = 'text', ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        className="custom-input"
        type={isPassword ? (show ? 'text' : 'password') : type}
        value={value}
        onChange={onChange}
        {...props}
        style={props.style}
      />
      {isPassword && (
        <span
          onClick={() => setShow(s => !s)}
          style={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: '#aaa',
            fontSize: 18
          }}
          tabIndex={0}
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </div>
  );
} 