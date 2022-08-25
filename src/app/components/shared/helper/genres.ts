import {genres} from "../../../../assets/data/dataGenres";


export const  getGenres=(id: number) =>{
  return genres.filter(el => el.id === id).map(el => el.name)
}
