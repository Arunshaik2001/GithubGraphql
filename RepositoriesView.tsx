import { useMutation } from '@apollo/client';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { addStar, removeStar } from './GraphqlQueries';
import RepositoryItem from './RepositoryItem';
import { Edge } from './types';

type RepositoriesProps = {
	repositores: Array<Edge>;
	onFetchMore: () => void;
};

export default function RepositoriesListView(props: RepositoriesProps) {
	const [addStarQuery] = useMutation(addStar);
	const [removeStarQuery] = useMutation(removeStar);

	return (
		<View style={styles.repoContainer}>
			<Text style={styles.titleText}>All Repositories</Text>
			{props.repositores.length == 0 && (
				<View
					style={{
						height: '100%',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Text style={{ fontSize: 20, color: 'white' }}>No Repositories Found</Text>
				</View>
			)}
			{props.repositores.length > 0 && (
				<FlatList
					horizontal={false}
					data={props.repositores}
					keyExtractor={(item, index) => {
						return item.node.id + index;
					}}
					renderItem={({ item }) => {
						return (
							<RepositoryItem
								repoItem={item}
								onItemClicked={(isStarred) => {
									if (isStarred) {
										addStarQuery({
											variables: { starrableId: item.node.id },
										});
									} else {
										removeStarQuery({
											variables: { starrableId: item.node.id },
										});
									}
								}}
							/>
						);
					}}
					onEndReached={() => {
						props.onFetchMore();
					}}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	repoContainer: {
		marginTop: 10,
		flex: 1,
	},
	titleText: {
		color: 'white',
		fontSize: 30,
		fontWeight: 'bold',
	},
});
