import axios, { AxiosResponse } from 'axios'
import { IApi } from '../interfaces/Beer'

const BASE_URL = process.env.REACT_APP_API ?? ''

export const getAllBeers = () => {
  const url = `${BASE_URL}?per_page=15`

  return axios
    .get(url)
    .then((response: AxiosResponse): Array<IApi> => response.data)
    .catch((error) => [])
}

export const getFilteredBeers = (beerName: string) => {
  const url = `${BASE_URL}?beer_name=${beerName}`

  return axios
    .get(url)
    .then((response: AxiosResponse): Array<IApi> => response.data)
    .catch((error) => [])
}

export const getFilteredBeersPro = (
  beerName: string,
  abvFrom: number,
  abvTo: number,
  ibuFrom: number,
  ibuTo: number
) => {
  const url = `${BASE_URL}?beer_name=${beerName}&abv_gt=${abvFrom}&abv_lt=${abvTo}&ibu_gt=${ibuFrom}&ibu_lt=${ibuTo}`

  return axios
    .get(url)
    .then((response: AxiosResponse): Array<IApi> => response.data)
    .catch((error) => [])
}
