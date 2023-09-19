interface IMeasure {
  value: number
  unit: string
}
export interface IApi {
  id: string
  name: string
  tagline: string
  first_brewed: string
  description: string
  image_url: string
  abv: number
  ibu: number
  target_fg: number
  ebc: number
  srm: number
  ph: number
  attenuation_level: number
  volume: IMeasure
  boil_volume: IMeasure
  food_pairing: Array<string>
  brewers_tips: string
  contributed_by: string
  method: {
    mash_temp: [
      {
        temp: IMeasure
        duration: number
      }
    ]
    fermentation: {
      temp: IMeasure
    }
    twist: string
  }
  ingredients: {
    malt: Array<{ name: string; amount: IMeasure }>
    hops: Array<{
      name: string
      amount: IMeasure
      add: string
      attribute: string
    }>
    yeast: string
  }
}