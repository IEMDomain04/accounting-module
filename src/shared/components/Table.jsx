import React from "react";
import "./Table.css"; // Make sure to create this CSS file

const Table = ({ headerData, data }) => {
    return (
        <div className="table-container">

            
            <table>
                <thead>
                    <tr>
                        {headerData.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>


                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item}</td>
                            <td>{item}</td>
                            <td>
                                {item} <br />
                                {item}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
