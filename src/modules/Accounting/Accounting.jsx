import React, { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import axios from "axios";
import "./styles/accounting-styling.css";

const BodyContent = () => {
    // Use states
    const [chartLabels, setChartLabels] = useState([]);
    const [chartSeries, setChartSeries] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [data, setData] = useState([]);


    // Bar graph: General ledger view 
    const fetchData = () => {
        fetch('http://127.0.0.1:8000/api/general-ledger-jel-view/')
            .then(response => response.json())
            .then(result => {
                console.log('API Response:', result);

                // Grouping by account name (or another key you prefer)
                const grouped = {};

                result.forEach(entry => {
                    const accountName = entry.account_name || 'Unknown';
                    if (!grouped[accountName]) {
                        grouped[accountName] = { debit: 0, credit: 0 };
                    }
                    grouped[accountName].debit += parseFloat(entry.debit_amount || 0);
                    grouped[accountName].credit += parseFloat(entry.credit_amount || 0);
                });

                // Prepare chart data
                const labels = Object.keys(grouped); // ['Account A', 'Account B', ...]
                const debitData = labels.map(label => parseFloat(grouped[label].debit.toFixed(2)));
                const creditData = labels.map(label => parseFloat(grouped[label].credit.toFixed(2)));

                // Set for chart
                setChartLabels(labels);
                setChartSeries([
                    { label: "Debit", data: debitData },
                    { label: "Credit", data: creditData }
                ]);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchData();
    }, []);


    // Pie chart: Chart of Accounts data 
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/chart-of-accounts/")
            .then(response => {
                const rawData = response.data;

                // Update table data
                setData(rawData.map((acc, index) => ({
                    id: index + 1,
                    account_code: acc.account_code,
                    account_name: acc.account_name,
                    account_type: acc.account_type
                })));

                // Count how many accounts per type
                const typeCounts = {};
                rawData.forEach(acc => {
                    typeCounts[acc.account_type] = (typeCounts[acc.account_type] || 0) + 1;
                });

                // Convert to pie chart format
                const formattedPie = Object.entries(typeCounts).map(([label, value], idx) => ({
                    id: idx,
                    value,
                    label
                }));

                setPieData(formattedPie);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="accounting">
            <div className="body-content-container">
                <div className="title-subtitle-container">
                    <h1 className="subModule-title">Accounting Dashboard</h1>
                </div>

                <div className="flex flex-col bg-white rounded-2xl shadow-lg p-4 mb-56">
                        <h1 className="font-bold">Journal</h1>
                        {/* <BarChart
                            xAxis={[{ scaleType: "band", data: chartLabels }]}
                            series={chartSeries}
                            width={500}
                            height={300}
                        /> */}
                    </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    {/* Bar chart: General Ledger */}
                    <div className="flex flex-col bg-white rounded-2xl shadow-lg p-4">
                        <h1 className="font-bold">General Ledger</h1>
                        {/* <BarChart
                            xAxis={[{ scaleType: "band", data: chartLabels }]}
                            series={chartSeries}
                            width={500}
                            height={300}
                        /> */}
                    </div>

                    {/* Pie Chart: ??? */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
                        <h1 className="font-bold">Chart of Accounts</h1>
                        {/* <PieChart
                            series={[
                                {
                                    data: pieData,
                                },
                            ]}
                            width={400}
                            height={400}
                        /> */}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-4 mt-6 flex flex-wrap justify-center gap-6">
                    <div className="flex flex-col items-center">
                        <span className="text-sm font-medium text-gray-500 mb-2">Cash Flow</span>
                        <Gauge width={120} height={120} value={60} />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-sm font-medium text-gray-500 mb-2">Profit Margin</span>
                        <Gauge width={120} height={120} value={60} startAngle={-90} endAngle={90} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BodyContent;
