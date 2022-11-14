import { RootState } from '../store/store';

export const ticketDataSelector = (state: RootState) => {
  return state.ticket;
};
