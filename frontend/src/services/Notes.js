import axios from 'axios';

const backend_url = import.meta.env.VITE_BACKEND_URL;

export const fetchNotes = async (filter) => {
	try {
		var getNotesRequest = {
			params: {
				search: filter?.search,
				sortItem: filter?.sortItem,
				sortOrder: filter?.sortOrder,
			},
		};
		console.log("Getting notes", getNotesRequest, "/nFrom", backend_url)
		const response = await axios.get(backend_url, getNotesRequest);
		console.log("Notes got",response.data.notes)
		return response.data.notes;
	} catch (e) {
		console.error(e);
	}
};

export const createNote = async (createNoteRequest) => {
	try {
		console.log("Creating note", createNoteRequest)
		const response = await axios.post(backend_url, createNoteRequest);
		console.log("Note created")

		return response.status;
	} catch (e) {
		console.error("Error creating note",e);
	}
};

export const deleteNote = async (deleteNoteRequest) =>{
	try{
		console.log("Deleting note", deleteNoteRequest)
		const response = await axios.delete(backend_url, deleteNoteRequest);
		console.log("Note deleted")

		return response.status;
	} catch (e) {
		console.error("Error deleting note:", e);
	}
};

export const updateNote = async(updateNoteRequest) =>{
	try{
		console.log("Updating note", updateNoteRequest);
		const response = await axios.put(backend_url, updateNoteRequest);
		console.log("Note updated");

		return response.status;
	} catch (e) {
		console.error("Updating note error", note)
	}
}
