import { ref, deleteObject } from 'firebase/storage';
import { storage } from './Firebase';

// WARNING: this function works but would be better to find a better solution
// This wouldn't work if file url contains special characters
// We have removed all special characters from the files' names before upload
function getPathStorageFromUrl(url: String) {
	const baseUrl =
		'https://firebasestorage.googleapis.com/v0/b/whatthefridge-fa945.appspot.com/o/';

	let imagePath: string = url.replace(baseUrl, '');
	const indexOfEndPath = imagePath.indexOf('?');
	imagePath = imagePath.substring(0, indexOfEndPath);
	imagePath = imagePath.replaceAll('%2F', '/');
	imagePath = imagePath.replaceAll('%40', '@');
	return imagePath;
}

export const deleteImageByUrl = async (
	url: string | null
): Promise<boolean> => {
	// ----------------
	// delete images from firebase
	// Create a reference to the file to delete
	if (url) {
		getPathStorageFromUrl(url);
		const desertRef = ref(storage, getPathStorageFromUrl(url));

		// Delete the file
		await deleteObject(desertRef)
			.then(() => {
				// File deleted successfully
				return true;
			})
			.catch(error => {
				alert(
					'error!' + error.toString() + ', please report to the developers'
				);
				return false;
			});
	}

	return true;
};
