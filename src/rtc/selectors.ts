import { RootState } from '../store';

export const getDataChannel = (state: RootState) => state.network.channel;
