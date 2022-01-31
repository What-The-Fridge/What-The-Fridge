import { FormControl, FormLabel, Box, Text } from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React, { InputHTMLAttributes, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createGlobalStyle } from 'styled-components';

type CustomDatePickerProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	setFieldValue: Function;
	name: string;
};

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
	label,
	setFieldValue,
	...props
}) => {
	const [field, { error }] = useField(props);

	const [startDate, setStartDate] = useState<Date | null>(new Date());

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
						</Box>
					</FormLabel>
					<DatePicker
						wrapperClassName="date_picker full-width"
						className="colour-mode-style"
						selected={startDate}
						onChange={date => {
							setStartDate(date);
							setFieldValue('date', date);
						}}
					/>
					<DatePickerWrapperStyles />
				</FormControl>
			)}
		</Field>
	);
};
