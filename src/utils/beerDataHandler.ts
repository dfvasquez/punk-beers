import { IBeer, IApi } from '../interfaces/Beer'

export const cleanBeersData = (beers: Array<IApi>): Array<IBeer> => {
  return beers.map((beer: IApi, _) => {
    const { id, name, description, image_url, abv, brewers_tips } = beer
    return { id, name, description, image_url, abv, brewers_tips }
  })
}
