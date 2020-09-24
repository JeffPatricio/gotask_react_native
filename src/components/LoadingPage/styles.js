import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background: #111619;
  align-items: center;
  justify-content: center;
`;

export const Title = styled(Animated.Text)`
  align-self: center;
  text-align: center;
  font-size: 35px;
  font-family: 'Heebo-Bold';
  color: #30FF8D;
`;