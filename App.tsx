import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import GithubApolloProvider from './GithubClient';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchBar';

export default function App() {
	const [userName, setUserName] = useState('Arunshaik2001');

	return (
		<>
			<StatusBar style='light' />
			<SafeAreaView style={styles.container}>
				<GithubApolloProvider>
					<SearchScreen
						name={userName}
						onSearchChange={(text) => {
							setUserName(text);
						}}
					/>
					<HomeScreen userName={userName} />
				</GithubApolloProvider>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#673AB7',
		justifyContent: 'flex-start',
		paddingVertical: 50,
		paddingHorizontal: 30,
	},
});
