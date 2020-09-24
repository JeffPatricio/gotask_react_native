import React, { useState, memo } from 'react';
import { ActivityIndicator, ToastAndroid } from 'react-native';
import api from '../../services/api';
import { useAuth } from '../../hooks/AuthProvider';
import { Keyboard } from 'react-native';
import { Container, ContainerModal, ContentModal, Title, Input, Button, ContainerButtons, TextButton } from './styles';

const AddTask = ({ refreshList, modalVisible, setShowAddForm }) => {

  const { userId } = useAuth();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const submitTask = async () => {
    if (loading || !description) return;
    setLoading(true);
    const { data } = await api.post('tasks', { description }, { headers: { UserId: userId } });
    if (data.success) {
      ToastAndroid.show('Tarefa adicionada com sucesso', 1000);
      setShowAddForm(false);
      refreshList();
      setDescription('');
      return setLoading(false);
    }
    ToastAndroid.show('Ocorreu um erro ao adicionar a tarefa', 3000);
    setLoading(false);
  }

  return (
    <Container transparent={true} animated animationType='slide' visible={modalVisible}>
      <ContainerModal>
        <ContentModal>
          <Title>Nova Tarefa</Title>
          <Input
            value={description}
            onChangeText={text => setDescription(text)}
            placeholder='Digite aqui a sua tarefa...'
            returnKeyType='done'
            blurOnSubmit={true}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <ContainerButtons>
            <Button onPress={() => setShowAddForm(false)}>
              <TextButton>Cancelar</TextButton>
            </Button>
            <Button styleSubmit onPress={submitTask}>
              {!loading && <TextButton>Adicionar</TextButton>}
              {loading && <ActivityIndicator color="#111619" size={20} />}
            </Button>
          </ContainerButtons>
        </ContentModal>
      </ContainerModal>
    </Container>
  );
}

export default memo(AddTask);