import axios, { AxiosError, AxiosResponse } from 'axios'
import { IApi } from '../interfaces/Beer'

const BASE_URL = process.env.REACT_APP_API ?? ''

export const getAllBeers = (): Promise<[] | IApi[]> => {
  const url = `${BASE_URL}s?per_page=15`

  return axios
    .get(url)
    .then((response: AxiosResponse): Array<IApi> => response.data)
    .catch((error: AxiosError): [] => {
      console.log({ error })
      return []
    })
}

export const getBeersByName = (beerName: string): Promise<[] | IApi[]> => {
  const url = `${BASE_URL}?beer_name=${beerName}`

  return axios
    .get(url)
    .then((response: AxiosResponse): Array<IApi> => response.data)
    .catch((error: AxiosError): [] => {
      console.log({ error })
      return []
    })
}
