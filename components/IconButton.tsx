import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IconButtonProps {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    iconColor?: string;
    backgroundColor?: string;
    size?: number;
}

export function IconButton({ icon, size = 24, onPress, iconColor = '#000', backgroundColor = 'transparent' }: IconButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
                { backgroundColor }
            ]}
        >
            <View style={[styles.iconContainer, { width: size, height: size }]}>
                <Ionicons name={icon} size={size} color={iconColor} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 24,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    pressed: {
        opacity: 0.75
    }
});