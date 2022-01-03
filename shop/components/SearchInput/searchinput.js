import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';
import AppStyles from '../../AppStyles';

function SearchInput(props) {
  const route = useRoute();
  const { onSearch, value, onChangeText, placeholder, onButtomPress } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <Image style={styles.inputIcon} source={AppStyles.iconSet.searchIcon} />
        <TextInput
          style={styles.inputText}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onSearch}
        />
      </View>
      <View style={styles.filterMenuArea}>
        <TouchableOpacity onPress={onButtomPress}>
          <Image
            style={styles.filterMenuAreaIcon}
            source={AppStyles.iconSet.menuIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default SearchInput;
