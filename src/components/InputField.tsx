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
} from '@chakra-ui/react';
import { Field, FieldProps, useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	placeholder: string;
	name: string;
	numberProps?: { min: number; max: number };
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
					<FormLabel htmlFor={field.name}>{label}</FormLabel>
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
