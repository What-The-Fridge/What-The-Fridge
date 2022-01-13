import { Box, Button, Center, FormControl, FormLabel } from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React, { InputHTMLAttributes, useState } from 'react';

type FileUploadProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	name: string;
	setFieldValue: Function;
};

export const FileUpload: React.FC<FileUploadProps> = ({
	label,
	setFieldValue,
	size: _,
	...props
}) => {
	const [field, { error }] = useField(props);
	const [file, setFile] = useState<undefined | File>(undefined);

	console.log(file);

	function validateSize(input: any) {
		if (input.files[0]) {
			const fileSize = input.files[0].size / 1024 / 1024; // in MiB
			if (fileSize > 2) {
				alert('File size exceeds 2 MiB');
				(document.getElementById(props.name) as HTMLInputElement).value = ''; // clear the file
			} else {
				// Proceed further
			}
		}
	}

	return (
		<Field>
			{({ form }: any) => (
				<FormControl isInvalid={!!error}>
					<FormLabel htmlFor={field.name}>{label}</FormLabel>
					<input
						style={{ cursor: 'pointer' }}
						type="file"
						{...props}
						id={props.name}
						name={props.name}
						onChange={event => {
							console.log('here');
							if (!event.currentTarget.files) return;
							validateSize(event.currentTarget);
							setFieldValue('file', event.currentTarget.files[0]);
							setFile(event.currentTarget.files[0]);
						}}
					/>
					{file ? (
						<Box>
							<Center>
								<Thumb file={file} />
								<Button
									m={3}
									variant="outline"
									colorScheme="orange"
									border="2px"
									onClick={() => {
										(
											document.getElementById(props.name) as HTMLInputElement
										).value = '';
										setFile(undefined);
									}}
								>
									X
								</Button>
							</Center>
						</Box>
					) : null}
				</FormControl>
			)}
		</Field>
	);
};

interface ThumbProps {
	file: any;
}

class Thumb extends React.Component<ThumbProps> {
	state = {
		loading: false,
		thumb: undefined,
	};

	componentWillReceiveProps(nextProps: any) {
		if (!nextProps.file) {
			return;
		}

		this.setState({ loading: true }, () => {
			let reader = new FileReader();

			reader.onloadend = () => {
				this.setState({ loading: false, thumb: reader.result });
			};

			reader.readAsDataURL(nextProps.file);
		});
	}

	render() {
		const { file }: any = this.props;
		const { loading, thumb } = this.state;

		if (!file) {
			return null;
		}

		if (loading) {
			return <p>loading...</p>;
		}

		return (
			<img
				style={{ margin: 15 }}
				src={thumb}
				alt={file.name}
				className="img-thumbnail mt-2"
				height={200}
				width={200}
			/>
		);
	}
}
