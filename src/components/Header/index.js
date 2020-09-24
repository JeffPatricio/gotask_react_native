import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Title, ButtonAdd, ContainerSelections, ContainerItemSelection, TextItemSelection } from './styles';

const Header = ({ setShowAddForm, showInProgress, setShowInProgress }) => {
  return (
    <Container>
      <Title>GoTask</Title>
      <ButtonAdd onPress={() => setShowAddForm(true)}>
        <Icon name='add' size={30} color='#000' />
      </ButtonAdd>
      <ContainerSelections>
        <ContainerItemSelection isActive={showInProgress} onPress={() => setShowInProgress(true)}>
          <TextItemSelection isActive={showInProgress}>Em Andamento</TextItemSelection>
        </ContainerItemSelection>
        <ContainerItemSelection isActive={!showInProgress} onPress={() => setShowInProgress(false)}>
          <TextItemSelection isActive={!showInProgress}>Finalizadas</TextItemSelection>
        </ContainerItemSelection>
      </ContainerSelections>
    </Container>
  );
}

export default Header;