import styled, { css } from 'styled-components/native';

export const Container = styled.Modal`
`;

export const ContainerModal = styled.View`
  flex: 1;
  background-color: rgba(17,22,25,0.9);
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

export const ContentModal = styled.View`
  padding: 20px 15px;
  background-color: #20282B;
  border-radius: 30px;
  align-self: stretch;
`;

export const Title = styled.Text`
  align-self: center;
  text-align: center;
  font-size: 22px;
  font-family: 'Heebo-Bold';
  color: #30FF8D;
  padding-bottom: 30px;
`;

export const Description = styled.Text`
  align-self: center;
  text-align: center;
  font-size: 16px;
  font-family: 'Heebo-Bold';
  color: #C1C3C2;

  ${props => props.colorGreen && css`
    color: #30FF8D;
  `}
`;

export const ContainerButtons = styled.View`
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-top: 30px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #C1C3C2;
  height: 38px;
  min-width: 100px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;

  ${props => props.styleSubmit && css`
    background-color: #30FF8D;
    margin-left: 10px;
  `}
`;

export const TextButton = styled.Text`
  font-size: 16px;
  font-family: 'Heebo-Bold';
  color: #111619;
`;