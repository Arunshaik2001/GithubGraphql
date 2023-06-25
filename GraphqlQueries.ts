import { gql } from '@apollo/client';

export const readRepositories = gql`
	query GithubGraphQL($login: String!, $cursor: String) {
		user(login: $login) {
			avatarUrl(size: 200)
			name
			email
			login
			repositories(first: 10, after: $cursor) {
				pageInfo {
					endCursor
					startCursor
					hasNextPage
				}
				totalCount
				edges {
					node {
						id
						name
						viewerHasStarred
					}
				}
			}
			followers {
				totalCount
			}
			following {
				totalCount
			}
		}
	}
`;

export const addStar = gql`
	mutation AddStar($starrableId: ID!) {
		addStar(input: { starrableId: $starrableId }) {
			starrable {
				viewerHasStarred
			}
		}
	}
`;

export const removeStar = gql`
	mutation RemoveStar($starrableId: ID!) {
		removeStar(input: { starrableId: $starrableId }) {
			starrable {
				viewerHasStarred
			}
		}
	}
`;
