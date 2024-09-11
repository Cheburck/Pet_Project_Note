// EditNoteModal.js
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Input,
	Button,
	Textarea,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const UpdateNoteForm = ({ isOpen, onClose, note, onUpdate }) => {
	const [editedTitle, setTitle] = useState(note.title);
	const [editedDescription, setDescription] = useState(note.description);

	useEffect(() => {
		setTitle(note.title);
		setDescription(note.description);
	}, [note]);

	const handleUpdateSubmit = () => {
		if(editedTitle == '' || editedDescription == '')
			return
		
		const updatedNote = {
			id: note.id,
			title: editedTitle,
			description: editedDescription,
		};
		onUpdate(updatedNote); // Вызов onUpdate с обновленными данными
		onClose(); // Закрыть модальное окно после редактирования
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size='xl'>
			<ModalOverlay />
			<ModalContent className='w-1/2 flex flex-row'>
				<ModalHeader>Редактировать заметку</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Input
						placeholder="Заголовок"
						value={editedTitle}
						onChange={(e) => setTitle(e.target.value)}
						marginBottom={4}
					/>
					<Textarea
						placeholder="Описание"
						value={editedDescription}
						onChange={(e) => setDescription(e.target.value)}
						height = '150px'
					/>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="purple" onClick={handleUpdateSubmit}>
						Сохранить
					</Button>
					<Button onClick={onClose} ml={3}>
						Отмена
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default UpdateNoteForm;
