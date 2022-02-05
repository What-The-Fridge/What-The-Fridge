import { InfoIcon } from '@chakra-ui/icons';
import {
	Box,
	Center,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
} from '@chakra-ui/react';

interface CustomPopoverProps {
	header: string;
	body: string;
}

export const CustomPopover: React.FC<CustomPopoverProps> = (
	props
): JSX.Element => {
	return (
		<Center>
			<Box as="button" type="button">
				<Popover>
					<PopoverTrigger>
						<InfoIcon />
					</PopoverTrigger>
					<PopoverContent>
						<PopoverArrow />
						<PopoverCloseButton />
						<PopoverHeader>{props.header}</PopoverHeader>
						<PopoverBody>{props.body}</PopoverBody>
					</PopoverContent>
				</Popover>
			</Box>
		</Center>
	);
};
