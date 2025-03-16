import React from "react";
import "./Table.css"; // Make sure to create this CSS file

const Table = ({ columns, data }) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        {/* Render the column headers dynamically */}
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {/* Render the table rows dynamically based on the data */}
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {/* Render the table data dynamically based on the number of columns */}
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
