import React, { useEffect } from 'react';
import { Animated } from 'react-native';
import { Container, Title } from './styles';

const LoadingPage = () => {

  const fadeOpacity = new Animated.Value(0);

  const fadeIn = () => {
    Animated.timing(fadeOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false
    }).start(({ finished }) => {
      if (finished) fadeOut();
    });
  }

  const fadeOut = () => {
    Animated.timing(fadeOpacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false
    }).start(({ finished }) => {
      if (finished) fadeIn();
    });
  }

  useEffect(() => {
    fadeIn();
  });

  return (
    <Container>
      <Title style={{ opacity: fadeOpacity }}>GoTask</Title>
    </Container>
  );
}

export default LoadingPage;