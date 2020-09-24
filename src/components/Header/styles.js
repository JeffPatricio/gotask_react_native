import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  padding: 20px 10px;
`;

export const Title = styled.Text`
  align-self: center;
  text-align: center;
  font-size: 30px;
  font-family: 'Heebo-Bold';
  color: #30FF8D;
  padding-bottom: 30px;
`;

export const ButtonAdd = styled.TouchableOpacity`
  background-color: #30FF8D;
  height: 38px;
  width: 38px;
  z-index: 200;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  right: 10px;
`;

export const ContainerSelections = styled.View`
  align-self: stretch;
  height: 45px;
  background-color: #20282B;
  border-radius: 30px;
  flex-direction: row;
`;

export const ContainerItemSelection = styled.TouchableOpacity`
  flex: 1;
  border-radius: 30px;
  align-items: center;
  justify-content: center;

  ${props => props.isActive && css`
    background-color: #30FF8D;
  `}
`;

export const TextItemSelection = styled.Text`
  font-size: 18px;
  font-family: 'Heebo-Bold';
  color: #C1C3C2;

  ${props => props.isActive && css`
    color: #000;
  `}
`;