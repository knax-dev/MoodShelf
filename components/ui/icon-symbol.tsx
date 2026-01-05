import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleProp, TextStyle } from 'react-native';
import { OpaqueColorValue } from 'react-native';

type IconMapping = Record<string, keyof typeof MaterialIcons.glyphMap>;

const MAPPING: IconMapping = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: keyof typeof MAPPING;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}) {
  const iconName = MAPPING[name];

  if (!iconName) return null;

  return <MaterialIcons name={iconName} size={size} color={color} style={style} />;
}
