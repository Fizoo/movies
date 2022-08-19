export interface Review {
	id: number;
	page: number;
	results: ReviewResults[];
	total_pages: number;
	total_results: number;
}
export interface ReviewResultsAuthor_details {
	name: string;
	username: string;
	avatar_path: string;
	rating?: any;
}
export interface ReviewResults {
	author: string;
	author_details: ReviewResultsAuthor_details;
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
}
