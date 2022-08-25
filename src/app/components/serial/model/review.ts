export interface ReviewTV {
	id: number;
	page: number;
	results: ReviewTVResults[];
	total_pages: number;
	total_results: number;
}
export interface ReviewTVResultsAuthor_details {
	name: string;
	username: string;
	avatar_path: string;
	rating: number;
}
export interface ReviewTVResults {
	author: string;
	author_details: ReviewTVResultsAuthor_details;
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
}
