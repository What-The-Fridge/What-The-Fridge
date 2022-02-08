import { FormControl, FormLabel, Box, Text } from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createGlobalStyle } from 'styled-components';
import { CustomPopover } from './CustomPopover';

type CustomDatePickerProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	setFieldValue: Function;
	value: string;
	infoPopOver?: any;
	selectedDate?: Date;
	name: string;
};

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
	label,
	setFieldValue,
	value,
	...props
}) => {
	const [field, { error }] = useField(props);

	const [defaultStartDate, setStartDate] = useState<Date | null>(
		props.selectedDate ? props.selectedDate : new Date()
	);

	useEffect(() => {
		if (value === 'expiryDate' && props.selectedDate === undefined) {
			var weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
			setStartDate(new Date(new Date().getTime() + weekInMilliseconds));
			setFieldValue(
				`${value}`,
				new Date(new Date().getTime() + weekInMilliseconds)
			);
		} else {
			setFieldValue(`${value}`, defaultStartDate);
		}
	}, []);

	const DatePickerWrapperStyles = createGlobalStyle`
		.colour-mode-style{
			color: black;
      border-radius: 3px;
      border-color: black;
      padding: 6px 0px 6px 20px;
      /* background-color: #081833; */
      
		}
	`;

	return (
		<Field>
			{({}: any) => (
				<FormControl isInvalid={!!error}>
					<FormLabel htmlFor={field.name}>
						<Box display="flex" flexDirection={'row'} alignItems={'center'}>
							<Text mr={3}>{label}</Text>
							{props.infoPopOver ? (
								<CustomPopover
									header={props.infoPopOver.header}
									body={props.infoPopOver.body}
								/>
							) : null}
						</Box>
					</FormLabel>
					<DatePicker
						wrapperClassName="date_picker full-width"
						className="colour-mode-style"
						selected={defaultStartDate}
						onChange={date => {
							setStartDate(date);
							setFieldValue(`${value}`, date);
						}}
					/>
					<DatePickerWrapperStyles />
				</FormControl>
			)}
		</Field>
	);
};
