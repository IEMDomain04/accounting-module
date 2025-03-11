import React from "react";
import "./Table.css";

const Table = ({ data }) => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Account Type</th>
                        <th>Account Name</th>
                        <th>Date Created</th>
                    </tr>
                </thead>
            </table>
            <div className="table-container">
                <table>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.accountType}</td>
                                <td>{item.accountName}</td>
                                <td>
                                    {item.date} <br />
                                    {item.time}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;
