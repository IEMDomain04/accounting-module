import React from 'react'
import '../styles/Journal.css'
import Button from '../components/Button'
import Table from '../components/Table'

const Journal = () => {

    // Define columns (header data)
    const columns = ["Journal Id", "Journal Date", "Description", "Debit", "Credit", "Invoice Id", "Currency Id"];

    // Define data (rows of table)
    const data = [
        [1001, "10/10/1000", "Bought a Moudkankdaskldjaskljdlkajdkladjiolksse", 10000, 10000, 100101, "PHP" ], // Debit first, blank for credit
      ];    


    return (
        <div className='Journal'>
            <div className='body-content-container'>

                <div className="component-container">
                    <div className='buttons-container'>
                    <Button name="Create ID" variant="standard2" />
                    </div>
                </div>

                <Table data={data} columns={columns}/>
            </div>
        </div>
    )
}

export default Journal
