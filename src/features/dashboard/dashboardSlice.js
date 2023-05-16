import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils';
import dashboardService from './dashboardService';

const initialState = {
    isLoading: false,
    isSuccess: false,
    startDate: '',
    endDate: '',
    tableChartData:[],
    barChartData:[],
    pieChartData:[]
};

export const getDateRange = createAsyncThunk(
    'dashboard/daterange',
    async (data, thunkAPI) => {
        try {
            return await dashboardService.dateRange(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error));
        }
    }
);

export const getCharts = createAsyncThunk(
    'dashboard/getCharts',
    async (data, thunkAPI) => {
        try {
            return await dashboardService.fetchCharts(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error));
        }
    }
);

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDateRange.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDateRange.fulfilled, (state, action) => {
                const { startDate, endDate } = action.payload.result;
                state.isLoading = false;
                state.isSuccess = true;
                state.startDate = new Date(Number(startDate));
                state.endDate = new Date(Number(endDate));
            })
            .addCase(getDateRange.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
            })
            .addCase(getCharts.pending, (state) => {
                state.isChartLoading = true;
            })
            .addCase(getCharts.fulfilled, (state, action) => {
              const [{
                data : { result : tableData} = {}
              }, {
                data : {result: barData} = {}
              }, {
                data : {result: pieData} = {}
              }] = action.payload
                state.isChartLoading = false;
                state.tableChartData = tableData.data
                state.barChartData = barData.data
                state.pieChartData = pieData.data
            })
            .addCase(getCharts.rejected, (state, action) => {
                state.isChartLoading = false;
            });
    },
});

export default dashboardSlice.reducer;
