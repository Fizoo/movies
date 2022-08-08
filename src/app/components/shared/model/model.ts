export interface IResponse {
  page: number
  results: RootObject[]
  total_pages: number
  total_results: number
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


