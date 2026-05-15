import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

export const deletePhoto = async (
    photo: any,
    onDeleted?: () => void
) => {
    if (!photo) return;

    await MediaLibrary.deleteAssetsAsync([
        photo.id,
    ]);

    onDeleted?.();
};

export const sharePhoto = async (
    photo: any
) => {
    if (!photo?.uri) return;

    const isAvailable =
        await Sharing.isAvailableAsync();

    if (!isAvailable) {
        return;
    }

    await Sharing.shareAsync(photo.uri, {
        mimeType: 'image/jpeg',
        dialogTitle: 'Share Photo',
    });
};