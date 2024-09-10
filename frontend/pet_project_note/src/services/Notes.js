import axios from 'axios';

export const fetchNotes = async (filter) => {
	try {
		const response = await axios.get('http://localhost:5045/notes', {
			params: {
				search: filter?.search,
				sortItem: filter?.sortItem,
				sortOrder: filter?.sortOrder,
			},
		});
		console.log("Notes ",response.data.notes)
		return response.data.notes;
	} catch (e) {
		console.error(e);
	}
};

export const createNote = async (note) => {
	try {
		console.log("Creating note", note)
		const response = await axios.post('http://localhost:5045/notes', note);
		console.log("Note created " + note)

		return response.status;
	} catch (e) {
		console.error("Error creating note",e);
	}
};

export const deleteNote = async (noteId) =>{
	try{
		console.log("Deleting note", noteId)
		const response = await axios.delete('http://localhost:5045/notes', {data : {id : noteId}});
		console.log("Note deleted ", noteId)

		return response.status;
	} catch (e) {
		console.error("Error deleting note:", e);
	}
};
