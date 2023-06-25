export interface Root {
	user: User;
}

export interface User {
	__typename: string;
	avatarUrl: string;
	name: string;
	email: string;
	login: string;
	repositories: Repositories;
	followers: Followers;
	following: Following;
}

export interface Repositories {
	__typename: string;
	pageInfo: PageInfo;
	totalCount: number;
	edges: Edge[];
}

export interface PageInfo {
	__typename: string;
	endCursor: string;
	startCursor: string;
	hasNextPage: boolean;
}

export interface Edge {
	__typename: string;
	node: Node;
}

export interface Node {
	__typename: string;
	id: string;
	name: string;
	viewerHasStarred: boolean;
}

export interface Followers {
	__typename: string;
	totalCount: number;
}

export interface Following {
	__typename: string;
	totalCount: number;
}
