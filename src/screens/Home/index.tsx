import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ChartLine, MaskSad, PlusCircle } from 'phosphor-react-native';
import { useCallback } from 'react';
import { FlatList, Text } from 'react-native';
import { ActionCard } from '../../components/ActionCard';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Loading } from '../../components/Loading';
import { useActionContext } from '../../contexts/ActionContext';
import theme from '../../theme';
import { Box, ButtonGroup, Container, Span } from './style';

const Home = () => {
  const navigation = useNavigation();

  const { isLoading, actions, fetchActions } = useActionContext();

  useFocusEffect(
    useCallback(() => {
      // AsyncStorage.removeItem('@myActions:actions');

      fetchActions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {actions.length === 0 ? (
            <WithoutActions />
          ) : (
            <FlatList
              data={actions}
              renderItem={({ item: { date, id, name, value } }) => (
                <ActionCard
                  id={id}
                  name={name}
                  value={value}
                  date={date}
                  key={id}
                  onPress={() =>
                    navigation.navigate('Action', {
                      id: id,
                      name: name,
                    })
                  }
                />
              )}
            ></FlatList>
          )}

          <ButtonGroup>
            <ButtonIcon
              title="View graph"
              icon={<ChartLine size={24} color={theme.colors.brand.primary} />}
            />
            <ButtonIcon
              title="Add new action"
              icon={<PlusCircle size={24} color={theme.colors.brand.primary} />}
              onPress={() => navigation.navigate('NewAction')}
            />
          </ButtonGroup>
        </>
      )}
    </Container>
  );
};

export { Home };

const WithoutActions = () => {
  return (
    <Box>
      <MaskSad size={48} color={theme.colors.brand.primary} />
      <Text
        style={{
          color: 'white',
          marginTop: 8,
          fontSize: theme.sizes.medium,
        }}
      >
        You don&apos;t have any actions yet
      </Text>

      <Text
        style={{
          color: 'white',
          marginTop: 8,
          fontSize: theme.sizes.regular,
          width: '70%',
          textAlign: 'center',
        }}
      >
        Add a new action in the button below to <Span>start tracking</Span> your
        expenses
      </Text>
    </Box>
  );
};
