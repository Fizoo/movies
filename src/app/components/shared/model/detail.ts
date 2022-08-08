export interface IDetail {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection?: any;
	budget: number;
	genres: IDetailGenres[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path?: any;
	production_companies: IDetailProduction_companies[];
}
export interface IDetailGenres {
	id: number;
	name: string;
}
export interface IDetailProduction_companies {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}
