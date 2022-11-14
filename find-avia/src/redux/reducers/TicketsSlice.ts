import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TicketDataType } from '../../utils/types';

const initialState: TicketDataType = {
  departureCity: '',
  arrivalCity: '',
  departureDate: '',
  returnDate: '',
  isRoundTrip: false,
};

const TicketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    changeFlightData(state, action: PayloadAction<TicketDataType>) {
      const { departureCity, arrivalCity, departureDate, returnDate, isRoundTrip } = action.payload;

      state.departureCity = departureCity;
      state.arrivalCity = arrivalCity;
      state.departureDate = departureDate;
      state.returnDate = returnDate;
      state.isRoundTrip = isRoundTrip;
    },
  },
});

export const ticketReducer = TicketSlice.reducer;
export const { changeFlightData } = TicketSlice.actions;
