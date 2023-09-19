import { createSlice } from '@reduxjs/toolkit'
import { IApi } from '../interfaces/Beer'

export interface IBeerState {
  beers: IApi[],
  loading: boolean;
}

const initialState: IBeerState = {
  beers: [],
  loading: false
}

const beersSlice = createSlice({
  name: 'beers',
  initialState,
  reducers: {
    setBeers: (state, action) => {
      state.beers = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { setBeers, setLoading } = beersSlice.actions
export default beersSlice.reducer
