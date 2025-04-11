import React from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import "./styles/Accounting.css";

const BodyContent = () => {
    return (
        <div className="accounting">
            <div className="body-content-container">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Accounting Dashboard</h1>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg p-4 flex justify-center items-center">
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: ['Group A', 'Group B', 'Group C'] }]}
                            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                            width={450}
                            height={300}
                        />
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-4 flex justify-center items-center">
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 10, label: 'Series A' },
                                        { id: 1, value: 15, label: 'Series B' },
                                        { id: 2, value: 20, label: 'Series C' },
                                    ],
                                },
                            ]}
                            width={350}
                            height={300}
                        />
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
