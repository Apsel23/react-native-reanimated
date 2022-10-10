import React, {Component, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {json} from '../data/jsonData';

const Item = ({data}) => (
  <View style={styles.item}>
    <View style={styles.row}>
      <Text style={styles.title}>Video Name:</Text>
      <Text style={styles.title}>{data.videoName}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.title}>Video Description:</Text>
      <Text style={styles.title}>{data.videodescription}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.title}>Url:</Text>
      <Text style={styles.title}>{data.VideoURL}</Text>
    </View>
  </View>
);

const SectionScreen = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const uniqueTitle = Array.from(new Set(json.map(a => a.categoryName))).map(
      categoryName => {
        let temp = {
          title: categoryName,
          data: json.filter(item => item.categoryName === categoryName),
        };
        return temp;
      },
    );
    setdata(uniqueTitle);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item data={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: '#8979c7',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    //   justifyContent:'center'
  },
});

export default SectionScreen;
