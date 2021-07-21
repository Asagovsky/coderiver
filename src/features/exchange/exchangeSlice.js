import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRate } from "../../api/privatExchangeAPI";

const initialState = {
    rate: [],
    operationType: 'buy',
    rateId: 0,
    baseCurrency: null,
    targetCurrency: null,
    baseCurrencyValue: 1,
    targetCurrencyValue: 0,
    rateByOpertion: 0,
    loading: false,
    errors: false
}

export const getExchangeRate = createAsyncThunk(
    'exchangeRate/getExchangeRate',
    async () => {
        const data = await fetchRate();
        return data
    }
)

const rate = createSlice({
    name:'exchangeRate',
    initialState,
    reducers:{
        handleBaseValue: (state, {payload}) => {
            const value = payload < 0 ? 0.00 : payload
            state.baseCurrencyValue = value
            state.targetCurrencyValue = (value * state.rateByOpertion).toFixed(2)
        },
        handleTargetValue: (state, {payload}) => {
            const value = payload < 0 ? 0.00 : payload
            state.targetCurrencyValue = value
            state.baseCurrencyValue = (value / state.rateByOpertion).toFixed(2)
        },
        handleChangeRates: (state, {payload}) => {
            state.baseCurrency = state.rate[payload].base_ccy
            state.targetCurrency = state.rate[payload].ccy
            state.rateByOpertion = state.rate[payload][state.operationType]
            state.rateId = payload
            state.targetCurrencyValue = state.baseCurrencyValue * state.rateByOpertion
        },
        handleChangeOperationType: (state, {payload}) => {
            state.operationType = payload
            state.rateByOpertion = state.rate[state.rateId][payload]
            state.targetCurrencyValue = state.baseCurrencyValue * state.rateByOpertion
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getExchangeRate.pending, state => {
                state.loading = true;
            })
            .addCase(getExchangeRate.fulfilled, (state, {payload}) => {
                state.rate = payload;
                state.loading = false;
                state.baseCurrency = payload[state.rateId].base_ccy
                state.targetCurrency = payload[state.rateId].ccy
                state.targetCurrencyValue = state.baseCurrencyValue * payload[state.rateId][state.operationType]
                state.rateByOpertion = Number(payload[state.rateId][state.operationType])
            })
            .addCase(getExchangeRate.rejected, (state, {payload}) => {
                state.errors = payload;
                state.loading = false;
            })
    }
})

export const actions = rate.actions;

export const selectTargetCurrencyValue = state => state.exchangeRate.targetCurrencyValue
export const selectBaseCurrencyValue = state => state.exchangeRate.baseCurrencyValue
export const selectMappedRates = state => state.exchangeRate.rate.map((item, index) => ({ccy:item.ccy, base_ccy: item.base_ccy, id:index}))
export const selectOperationType = state => state.exchangeRate.operationType
export const selectRateId = state => state.exchangeRate.rateId
export const selectCurrencyNames = ({exchangeRate: {rate, rateId}}) => ({base: rate[rateId]?.base_ccy, target: rate[rateId]?.ccy})




export default rate.reducer;