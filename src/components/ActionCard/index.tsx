import { useNavigation } from '@react-navigation/native';
import { PencilSimpleLine, XCircle } from 'phosphor-react-native';
import { useEffect } from 'react';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { useActionContext } from '../../contexts/ActionContext';
import { Badge } from '../Badge';
import { Container, Content, IconsBox } from './style';

const image = require('../../assets/calculo_r.png');

export interface ActionCardProps extends ViewProps {
  id: string;
  name: string;
  value: number;
  date: Date;
  animationDelay?: number;
}

const ActionCard = ({
  id,
  name,
  value,
  date,
  animationDelay,
  ...rest
}: ActionCardProps) => {
  const { colors, spacings, sizes } = useTheme();

  const navigation = useNavigation();
  const { deleteAction } = useActionContext();

  const handleDeleteAction = (id: string) => () => {
    Alert.alert('Delete', 'Are you sure you want to delete this action?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => deleteAction(id),
        style: 'destructive',
      },
    ]);
  };

  const handleEditAction = (id: string) => {
    navigation.navigate('EditAction', { id });
  };

  const AnimatedContainer = Animated.createAnimatedComponent(Container);
  const cardOffset = useSharedValue(-100);

  const actionCardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: cardOffset.value }],
  }));

  useEffect(() => {
    cardOffset.value = withTiming(0, { duration: animationDelay });
  });

  return (
    <AnimatedContainer {...rest} style={[actionCardAnimatedStyle]}>
      <IconsBox>
        <TouchableOpacity onPress={() => handleEditAction(id)}>
          <PencilSimpleLine
            size={24}
            weight={'bold'}
            color={colors.brand.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteAction(id)}>
          <XCircle
            size={24}
            weight={'bold'}
            color={colors.brand.primary}
            style={{ marginLeft: spacings.regular }}
          />
        </TouchableOpacity>
      </IconsBox>
      <Content>
        <Badge date={date} />
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Image source={image} />
          <View
            style={{ marginLeft: spacings.regular, justifyContent: 'center' }}
          >
            <Text style={{ fontSize: sizes.regular }}>{name}</Text>
            <Text style={{ fontSize: sizes.medium }}>
              R$ {value.toFixed(2)}
            </Text>
          </View>
        </View>
      </Content>
    </AnimatedContainer>
  );
};

export { ActionCard };
