import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import * as React from 'react';

type MeasurementUnitSelectProps = {
	units: { name: string; id: number }[];
	defaultOption: number;
};

export const MeasurementUnitSelect = (props: MeasurementUnitSelectProps) => (
	<Field>
		{({ field }: FieldProps) => (
			<FormControl name="unit" id="unit">
				<FormLabel>Unit</FormLabel>
				<Select
					name="unit"
					id="unit"
					onChange={field.onChange}
					focusBorderColor="teal.500"
				>
					{props.units!.map((unit: any) => {
						return (
							<option
								value={unit.id}
								id={unit.id}
								selected={props.defaultOption === unit.id}
							>
								{unit.name}
							</option>
						);
					})}
				</Select>
			</FormControl>
		)}
	</Field>
);
