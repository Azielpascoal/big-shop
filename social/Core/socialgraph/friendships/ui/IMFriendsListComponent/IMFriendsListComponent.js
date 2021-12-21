import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector, ReactReduxContext } from 'react-redux';

import PropTypes from 'prop-types';
import { IMFriendItem } from '../..';
import { IMUserSearchModal } from '../..';
import { SearchBarAlternate } from '../../../..';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { IMLocalized } from '../../../../localization/IMLocalization';
import {
  TNEmptyStateView,
  TNActivityIndicator,
} from '../../../../truly-native';
import SearchBar from '../../../../ui/SearchBar/SearchBar';

function IMFriendsListComponent(props) {
  const {
    containerStyle,
    onFriendAction,
    friendsData,
    onFriendItemPress,
    displayActions,
    appStyles,
    isLoading,
    followEnabled,
    viewer,
    searchBar,
    onSearchBarPress,
    emptyStateConfig,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const reduxUsers = useSelector((state) => state.users.users);
  const friendships = useSelector((state) => state.friends.friendships);

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (reduxUsers) {
      updateFilteredFriendships();
    }
  }, [reduxUsers]);

  useEffect(() => {
    if (friendships) {
      updateFilteredFriendships();
    }
  }, [friendships]);

  const renderItem = ({ item }) => (
    <IMFriendItem
      onFriendItemPress={onFriendItemPress}
      item={item}
      onFriendAction={onFriendAction}
      displayActions={displayActions && item.user.id != viewer.id}
      appStyles={appStyles}
      followEnabled={followEnabled}
    />
  );

  const updateFilteredFriendships = (filteringKeyword = keyword) => {
    if (reduxUsers == null || friendships == null) {
      return;
    }
    const filteredFriendships = filteredNonFriendshipsFromUsers(
      filteringKeyword,
      reduxUsers.filter((user) => user.id != currentUser?.id),
      friendships,
    ).splice(0, 25); // Show only 25 results at a time
  };

  const onSearchTextChange = (text) => {
    setKeyword(text.trim());
    updateFilteredFriendships(text.trim());
  };

  const onSearchClear = () => {
    setKeyword('');
  };

  const renderListHeader = () => (
    <SearchBar
      onChangeText={onSearchTextChange}
      onSearchClear={onSearchClear}
      appStyles={appStyles}
    />
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {searchBar && (
        <SearchBarAlternate
          onPress={onSearchBarPress}
          placeholderTitle={IMLocalized('Search for friends')}
          appStyles={appStyles}
        />
      )}
      <SearchBar appStyles={appStyles} onChangeText={() => {}} />
      {friendsData && friendsData.length > 0 && (
        <View style={{ flex: 1 }}>
          <FlatList
            numColumns={3}
            horizontal={false}
            data={friendsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.user.id}
          />
        </View>
      )}
      {!friendsData ||
        (friendsData.length <= 0 && (
          <View style={styles.emptyViewContainer}>
            <TNEmptyStateView
              emptyStateConfig={emptyStateConfig}
              appStyles={appStyles}
            />
          </View>
        ))}
      {(isLoading || friendsData == null) && (
        <TNActivityIndicator appStyles={appStyles} />
      )}
    </View>
  );
}

IMFriendsListComponent.propTypes = {
  onCommentPress: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  actionIcon: PropTypes.bool,
  searchBar: PropTypes.bool,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  friendsData: PropTypes.array,
  onSearchBarPress: PropTypes.func,
  searchData: PropTypes.array,
  onSearchTextChange: PropTypes.func,
  isSearchModalOpen: PropTypes.bool,
  onSearchModalClose: PropTypes.func,
  onSearchClear: PropTypes.func,
};

export default IMFriendsListComponent;
