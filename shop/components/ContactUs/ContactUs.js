import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';
import { IMLocalized } from '../../Core/localization/IMLocalization';

function ContactUs(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.body}>
        <View style={styles.labelView}>
          <Text style={styles.label}>{IMLocalized('CONTACT')}</Text>
        </View>
        <View style={styles.contentView}>
          <View style={styles.addressView}>
            <Text style={styles.text}>{IMLocalized('Our address')}</Text>
            <Text style={styles.textcaption}>
              {IMLocalized('1412 Steiner Street, San Francisco, CA, 94115')}
            </Text>
          </View>
          <View style={styles.itemView}>
            <Text style={styles.text}>E-mail us</Text>
            <Text style={styles.placeholderText}>
              {'office@shopertino.com >'}
            </Text>
          </View>
        </View>
        <View style={styles.captionView}>
          <Text style={styles.caption}>
            {IMLocalized(
              'Our business hours are Mon - Fri, 10am - 5pm, PST.\n',
            )}
          </Text>
        </View>
        <View style={styles.contentView}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${11234567890}`)}
            style={styles.itemButton}>
            <Text style={[styles.text, { color: '#384c8d' }]}>Call Us</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.labelView} />
      </ScrollView>
    </View>
  );
}

export default ContactUs;
