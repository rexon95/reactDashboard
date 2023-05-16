import React, { useEffect, useState } from 'react'
import { Button, Col, Label, Row } from 'reactstrap'
import DatePicker from "react-datepicker";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Calendar( {handleDashboard, showChart, handleFetchDataOnDateChange}) {
    const { startDate, endDate } = useSelector((state)=> state.dashboard)

    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)

    const navigate = useNavigate()


    useEffect(()=>{
        setSelectedStartDate(startDate)
        setSelectedEndDate(endDate)
    },[startDate, endDate])
 

    const handleLogout = () => {
        localStorage.clear()
        navigate('/') 
        toast.success("logged out successfully.")      
    }

    const handleStartDate = (date) => {
      setSelectedStartDate(date)
      handleFetchDataOnDateChange('startDate', date)
    }

    const handleEndDate = (date) => {
      setSelectedEndDate(date)
      handleFetchDataOnDateChange('endDate', date)
    }
    const oneDayAhead = () => {
      if(selectedStartDate){
      const date = selectedStartDate.getTime() + 86400000;
       return new Date(date)
      }
    }
  return (
    <>
    <Row className='d-flex justify-content-center mt-2'>
        <Col className='col-md-4'>
           <h3>Date Range Selection</h3>
           <Label>startDate</Label><DatePicker  className='mb-2' selected={selectedStartDate} minDate={startDate} disabled={!showChart} onChange={(date)=>{handleStartDate(date)}}/>
           <Label>endDate</Label><DatePicker  selected={selectedEndDate} maxDate={endDate} minDate={oneDayAhead()} disabled={!showChart} onChange={(date)=>{handleEndDate(date)}}/>
           {!showChart ? <Button type='submit' className='btn btn-danger mt-3' onClick={()=>{handleDashboard('view')}}>VIEW DASHBOARD</Button> :
           <Button type='submit' className='btn btn-danger mt-3' onClick={()=>{handleDashboard('hide')}}>HIDE DASHBOARD</Button>}
           <Button type='submit' className='btn btn-warning mt-3 mx-2' onClick={handleLogout}>Logout</Button><br/>
           <span><b>NOTE : dates can only be changed once you view dashboard.</b></span>
        </Col>
    </Row>
    </>
  )
}
