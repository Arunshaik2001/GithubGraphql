import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { readRepositories } from './GraphqlQueries';
import Profile from './Profile';
import RepositoriesListView from './RepositoriesView';
import { Root, User } from './types';

type Props = {
	userName: string;
};

export default function HomeScreen(props: Props) {
	const { loading, error, data, fetchMore } = useQuery(readRepositories, {
		variables: { login: props.userName },
	});

	if (loading || error) {
		return (
			<Text
				style={{
					flex: 1,
					textAlign: 'center',
					textAlignVertical: 'center',
					fontSize: 40,
					color: 'white',
				}}>
				{`Loading... ${error ?? ''}`}
			</Text>
		);
	}

	const profileData: User = JSON.parse(JSON.stringify(data['user']));

	return (
		<>
			<Profile
				imageUrl={profileData.avatarUrl}
				userName={profileData.login}
				email={profileData.email}
				name={profileData.name}
				repositoryCount={profileData.repositories.totalCount}
				followersCount={profileData.followers.totalCount}
				followingCount={profileData.following.totalCount}
			/>
			<RepositoriesListView
				repositores={profileData.repositories.edges}
				onFetchMore={() => {
					if (
						profileData.repositories.totalCount >=
						profileData.repositories.edges.length
					) {
						fetchMore({
							variables: {
								cursor: profileData.repositories.pageInfo.endCursor,
							},
							updateQuery: (previousResult, { fetchMoreResult, variables }) => {
								const repos = [
									...previousResult['user']['repositories']['edges'],
									...fetchMoreResult['user']['repositories']['edges'],
								];

								fetchMoreResult['user']['repositories']['edges'] = repos;

								return fetchMoreResult;
							},
						});
					}
				}}
			/>
		</>
	);
}
