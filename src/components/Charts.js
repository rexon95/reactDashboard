import React from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import Loader from './Spinner';
import { Col, Row, } from 'reactstrap';

export default function Charts({ isChartLoading }) {
    const { tableChartData, barChartData, pieChartData } = useSelector(
        (state) => state.dashboard
    );

    if (isChartLoading) {
        return <Loader />;
    }

    const tableOptions = {
        title: 'Table Data',
        curveType: 'function',
        legend: { position: 'bottom' },
        pageSize: 20,
    };

    const barOptions = {
        title: 'bar data',
        chartArea: { width: '60%' },
        hAxis: {
            title: 'Impressions_Offered',
            color : ['red']
            
        },
        vAxis: {
            title: 'PublisherId',
        },
    };
    const tableData = () => {
        const data = tableChartData?.map((item) => {
            return [item.publisherId, item.impressions_offered];
        });

        return [['PublisherId', 'Impressions_Offered'], ...data];
    };

    const barData = () => {
        const data = barChartData?.map((item) => {
            return [item.appSiteId, Number(item.impressions_offered)];
        });
        return [['AppsiteId', 'Impressions_Offered'], ...data];
    };

    const pieData = () => {
      const data = pieChartData?.map((item) => {
          return [item.advertiserId, Math.floor(Number(item.CM001_percent))];
      });
      console.log(data);
      return [['advertiserId', 'CM001_percent'], ...data];
  };

 const PieOptions = {
    title: "PieChart Data",
  };

    return (
        <>
            <Row className="mt-4">
                <Col className="col-md-4 mb-2">
                    <Chart
                        chartType="Table"
                        width="100%"
                        height="100%"
                        data={tableData()}
                        options={tableOptions}
                    />
                </Col>
                <Col className="col-md-4 mb-2">
                    <Chart
                        chartType="BarChart"
                        width="100%"
                        height="550px"
                        data={barData()}
                        options={barOptions}
                    />
                </Col>
                <Col className="col-md-4 mb-2">
                    <Chart
                        chartType="PieChart"
                        data={pieData()}
                        options={PieOptions}
                        width={'100%'}
                        height={'100%'}
                    />
                </Col>
            </Row>
        </>
    );
}
