import {
	ApolloClient,
	InMemoryCache,
	ApolloLink,
	HttpLink,
	ApolloProvider,
} from '@apollo/client';
import React, { ReactNode } from 'react';

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' });

// Create an ApolloLink middleware
const authLink = new ApolloLink((operation, forward) => {
	// Get the token from your token storage (e.g., AsyncStorage)
	const token = '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';

	// Add the Authorization header to the operation
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : '',
		},
	}));

	return forward(operation);
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
	defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
});

type props = {
	children: ReactNode;
};

export default function GithubApolloProvider({ children }: props) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
