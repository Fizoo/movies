
export interface RootObjectGenres {
	id: number;
	name: string;
}

export interface RootObject {
	poster_path?: any;
	adult: boolean;
	overview: string;
	release_date: string;
	genre_ids: number[];
	id: number;
	original_title: string;
	original_language: string;
	title: string;
	backdrop_path?: any;
	popularity: number;
	vote_count: number;
	video: boolean;
	vote_average: number;
}


export interface IGenres{
	id: number;
	name: string;
}


export interface IDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: RootObjectBelongs_to_collection;
  budget: number;
  genres: RootObjectGenres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: RootObjectProduction_companies[];
  production_countries: RootObjectProduction_countries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: RootObjectSpoken_languages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface RootObjectBelongs_to_collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}
export interface RootObjectGenres {
  id: number;
  name: string;
}
export interface RootObjectProduction_companies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface RootObjectProduction_countries {
  iso_3166_1: string;
  name: string;
}
export interface RootObjectSpoken_languages {
  english_name: string;
  iso_639_1: string;
  name: string;
}


