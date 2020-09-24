import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #111619;
`;

export const ContainerLoading = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ContainerEmpty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TextEmpty = styled.Text`
  align-self: center;
  text-align: center;
  font-size: 16px;
  font-family: 'Heebo-Bold';
  color: #c1c3c2;
`;

export const List = styled.FlatList`
  flex: 1;
  padding: 0 8px;
`;

export const ContainerTask = styled.View`
  width: 50%;
  align-items: center;
  border-radius: 30px;
  background: #20282b;
  margin: 2px;
`;

export const RowActionsTask = styled.View`
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Description = styled.Text`
  font-size: 14px;
  font-family: 'Heebo-Bold';
  color: #c1c3c2;
  padding: 15px;
`;

export const Press = styled.TouchableOpacity`
 padding: 5px 15px 15px;
`;