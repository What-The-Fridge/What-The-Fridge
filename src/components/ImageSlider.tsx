import { Box, Center, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { EffectFlip, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useWindowSize } from './hooks/useWindowSize';

interface ImageSliderProps {
	slides: {
		src: string;
		text: string;
		action?: any;
	}[];
}

const ImageSlider: React.FC<ImageSliderProps> = (props): JSX.Element => {
	const windowSize = useWindowSize();
	const phoneSize = 768;
	var isMobile = false;
	if (windowSize.width) isMobile = windowSize.width < phoneSize;

	return (
		<div style={{ width: isMobile ? '350px' : '500px' }}>
			<Swiper
				effect={'flip'}
				grabCursor={true}
				pagination={true}
				navigation={true}
				modules={[EffectFlip, Pagination, Navigation]}
				className="mySwiper"
			>
				{props.slides.map(slide => {
					return (
						<SwiperSlide>
							<Center>
								<VStack spacing={8}>
									<HStack>
										<Text fontSize="20px"> {slide.text} </Text>
										<Box>{slide.action}</Box>
									</HStack>

									<Box>
										<Image
											src={slide.src}
											alt="me"
											height="500"
											width="600"
											loading="eager"
										/>
									</Box>
								</VStack>
							</Center>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default ImageSlider;
