import React, { useState } from "react";
import "./Table.css"; // Make sure to create this CSS file

const Table = ({ columns, data, enableCheckbox }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const handleCheckboxChange = (index) => {
        setSelectedRows(prevSelectedRows => {
            if (prevSelectedRows.includes(index)) {
                return prevSelectedRows.filter(row => row !== index);
            } else {
                return [...prevSelectedRows, index];
            }
        });
    };

    return (
        <div className={`table-container ${enableCheckbox ? 'checkbox-enabled' : ''}`}>
            <table>
                <thead>
                    <tr>
                        {enableCheckbox && <th></th>}
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {enableCheckbox && (
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(rowIndex)}
                                        onChange={() => handleCheckboxChange(rowIndex)}
                                    />
                                </td>
                            )}
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
