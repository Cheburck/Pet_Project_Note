import CreateNoteForm from './components/CreateNoteForm';
import Note from './components/Note.jsx';
import Filters from './components/Filters.jsx';
import { createNote, deleteNote, fetchNotes, updateNote } from './services/Notes.js';
import { useEffect, useState } from 'react';

function App() {
	// const backend_url = process.env.REACT_APP_BACKEND_URL
	// console.log(backend_url)
	
	const [notes, setNotes] = useState([]);
	const [filter, setFilter] = useState({
		search: '',
		sortItem: 'date',
		sortOrder: 'desc',
	});

	useEffect(() => {
		const fetchData = async () => {
			let notes = await fetchNotes(filter);
			setNotes(notes);
		};

		fetchData();
	}, [filter]);

	const onCreate = async (note) => {
		await createNote(note);
		let notes = await fetchNotes(filter);
		setNotes(notes);
	};

	const onDelete = async (deleteNoteRequest) => {
		await deleteNote(deleteNoteRequest);
		let notes = await fetchNotes(filter);
		setNotes(notes);
	}

	const onUpdate = async (updateNoteRequest) => {
		await updateNote(updateNoteRequest);
		let notes = await fetchNotes(filter);
		setNotes(notes);
	}

	return (
		<section className='p-8 flex flex-row justify-start items-start gap-12'>
			<div className='flex flex-col w-1/3 gap-10'>
				<CreateNoteForm onCreate={onCreate} />
				<Filters filter={filter} setFilter={setFilter} />
			</div>

			<ul className='flex flex-col gap-5 w-1/2'>
				{notes.map((n) => (
					<li key={n.id}>
						<Note
							id = {n.id}
							title = {n.title}
							description = {n.description}
							createdAt = {n.createdAt}
							onDelete = {onDelete}
							onUpdate = {onUpdate}
						/>
					</li>
				))}
			</ul>
		</section>
	);
}

export default App;
