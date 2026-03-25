import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { launchCameraAsync, launchImageLibraryAsync, useMediaLibraryPermissions, useCameraPermissions, PermissionStatus } from 'expo-image-picker';

import LAYOUT from 'constants/layout';
import { Colors } from 'constants/colors';


export function ImagePicker() {
    const [cameraPermissionInformation, requestCameraPermission] = useCameraPermissions();
    const [mediaLibraryPermissionInformation, requestMediaLibraryPermission] = useMediaLibraryPermissions();

    async function verifyPermissions() {
        if (!cameraPermissionInformation || !mediaLibraryPermissionInformation) {
            Alert.alert('Permissions not found!', 'Unable to verify permissions.');
            return false;
        }

        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestCameraPermission();
            return permissionResponse.granted;
        }

        if (mediaLibraryPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestMediaLibraryPermission();
            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions!', 'You need to grant camera permissions to use this app.');
            return false;
        }

        if (mediaLibraryPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions!', 'You need to grant media library permissions to use this app.');
            return false;
        }

        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            console.log('Permissions not granted!');
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            quality: 0.5,
            aspect: [16, 9]
        });
        console.log(image);
    }

    async function pickImageHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            console.log('Permissions not granted!');
            return;
        }

        const image = await launchImageLibraryAsync({
            quality: 0.5
        });
        console.log(image);
    }


    return (
        <View style={styles.input}>
            <Text>Image Picker</Text>
            <Button title="Take Image" onPress={takeImageHandler} />
            <Button title="Pick Image" onPress={pickImageHandler} color={Colors.primary500} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        padding: LAYOUT.padding
    },
    inputLabel: {
        fontWeight: 'bold',
        marginBottom: 4,
        fontSize: 16,
        color: Colors.primary500
    },
});