import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Heading,
	Text,
} from '@chakra-ui/react';
import moment from 'moment/moment';

export default function Note({ title, description, createdAt }) {
	return (
		<Card variant={'filled'} backgroundColor={'lavender'}>
			<CardHeader>
				<Heading size={'md'}>{title}</Heading>
			</CardHeader>
			<Divider borderColor={'#cc99ff'} />
			<CardBody>
				<Text>{description}</Text>
			</CardBody>
			<Divider borderColor={'#cc99ff'} />
			<CardFooter>{moment(createdAt).format('DD/MM/YYYY h:mm')}</CardFooter>
		</Card>
	);
}
