import { Heading } from '@chakra-ui/layout';
import { Box, Button } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components/Layout';
import { useAppContext } from '../utils/context';
import ImageSlider from '../components/ImageSlider';
import { useRouter } from 'next/router';
import { BiFridge } from 'react-icons/bi';
import { GoChecklist } from 'react-icons/go';

const Landing = () => {
	const value = useAppContext();
	const router = useRouter();

	const renderPreviewImages = () => {
		const slides = [
			{
				src: '/landingPage/1.png',
				text: 'Keep track of your food items',
				action: (
					<Button
						variant="outline"
						colorScheme="teal"
						border="2px"
						onClick={() => {
							router.push('/fridges');
						}}
					>
						<BiFridge />
					</Button>
				),
			},
			{
				src: '/landingPage/2.png',
				text: 'Make shopping lists',
				action: (
					<Button
						variant="outline"
						colorScheme="teal"
						border="2px"
						onClick={() => {
							router.push('/groceryLists');
						}}
					>
						<GoChecklist />
					</Button>
				),
			},
		];

		return (
			<ImageSlider slides={slides}>
				<Button>hi</Button>
			</ImageSlider>
		);
	};

	return (
		<Layout path={'/'} disableAuth={true}>
			<Box display={'flex'} flexDirection="column" alignItems="center">
				<Heading as="h3" size="lg">
					Welcome to What The Fridge
					{value[0].firstName ? `, ${value[0].firstName}` : ''}
				</Heading>
				<Box mt={8}>{renderPreviewImages()}</Box>
				{value[0].firstName ? null : (
					<Button
						mt={8}
						variant="outline"
						colorScheme="teal"
						border="2px"
						onClick={() => {
							router.push('/account/register');
						}}
					>
						Register your account
					</Button>
				)}
			</Box>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient)(Landing);
