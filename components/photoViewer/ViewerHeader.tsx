import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

type Props = {
    photo: any;
};

const ViewerHeader = ({ photo }: Props) => {
    const formattedDate = photo
        ? new Date(
            photo.creationTime
        ).toLocaleString()
        : '';

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {formattedDate}
            </Text>
        </View>
    );
};

export default ViewerHeader;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60,
        width: '100%',
        alignItems: 'center',
        zIndex: 10,
    },

    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});