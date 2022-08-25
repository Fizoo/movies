export interface CreditsTV {
	cast: CreditsTVCast[];
	crew: CreditsTVCrew[];
	id: number;
}
export interface CreditsTVCast {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	character: string;
	credit_id: string;
	order: number;
}
export interface CreditsTVCrew {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path?: any;
	credit_id: string;
	department: string;
	job: string;
}
