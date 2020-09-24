import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { ActivityIndicator, ToastAndroid, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../hooks/AuthProvider';
import Header from '../../components/Header';
import AddTask from '../../components/AddTask';
import DeleteTask from '../../components/DeleteTask';
import {
  Container, ContainerLoading, TextEmpty, ContainerEmpty, List, ContainerTask, Description, RowActionsTask,
  Press
} from './styles';
import api from '../../services/api';

const Home = () => {

  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteTask, setDeleteTask] = useState(null);
  const [showInProgress, setShowInProgress] = useState(true);

  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [tasksFinalizeds, setTasksFinalizeds] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const inProgress = await apiGetTasks();
        const finalizeds = await apiGetTasks(true);
        setTasksInProgress(inProgress);
        setTasksFinalizeds(finalizeds);
        setLoading(false);
      } catch (e) {
        ToastAndroid.show('Ocorreu um erro ao buscar a lista de tarefas', 3000);
      }
    })();
  }, []);

  const apiGetTasks = useCallback(async (finalizeds = false) => {
    const { data } = await api.get('tasks?closed=' + finalizeds, { headers: { UserId: userId } });
    return data.tasks || [];
  }, []);

  const refreshList = useCallback(async (finalizeds = false) => {
    try {
      const listToRefresh = finalizeds ? 'finalizeds' : 'inProgress';
      setRefreshing(listToRefresh);
      const tasks = await apiGetTasks(finalizeds);
      finalizeds ? setTasksFinalizeds(tasks) : setTasksInProgress(tasks);
      setRefreshing('');
    } catch (e) {
      ToastAndroid.show('Ocorreu um erro ao atualizar a lista de tarefas', 3000);
      setRefreshing('');
    }
  }, []);

  const closeTask = useCallback(async (taskId) => {
    const { data } = await api.patch('tasks/' + taskId, { closed: true }, { headers: { UserId: userId } });
    if (data.success) {
      ToastAndroid.show('Tarefa finalizada com sucesso', 1000);
      await refreshList();
      return refreshList(true);
    }
    ToastAndroid.show('Ocorreu um erro ao finalizar a tarefa', 3000);
  }, []);

  const openTask = useCallback(async (taskId) => {
    const { data } = await api.patch('tasks/' + taskId, { closed: false }, { headers: { UserId: userId } });
    if (data.success) {
      ToastAndroid.show('Tarefa aberta com sucesso', 1000);
      await refreshList(true);
      return refreshList();
    }
    ToastAndroid.show('Ocorreu um erro ao abrir a tarefa', 3000);
  }, []);

  return (
    <Container>
      <AddTask
        modalVisible={showAddForm}
        setShowAddForm={setShowAddForm}
        refreshList={refreshList}
      />
      <DeleteTask
        task={deleteTask || {}}
        modalVisible={!!deleteTask}
        setDeleteTask={setDeleteTask}
        refreshList={refreshList}
      />
      <Header
        setShowAddForm={setShowAddForm}
        showInProgress={showInProgress}
        setShowInProgress={setShowInProgress}
      />
      {
        (loading) &&
        <ContainerLoading>
          <ActivityIndicator color='#30FF8D' size={40} />
        </ContainerLoading>
      }
      {
        (!loading && showInProgress) &&
        <Fragment>
          {
            (!tasksInProgress.length) &&
            <ContainerEmpty>
              <TextEmpty>Não há tarefas em andamento</TextEmpty>
            </ContainerEmpty>
          }
          {
            (!!tasksInProgress.length) &&
            <List
              refreshControl={
                <RefreshControl
                  refreshing={refreshing === 'inProgress'}
                  onRefresh={refreshList}
                  progressBackgroundColor={'#30FF8D'}
                  tintColor={'#111619'}
                />
              }
              data={tasksInProgress}
              keyExtractor={item => String(item.id)}
              horizontal={false}
              numColumns={2}
              columnWrapperStyle={{ alignItems: 'flex-start' }}
              renderItem={({ item }) => (
                <ContainerTask>
                  <Description>{item.description}</Description>
                  <RowActionsTask>
                    <Press onPress={() => closeTask(item.id)}>
                      <Icon name='check-circle' size={25} color='#C1C3C2' />
                    </Press>
                    <Press onPress={() => setDeleteTask(item)}>
                      <Icon name='delete' size={25} color='#C1C3C2' />
                    </Press>
                  </RowActionsTask>
                </ContainerTask>
              )}
            />
          }
        </Fragment>
      }
      {
        (!loading && !showInProgress) &&
        <Fragment>
          {
            (!tasksFinalizeds.length) &&
            <ContainerEmpty>
              <TextEmpty>Não há tarefas finalizadas</TextEmpty>
            </ContainerEmpty>
          }
          {
            (!!tasksFinalizeds.length) &&
            <List
              refreshControl={
                <RefreshControl
                  refreshing={refreshing === 'finalizeds'}
                  onRefresh={() => refreshList(true)}
                  progressBackgroundColor={'#30FF8D'}
                  tintColor={'#111619'}
                />
              }
              data={tasksFinalizeds}
              keyExtractor={item => String(item.id)}
              horizontal={false}
              numColumns={2}
              columnWrapperStyle={{ alignItems: 'flex-start' }}
              renderItem={({ item }) => (
                <ContainerTask>
                  <Description>{item.description}</Description>
                  <RowActionsTask>
                    <Press onPress={() => openTask(item.id)}>
                      <Icon name='check-circle' size={25} color='#30FF8D' />
                    </Press>
                    <Press onPress={() => setDeleteTask(item)}>
                      <Icon name='delete' size={25} color='#C1C3C2' />
                    </Press>
                  </RowActionsTask>
                </ContainerTask>
              )}
            />
          }
        </Fragment>
      }
    </Container>
  );
}

export default Home;