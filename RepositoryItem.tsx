import {
	View,
	Text,
	Pressable,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';
import { useState } from 'react';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Edge } from './types';

type RepoItemProps = {
	repoItem: Edge;
	onItemClicked: (isStarred: boolean) => void;
};

export default function RepositoryItem(props: RepoItemProps) {
	const [isStarred, setIsStarred] = useState(
		props.repoItem.node.viewerHasStarred
	);

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row' }}>
				<Foundation name='book-bookmark' size={24} color='black' />
				<Text
					ellipsizeMode='tail'
					numberOfLines={1}
					style={{
						marginLeft: 5,
						overflow: 'hidden',
						width: '80%'
					}}>
					{props.repoItem.node.name}
				</Text>
			</View>
			<View>
				<Pressable
					onPress={() => {
						props.onItemClicked(!isStarred);
						setIsStarred((isStarred) => !isStarred);
					}}>
					<FontAwesome
						name={!isStarred ? 'star-o' : 'star'}
						size={24}
						color={!isStarred ? 'black' : 'yellow'}
					/>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		padding: 10,
		marginVertical: 10,
		borderRadius: 10,
	},
});
