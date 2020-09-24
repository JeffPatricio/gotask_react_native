import React, { memo, useState } from 'react';
import { ToastAndroid, ActivityIndicator } from 'react-native';
import api from '../../services/api';
import { useAuth } from '../../hooks/AuthProvider';
import { Container, ContainerModal, ContentModal, Title, Button, ContainerButtons, TextButton, Description } from './styles';

const DeleteTask = ({ refreshList, task, modalVisible, setDeleteTask }) => {

  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);

  const deleteTask = async () => {
    if (loading) return;
    setLoading(true);
    const { data } = await api.delete('tasks/' + task.id, { headers: { UserId: userId }, });
    if (data.success) {
      ToastAndroid.show('Tarefa excluída com sucesso', 1000);
      setDeleteTask(null);
      refreshList();
      refreshList(true);
      return setLoading(false);
    }
    ToastAndroid.show('Ocorreu um erro ao excluir a tarefa', 3000);
    setLoading(false);
  }

  return (
    <Container transparent={true} animated animationType='slide' visible={modalVisible}>
      <ContainerModal>
        <ContentModal>
          <Title>Ops...</Title>
          <Description>Deseja realmente excluir a nota: <Description colorGreen>"{task.description}"</Description>?</Description>
          <ContainerButtons>
            <Button onPress={() => setDeleteTask(null)}>
              <TextButton>Cancelar</TextButton>
            </Button>
            <Button styleSubmit onPress={deleteTask}>
              {!loading && <TextButton>Sim</TextButton>}
              {loading && <ActivityIndicator color="#111619" size={20} />}
            </Button>
          </ContainerButtons>
        </ContentModal>
      </ContainerModal>
    </Container>
  );
}

export default memo(DeleteTask);