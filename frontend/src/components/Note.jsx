import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Heading,
	Text,
	Button,
	Box,
} from '@chakra-ui/react';
import moment from 'moment/moment';
import { useState } from 'react';
import UpdateNoteForm from './UpdateNoteForm';

export default function Note({ id, title, description, createdAt, onDelete, onUpdate }) {

	const [clickCount, setClickCount] = useState(0);
	const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);

	const handleDeleteClick = () => {
		setClickCount((prevCount) => prevCount + 1);
		setTimeout(() => {
			setClickCount(0); // Сбросить счетчик после 300 мс
		}, 300);

		if (clickCount + 1 === 2) {
			var deleteNoteRequest = { 
				data : {
					id : id
				}
			}
			onDelete(deleteNoteRequest);
		}
	};
	const handleUpdateSave = (updatedNote) => {
        onUpdate(updatedNote);
	}
	return (
		<>
			<Card variant={'filled'} backgroundColor={'lavender'}>
				<CardHeader>
					<Heading size={'md'}>{title}</Heading>
				</CardHeader>
				<Divider borderColor={'#cc99ff'} />
				<CardBody>
					<Text whiteSpace='pre-wrap'>{description}</Text>
				</CardBody>
				<Divider borderColor={'#cc99ff'} />
				<CardFooter>
					<Text>{moment(createdAt).format('DD/MM/YYYY H:mm')}</Text>
					<Box ml="auto" display="flex">
						<Button size="sm" colorScheme="purple" onClick={() => setUpdateFormOpen(true)} ml={2}>
							Изменить
						</Button>
						<Button size="sm" colorScheme="purple" onClick={handleDeleteClick} ml={2}>
							Удалить
						</Button>
					</Box>
				</CardFooter>
			</Card>

			<UpdateNoteForm
                isOpen={isUpdateFormOpen}
                onClose={() => setUpdateFormOpen(false)}
                note={{ id, title, description }}
                onUpdate={handleUpdateSave}
            />
		</>
		
	);
}