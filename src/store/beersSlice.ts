import { createSlice } from '@reduxjs/toolkit'
import { IApi } from '../interfaces/Beer'

export interface IBeerState {
  beers: IApi[]
}

const initialState: IBeerState = {
  beers: []
}

const beersSlice = createSlice({
  name: 'beers',
  initialState,
  reducers: {
    setBeers: (state, action) => {
      state.beers = action.payload
    }
  }
})

export const { setBeers } = beersSlice.actions
export default beersSlice.reducer
