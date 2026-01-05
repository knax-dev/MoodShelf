import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { ReactNode } from 'react';
import { View, Text } from 'react-native';

export function HapticTab(props: BottomTabBarButtonProps & { children?: ReactNode }) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (props.accessibilityState?.selected) {
          Haptics.selectionAsync(); 
        } else {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    >
      <View>
        {props.children ? (
          typeof props.children === 'string' ? (
            <Text>{props.children}</Text>
          ) : (
            props.children
          )
        ) : null}
      </View>
    </PlatformPressable>
  );
}
