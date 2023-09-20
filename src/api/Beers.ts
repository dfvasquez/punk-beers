import axios, { AxiosError, AxiosResponse } from 'axios'
import { IApi } from '../interfaces/Beer'
import { constants } from '../utils/constants'

const BASE_URL = process.env.REACT_APP_API ?? ''

export const getAllBeers = (
  page: number,
  perPage: number = constants.perPage
): Promise<[] | IApi[]> => {
  const url = `${BASE_URL}?page=${page}&per_page=${perPage}`

  return axios
    .get(url)
    .then((response: AxiosResponse): Array<IApi> => response.data)
    .catch((error: AxiosError): [] => {
      console.log({ error })
      return []
    })
}

export const getBeersByName = (
  beerName: string,
  page: number,
  perPage: number = constants.perPage
): Promise<[] | IApi[]> => {
  const url = `${BASE_URL}?page=${page}&per_page=${perPage}&beer_name=${beerName}`

  return axios
    .get(url)
    .then((response: AxiosResponse): Array<IApi> => response.data)
    .catch((error: AxiosError): [] => {
      console.log({ error })
      return []
    })
}

export const getBeerById = (beerId: string): Promise<[] | IApi[]> => {
  const url = `${BASE_URL}?ids=${beerId}`

  return axios
    .get(url)
    .then((response: AxiosResponse): Array<IApi> => response.data)
    .catch((error: AxiosError): [] => {
      console.log({ error })
      return []
    })
}
