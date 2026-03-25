import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "constants/colors";
import LAYOUT from "constants/layout";

interface OutlinedButtonProps {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    children: React.ReactNode;
}

export function OutlinedButton({ icon, onPress, children }: OutlinedButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed
            ]}
        >
            <Ionicons name={icon} size={18} color={Colors.primary500} />
            <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: Colors.primary500,
        paddingVertical: LAYOUT.padding / 2,
        paddingHorizontal: LAYOUT.padding,
        borderRadius: LAYOUT.borderRadius,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: Colors.primary500,
        marginLeft: LAYOUT.padding / 2
    },
    pressed: {
        opacity: 0.75
    }
});