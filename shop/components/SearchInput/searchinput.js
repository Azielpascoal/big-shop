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
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <Image style={styles.inputIcon} />
        <TextInput style={styles.inputText} placeholder="write here !" />
      </View>
      <View style={styles.filterMenuArea}>
        <TouchableOpacity>
          <Image style={styles.filterMenuAreaIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default SearchInput;
