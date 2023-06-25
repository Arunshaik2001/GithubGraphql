import { useQuery } from '@apollo/client';
import { View, Image, Text, StyleSheet } from 'react-native';
import { readRepositories } from './GraphqlQueries';
import { Feather } from '@expo/vector-icons';

type ProfileProps = {
	imageUrl: string;
	name: string;
	userName: string;
	email: string;
	followersCount: number;
	followingCount: number;
	repositoryCount: number;
};

export default function Profile(props: ProfileProps) {

	return (
		<View>
			<View style={styles.profileContainer}>
				<Image
					source={{ uri: props.imageUrl.trim() }}
					style={styles.profileImage}
				/>
				<Text style={[styles.textStyle, { fontWeight: 'bold', fontSize: 20 }]}>
					{props.name}
				</Text>
				<Text style={styles.textStyle}>{props.userName}</Text>
				<View style={styles.profileEmail}>
					<Feather
						name='mail'
						size={24}
						color='white'
						style={{ marginRight: 5 }}
					/>
					<Text style={styles.textStyle}>{props.email}</Text>
				</View>
			</View>
			<View style={styles.detailsContainer}>
				<View style={styles.detailsColumn}>
					<Text style={styles.textStyle}>{props.followersCount}</Text>
					<Text style={styles.textStyle}>Followers</Text>
				</View>

				<View style={styles.detailsColumn}>
					<Text style={styles.textStyle}>{props.followingCount}</Text>
					<Text style={styles.textStyle}>Following</Text>
				</View>

				<View style={styles.detailsColumn}>
					<Text style={styles.textStyle}>{props.repositoryCount}</Text>
					<Text style={styles.textStyle}>Repositories</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	profileContainer: {
		marginVertical: 20,
		alignItems: 'center',
	},
	profileEmail: {
		flexDirection: 'row',
	},
	profileImage: {
		height: 60,
		width: 60,
		borderRadius: 30,
	},
	detailsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	detailsColumn: {
		alignItems: 'center',
	},
	textStyle: {
		color: 'white',
		fontSize: 15,
		marginBottom: 5,
	},
});
