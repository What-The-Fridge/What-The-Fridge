import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface ImageSliderProps {
	slides: {
		src: string;
		text: string;
		action?: any;
	}[];
}

const ImageSlider: React.FC<ImageSliderProps> = (props): JSX.Element => {
	return (
		<Box display={'flex'} flexDirection="column" alignItems="center">
			<Carousel infiniteLoop animationHandler={'fade'} autoPlay>
				{props.slides.map(slide => {
					return (
						<Box>
							<Text fontSize="lg"> {slide.text} </Text>
							<Box mt={8}>
								<Image src={slide.src} alt="me" height="500" width="600" />
							</Box>
						</Box>
					);
				})}
			</Carousel>
		</Box>
	);
};

export default ImageSlider;
