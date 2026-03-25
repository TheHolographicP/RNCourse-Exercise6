import { View, Text, StyleSheet, Button, Alert, Image } from 'react-native';
import { launchCameraAsync, launchImageLibraryAsync, useMediaLibraryPermissions, useCameraPermissions, PermissionStatus } from 'expo-image-picker';

import { OutlinedButton } from 'components/OutlinedButton';

import LAYOUT from 'constants/layout';
import { Colors } from 'constants/colors';
import { useState } from 'react';

export function ImagePicker({ onChangeImage }: { onChangeImage: (uri: string) => void }) {
    const [cameraPermissionInformation, requestCameraPermission] = useCameraPermissions();
    const [mediaLibraryPermissionInformation, requestMediaLibraryPermission] = useMediaLibraryPermissions();
    const [imageUri, setImageUri] = useState<string>();

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
            return new Promise((resolve) => {
                Alert.alert(
                    'Insufficient Permissions!',
                    'You need to grant camera permissions to use this app.',
                    [
                        { text: 'Cancel', onPress: () => resolve(false), style: 'cancel' },
                        {
                            text: 'Grant Permission',
                            onPress: async () => {
                                const permissionResponse = await requestCameraPermission();
                                resolve(permissionResponse.granted);
                            }
                        }
                    ]
                );
            });
        }

        if (mediaLibraryPermissionInformation.status === PermissionStatus.DENIED) {
            return new Promise((resolve) => {
                Alert.alert(
                    'Insufficient Permissions!',
                    'You need to grant media library permissions to use this app.',
                    [
                        { text: 'Cancel', onPress: () => resolve(false), style: 'cancel' },
                        {
                            text: 'Grant Permission',
                            onPress: async () => {
                                const permissionResponse = await requestMediaLibraryPermission();
                                resolve(permissionResponse.granted);
                            }
                        }
                    ]
                );
            });
        }

        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            allowsMultipleSelection: false,
            quality: 0.5,
            aspect: [16, 9]
        });
        if (!image.canceled) {
            setImageUri(image.assets[0].uri);
            onChangeImage(image.assets[0].uri);
        }
    }

    async function pickImageHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        const image = await launchImageLibraryAsync({
            quality: 0.5,
            allowsMultipleSelection: false,
        });
        if (!image.canceled) {
            setImageUri(image.assets[0].uri);
            onChangeImage(image.assets[0].uri);
        }
    }

    return (
        <View style={styles.input}>
            <Text style={styles.inputLabel}>Image Picker:</Text>
            <View style={styles.imagePreview}> 
                {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : <Text>No image picked yet.</Text>}
            </View>
            <View style={styles.buttonsContainer}>
                <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
                <OutlinedButton icon="image" onPress={pickImageHandler}>Pick Image</OutlinedButton>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        alignItems: 'center'
    },
    imagePreview: {
        borderRadius: LAYOUT.borderRadius,
        backgroundColor: Colors.primary100,
        width: '100%',
        aspectRatio: 16 / 9,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: LAYOUT.padding,
        gap: LAYOUT.gap
    },
    inputLabel: {
        fontWeight: 'bold',
        marginBottom: 4,
        fontSize: 16,
        color: Colors.primary500,
        alignSelf: 'flex-start'
    }
});