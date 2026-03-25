import { Pressable, Text, StyleSheet } from "react-native";

import { Colors } from "constants/colors";
import LAYOUT from "constants/layout";

interface ButtonProps {
    onPress: () => void;
    children: React.ReactNode;
}

export function Button({ onPress, children }: ButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed
            ]}
        >
            <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary500,
        paddingVertical: LAYOUT.padding / 2,
        paddingHorizontal: LAYOUT.padding,
        borderRadius: LAYOUT.borderRadius,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 40
    },
    buttonText: {
        color: Colors.gray700,
        marginLeft: LAYOUT.padding / 2
    },
    pressed: {
        opacity: 0.75
    }
});