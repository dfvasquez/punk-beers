import { createSlice } from '@reduxjs/toolkit'
import { IApi } from '../interfaces/Beer'

export interface IBeerState {
  beers: IApi[]
  beersSearch: string
  page: number
  beersPerPage: number
  totalPages: number
  loading: boolean
}

const initialState: IBeerState = {
  beers: [],
  beersSearch: '',
  page: 1,
  beersPerPage: 9,
  totalPages: 1,
  loading: false
}

const beersSlice = createSlice({
  name: 'beers',
  initialState,
  reducers: {
    setBeers: (state, action) => {
      state.beers = action.payload
    },
    setBeersSearch: (state, action) => {
      state.beersSearch = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setTotalPages: (state, action) => {
      state.totalPages = Math.ceil(action.payload.length / state.beersPerPage)
    },
    setMoreBeers: (state, action) => {
      state.beers = [...state.beers, ...action.payload]
    },
    setSorted: (state, action) => {
      state.beers = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const {
  setBeers,
  setBeersSearch,
  setPage,
  setTotalPages,
  setMoreBeers,
  setSorted,
  setLoading
} = beersSlice.actions
export default beersSlice.reducer
