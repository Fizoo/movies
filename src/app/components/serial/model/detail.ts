export interface DetailTV {
	backdrop_path: string;
	created_by: DetailTVCreated_by[];
	episode_run_time: number[];
	first_air_date: string;
	genres: DetailTVGenres[];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: DetailTVLast_episode_to_air;
	name: string;
	next_episode_to_air?: any;
	networks: DetailTVNetworks[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: DetailTVProduction_companies[];
	production_countries: DetailTVProduction_countries[];
	seasons: DetailTVSeasons[];
	spoken_languages: DetailTVSpoken_languages[];
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
}
export interface DetailTVCreated_by {
	id: number;
	credit_id: string;
	name: string;
	gender: number;
	profile_path: string;
}
export interface DetailTVGenres {
	id: number;
	name: string;
}
export interface DetailTVLast_episode_to_air {
	air_date: string;
	episode_number: number;
	id: number;
	name: string;
	overview: string;
	production_code: string;
	season_number: number;
	still_path: string;
	vote_average: number;
	vote_count: number;
}
export interface DetailTVNetworks {
	name: string;
	id: number;
	logo_path: string;
	origin_country: string;
}
export interface DetailTVProduction_companies {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}
export interface DetailTVProduction_countries {
	iso_3166_1: string;
	name: string;
}
export interface DetailTVSeasons {
	air_date: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
}
export interface DetailTVSpoken_languages {
	english_name: string;
	iso_639_1: string;
	name: string;
}
