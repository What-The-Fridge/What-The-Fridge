import { InfoIcon } from '@chakra-ui/icons';
import {
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
		</Center>
	);
};
