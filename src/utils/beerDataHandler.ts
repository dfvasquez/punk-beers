import { IApi } from '../interfaces/Beer'

export const sortByName = (beers: IApi[]) => {
  beers.sort((beer1, beer2) => {
    if (beer1.name < beer2.name) return -1
    if (beer1.name > beer2.name) return 1
    return 0
  })
  return beers
}

export const sortByAbv = (beers: IApi[]) => {
  beers.sort((beer1, beer2) => {
    if (beer1.abv < beer2.abv) return -1
    if (beer1.abv > beer2.abv) return 1
    return 0
  })
  return beers
}

export const sortByIbu = (beers: IApi[]) => {
  beers.sort((beer1, beer2) => {
    if (beer1.ibu < beer2.ibu) return -1
    if (beer1.ibu > beer2.ibu) return 1
    return 0
  })
  return beers
}

export const sortById = (beers: IApi[]) => {
  beers.sort((beer1, beer2) => {
    if (beer1.id < beer2.id) return -1
    if (beer1.id > beer2.id) return 1
    return 0
  })
  return beers
}

export const sortBeers = (beers: IApi[], criteria: string) => {
  let sorted = [...beers]
  if (criteria === 'name') {
    sorted = sortByName(sorted)
  } else if (criteria === 'abv') {
    sorted = sortByAbv(sorted)
  } else if (criteria === 'ibu') {
    sorted = sortByIbu(sorted)
  } else {
    sorted = sortById(sorted)
  }
  return sorted
}

export const sliceBeers = (
  beers: IApi[],
  currentPage: number,
  beersPerPage: number
) => {
  return beers.slice(
    (currentPage - 1) * beersPerPage,
    (currentPage - 1) * beersPerPage + beersPerPage
  )
}
