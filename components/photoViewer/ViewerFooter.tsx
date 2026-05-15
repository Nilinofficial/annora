import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type Props = {
    onDelete: () => void;
    onShare: () => void;
};

const ViewerFooter = ({
    onDelete,
    onShare,
}: Props) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={onShare}
            >
                <Text style={styles.text}>
                    Share
                </Text>
            </Pressable>

            <Pressable
                style={styles.button}
                onPress={onDelete}
            >
                <Text style={styles.text}>
                    Delete
                </Text>
            </Pressable>
        </View>
    );
};

export default ViewerFooter;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
    },

    button: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
    },

    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});