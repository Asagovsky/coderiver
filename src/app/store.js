import { configureStore } from '@reduxjs/toolkit';
import rateReducer, { getExchangeRate } from '../features/exchange/exchangeSlice'

export const store = configureStore({
  reducer: {
    exchangeRate: rateReducer
  },
});

store.dispatch(getExchangeRate());
