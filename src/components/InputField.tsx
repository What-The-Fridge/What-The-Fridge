import { Input } from '@chakra-ui/input';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Box,
	Text,
} from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import { CustomPopover } from './CustomPopOver';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	placeholder: string;
	name: string;
	numberProps?: { min: number; max: number };
	InfoPopOver?: any;
};

export const InputField: React.FC<InputFieldProps> = ({
	label,
	size: _,
	...props
}) => {
	const [field, { error }] = useField(props);
	return (
		<Field>
			{({ form }: any) => (
				<FormControl isInvalid={!!error}>
					<FormLabel htmlFor={field.name}>
						<Box display="flex" flexDirection={'row'} alignItems={'center'}>
							<Text mr={3}>{label}</Text>
							{props.InfoPopOver ? (
								<CustomPopover
									header={props.InfoPopOver.header}
									body={props.InfoPopOver.body}
								/>
							) : null}
						</Box>
					</FormLabel>
					{props.numberProps ? (
						<NumberInput
							{...field}
							name={field.name}
							id={field.name}
							onChange={val => form.setFieldValue(field.name, val)}
							focusBorderColor="teal.500"
							min={props.numberProps.min}
							max={props.numberProps.max}
						>
							<NumberInputField name={field.name} id={field.name} />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					) : (
						<Input
							{...field}
							{...props}
							id={field.name}
							focusBorderColor="teal.500"
						/>
					)}

					{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
				</FormControl>
			)}
		</Field>
	);
};
