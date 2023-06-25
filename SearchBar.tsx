import { useState } from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';

type SearchBarProps = {
	name: String;
	onSearchChange: (text: String) => void;
};

export default function SearchScreen(props: SearchBarProps) {
	const [searchQuery, setSearchQuery] = useState(props.name);

	const handleSearch = (text: string) => {
		setSearchQuery(text);
		props.onSearchChange(text);
	};

	return (
		<View>
			<SearchBar
				placeholder='Search'
				onChangeText={handleSearch}
				value={searchQuery}
			/>
		</View>
	);
}
