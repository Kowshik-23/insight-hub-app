// client/src/components/AdminDashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import DataTableView from './DataTableView'; // We will create this component next

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    const [view, setView] = useState('table'); // 'table' or 'report'
    const [reportData, setReportData] = useState(null);
    const [reportTitle, setReportTitle] = useState('');
    const [loadingReport, setLoadingReport] = useState(false);

    const generateReport = async (period) => {
        setView('report');
        setLoadingReport(true);
        setReportData(null);
        setReportTitle(`Generating ${period} report...`);
        try {
            const token = 'supersecretadmintoken';
            const response = await axios.get(`https://insight-hub-api.onrender.com/api/reports?period=${period}`, {
                headers: { 'Authorization': token }
            });
            const chartData = {
                labels: response.data.labels,
                datasets: [{
                    label: 'Submissions per Day',
                    data: response.data.data,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                }]
            };
            setReportData(chartData);
            setReportTitle(`${period.charAt(0).toUpperCase() + period.slice(1)} Report`);
        } catch (error) {
            console.error(`Error generating ${period} report:`, error);
            setReportTitle(`Could not generate ${period} report.`);
        } finally {
            setLoadingReport(false);
        }
    };

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-controls">
                <button onClick={() => setView('table')}>View All Data</button>
                <button onClick={() => generateReport('weekly')}>Generate Weekly Report</button>
                <button onClick={() => generateReport('monthly')}>Generate Monthly Report</button>
                <button onClick={() => generateReport('yearly')}>Generate Yearly Report</button>
            </div>

            {view === 'table' && <DataTableView />}
            
            {view === 'report' && (
                <div className="report-view">
                    <h2>{reportTitle}</h2>
                    {loadingReport && <p>Loading...</p>}
                    {reportData && <Line data={reportData} />}
                    {!loadingReport && reportData && reportData.labels.length === 0 && <p>No data found for this period.</p>}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;