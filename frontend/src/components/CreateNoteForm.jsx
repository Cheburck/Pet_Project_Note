import { Button, Input, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

export default function CreateNoteForm({ onCreate }) {
	const [note, setNote] = useState({});

	const onSubmit = (e) => {
		e.preventDefault();
		setNote({});
		onCreate(note);
	};

	const [text, setText] = useState('');

	const handleKeyDown = (event) => {
		// Проверяем, нажаты ли Ctrl или Shift вместе с Tab
		if (event.key === 'Tab' && event.ctrlKey) {
		event.preventDefault(); // Предотвращаем стандартное поведение
		const start = event.target.selectionStart;
		const end = event.target.selectionEnd;

		// Устанавливаем новый текст с символом табуляции
		const newText = text.substring(0, start) + '\t' + text.substring(end);
		setText(newText);

		// Устанавливаем курсор после вставленного символа табуляции
		setTimeout(() => {
			event.target.selectionStart = event.target.selectionEnd = start + 1;
		}, 0);
		}
	};

	return (
		<form onSubmit={onSubmit} className='w-full flex flex-col gap-3'>
			<h3 className='font-bold text-xl'>Создание заметки</h3>
			<Input
				placeholder='Название'
				value={note?.title ?? ''}
				onChange={(e) => setNote({ ...note, title: e.target.value })}
			/>
			<Textarea
				onKeyDown={handleKeyDown}
				placeholder='Описание'
				value={note?.description ?? ''}
				onChange={(e) => setNote({ ...note, description: e.target.value })}
			/>
			<Button type='submit' colorScheme='purple'>
				Создать
			</Button>
		</form>
	);
}
