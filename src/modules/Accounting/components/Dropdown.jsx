import React from 'react';
import './Dropdown.css';

const Dropdown = ({ options, style, defaultOption }) => {
  return (
    <div>
      <select className={`dropdown dropdown-${style}`}>
        <option value="" defaultChecked>{defaultOption}</option>
        {options.map((option, index) => (
          <option key={index} value={option.toLowerCase().replace(/\s+/g, "-")}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
