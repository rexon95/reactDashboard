import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Container } from 'reactstrap';
import Loader from '../../components/Spinner';
import Calendar from '../../components/Calendar';
import {
    getCharts,
    getDateRange,
} from '../../features/dashboard/dashboardSlice';
import Charts from '../../components/Charts';
import { tableChartPayoad, barChartPayoad, pieChartPayoad } from '../../utils';

export default function Dashboard() {
    const { isLoading, isChartLoading } = useSelector(
        (state) => state.dashboard
    );
    const isLoggedIn = localStorage.getItem('token');
    const dispatch = useDispatch();
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            console.log(isLoggedIn, 'isLoggedIn')
            const demoData = {
                organization: 'DemoTest',
                view: 'Auction',
            };
            dispatch(getDateRange(demoData))
                .unwrap()
                .then()
                .catch((err) => {
                    toast.error(err);
                });
        }
    }, []);

    const handleDashboard = (type='') => {
        setShowChart(!showChart);
        if (type === 'view') {
            dispatch(
                getCharts({ tableChartPayoad, barChartPayoad, pieChartPayoad })
            )
                .unwrap()
                .then()
                .catch((err) => {
                    setShowChart(false)
                    toast.error(err);
                });
        }
    };

    if (isLoading) {
        return <Loader />;
    }

   const handleFetchDataOnDateChange = (type, date) => {
            const {chartObject:{requestParam: {dateRange : tableDateRange}={}} = {}} = tableChartPayoad
            tableDateRange[type] = String(date.getTime());
            const {chartObject:{requestParam: {dateRange : barDateRange}={}} = {}} = barChartPayoad
            barDateRange[type] = String(date.getTime());
            const {chartObject:{requestParam: {dateRange : pieDateRange}={}} = {}} = pieChartPayoad
            pieDateRange[type] = String(date.getTime());
         dispatch(
            getCharts({ tableChartPayoad, barChartPayoad, pieChartPayoad })
        )
            .unwrap()
            .then()
            .catch((err) => {
                setShowChart(false)
                toast.error(err);
            });
    }

    return (
        <>
            <Container>
                <Calendar
                    handleDashboard={handleDashboard}
                    showChart={showChart}
                    handleFetchDataOnDateChange={handleFetchDataOnDateChange}
                />
                {showChart && <Charts isChartLoading={isChartLoading} />}
            </Container>
        </>
    );
}
