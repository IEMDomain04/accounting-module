import React, { useState } from "react";
import { Printer, Pencil } from "lucide-react";
import "./Table.css";

const Table = ({
    columns,
    data,
    enableCheckbox,
    handleStatusToggle,
    handlePrintRow,
    handleEditRow,
    showPrintButton,
    showEditButton
}) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const handleCheckboxChange = (index) => {
        setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.includes(index)
                ? prevSelectedRows.filter((row) => row !== index)
                : [...prevSelectedRows, index]
        );
    };

    const formatNumber = (value) => {
        if (!isNaN(value) && value !== "" && value !== null) {
            return parseFloat(value).toLocaleString("en-US", {
                minimumFractionDigits: 2
            });
        }
        return value;
    };

    return (
        <div className="accounting-table">
            <div className={`table-container ${enableCheckbox ? "checkbox-enabled" : ""}`}>
                <table>
                    <thead>
                        <tr>
                            {(showPrintButton || showEditButton) && <th>Actions</th>}
                            {enableCheckbox && <th></th>}
                            {columns.map((column, index) => (
                                <th key={index}>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={selectedRows.includes(rowIndex) ? "selected-row" : ""}
                            >
                                {(showPrintButton || showEditButton) && (
                                    <td className="actions-cell">
                                        <div className="icon-group">
                                            {showPrintButton && (
                                                <Printer
                                                    size={20}
                                                    color="#4A90E2"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handlePrintRow(row)}
                                                    title="Print Row"
                                                />
                                            )}
                                            {showEditButton && (
                                                <Pencil
                                                    size={20}
                                                    color="#4B5563"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleEditRow(row)}
                                                    title="Edit Row"
                                                />
                                            )}
                                        </div>
                                    </td>
                                )}
                                {enableCheckbox && (
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(rowIndex)}
                                            onChange={() => handleCheckboxChange(rowIndex)}
                                        />
                                    </td>
                                )}
                                {row.map((cell, cellIndex) => {
                                    const isStatusColumn = columns[cellIndex] === "Status";
                                    const formattedCell = formatNumber(cell);

                                    return (
                                        <td key={cellIndex} className={isStatusColumn ? "status-cell" : ""}>
                                            <div
                                                className={
                                                    isStatusColumn
                                                        ? cell === "Active"
                                                            ? "status-active"
                                                            : cell === "Inactive"
                                                                ? "status-inactive"
                                                                : cell === "Draft"
                                                                    ? "status-draft"
                                                                    : cell === "Processing"
                                                                        ? "status-processing"
                                                                        : cell === "Completed"
                                                                            ? "status-completed"
                                                                            : ""
                                                        : ""
                                                }
                                                onClick={() => isStatusColumn && handleStatusToggle(rowIndex)}
                                                style={{ cursor: isStatusColumn ? "pointer" : "default" }}
                                            >
                                                {isStatusColumn ? cell : formattedCell}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
