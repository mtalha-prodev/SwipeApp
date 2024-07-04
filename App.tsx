import React, {useState} from 'react';
import {Text, Animated, Dimensions} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

const {width} = Dimensions.get('screen');

const SwipeListExample = () => {
  const cartData = [
    {key: '1', text: 'Item 1'},
    {key: '2', text: 'Item 2'},
    {key: '3', text: 'Item 3'},
    {key: '4', text: 'Item 4'},
    {key: '5', text: 'Item 5'},
  ];

  const [list, setList] = useState(cartData);
  const [bgColor, setBgColor] = useState('');

  const onSwipeValue = (swipeData: any) => {
    const {key, value} = swipeData;
    if (value > 1) {
      setBgColor('blue');
    } else {
      setBgColor('red');
    }

    if (value < -width / 2) {
      const newData = list.filter(item => item.key !== key);
      setList(newData);
    } else if (value > width / 2) {
      const newData = [...list];
      const index = newData.findIndex(item => item.key === key);
      const item = newData.splice(index, 1)[0];
      newData.unshift(item);
      setList(newData);
    }
  };

  const renderItem = (data: any) => (
    <Animated.View
      style={{
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 80,
        marginVertical: 5,
      }}>
      <Text style={{color: 'black'}}>{data.item.text}</Text>
    </Animated.View>
  );
  const renderHiddenItem = () => {
    return (
      <Animated.View
        style={{
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 80,
          padding: 15,
          backgroundColor: bgColor,
          marginVertical: 5,
        }}>
        <Text style={{color: 'white'}}>pin</Text>
        <Text style={{color: 'white'}}>delete</Text>
      </Animated.View>
    );
  };

  return (
    <SwipeListView
      data={list}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      disableRightSwipe={false}
      disableLeftSwipe={false}
      swipeToOpenPercent={50}
      onSwipeValueChange={onSwipeValue}
    />
  );
};

export default SwipeListExample;
