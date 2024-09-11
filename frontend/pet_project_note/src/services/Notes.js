import { data } from 'autoprefixer';
import axios from 'axios';

export const fetchNotes = async (filter) => {
	try {
		var getNotesRequest = {
			params: {
				search: filter?.search,
				sortItem: filter?.sortItem,
				sortOrder: filter?.sortOrder,
			},
		};
		console.log("Getting notes", getNotesRequest)
		const response = await axios.get('http://localhost:5045/notes', getNotesRequest);
		console.log("Notes got",response.data.notes)
		return response.data.notes;
	} catch (e) {
		console.error(e);
	}
};

export const createNote = async (createNoteRequest) => {
	try {
		console.log("Creating note", createNoteRequest)
		const response = await axios.post('http://localhost:5045/notes', createNoteRequest);
		console.log("Note created")

		return response.status;
	} catch (e) {
		console.error("Error creating note",e);
	}
};

export const deleteNote = async (deleteNoteRequest) =>{
	try{
		console.log("Deleting note", deleteNoteRequest)
		const response = await axios.delete('http://localhost:5045/notes', deleteNoteRequest);
		console.log("Note deleted")

		return response.status;
	} catch (e) {
		console.error("Error deleting note:", e);
	}
};

export const updateNote = async(updateNoteRequest) =>{
	try{
		// var note = { 
		// 	data: {
		// 		id : noteId,
		// 		title : title,
		// 		description : description
		// 	}
		// }

		console.log("Updating note", updateNoteRequest);
		const response = await axios.put('http://localhost:5045/notes', updateNoteRequest);
		console.log("Note updated");

		return response.status;
	} catch (e) {
		console.error("Updating note error", note)
	}
}
