import axios from 'axios'


const API = axios.create({
    baseURL: 'https://sigviewauth.sigmoid.io',
    timeout: 999999,
    headers: {
        'Content-Type': 'application/json',
        // "x-auth-token" : JSON.parse(localStorage.getItem('token'))
    },
  });
  

const dateRange = async (data) => {
    const response = await API.post('/api/v1/getDateRange',data, {
      headers: { 'x-auth-token': JSON.parse(localStorage.getItem('token')) },
  })
    return response.data
  }

  const fetchCharts = async (data) => {
       const {tableChartPayoad, barChartPayoad, pieChartPayoad} = data
       const url = '/api/v1/getData'
       const tableChartApi = API.post(url, tableChartPayoad, {
        headers: { 'x-auth-token': JSON.parse(localStorage.getItem('token')) },
    })
       const barChartApi = API.post(url, barChartPayoad,{
        headers: { 'x-auth-token': JSON.parse(localStorage.getItem('token')) },
    })
       const pieChartApi = API.post(url, pieChartPayoad,{
        headers: { 'x-auth-token': JSON.parse(localStorage.getItem('token')) },
    })
       const response = await Promise.all([tableChartApi, barChartApi, pieChartApi])
       return response
  }



const dashboardService = {
    dateRange,
    fetchCharts
  }
  
  export default dashboardService