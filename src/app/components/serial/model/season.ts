export interface Season {
	_id: string;
	air_date: string;
	episodes: SeasonEpisodes[];
	name: string;
	overview: string;
	id: number;
	poster_path: string;
	season_number: number;
}
export interface SeasonEpisodesCrew {
	department: string;
	job: string;
	credit_id: string;
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
}
export interface SeasonEpisodesGuest_stars {
	credit_id: string;
	order: number;
	character: string;
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
}
export interface SeasonEpisodes {
	air_date: string;
	episode_number: number;
	crew: SeasonEpisodesCrew[];
	guest_stars: SeasonEpisodesGuest_stars[];
	id: number;
	name: string;
	overview: string;
	production_code: string;
	season_number: number;
	still_path: string;
	vote_average: number;
	vote_count: number;
}
