import axios, { AxiosResponse } from 'axios'
import { IApi } from '../interfaces/Beer'

const BASE_URL = process.env.REACT_APP_API ?? ''

export const getAllBeers = () => {
  return axios
    .get(BASE_URL)
    .then((response: AxiosResponse): Array<IApi> => response.data)
    .catch((error) => [])
}
