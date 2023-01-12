import { Box, Button, Center, FormControl, FormLabel } from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React, { InputHTMLAttributes, useState } from 'react';

type FileUploadProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	name: string;
	setFieldValue: Function;
	thumbnail?: string;
};

export const FileUpload: React.FC<FileUploadProps> = ({
	label,
	setFieldValue,
	size: _,
	...props
}) => {
	const [field, { error }] = useField(props);
	const [file, setFile] = useState<undefined | File>(undefined);
	const [initialThumbnail, setInitialThumbnail] = useState<string | undefined>(
		props.thumbnail
	);

	function validateSize(input: any) {
		if (input.files[0]) {
			const fileSize = input.files[0].size / 1024 / 1024; // in MiB
			if (fileSize > 10) {
				alert('File size exceeds 10 MiB');
				(document.getElementById(props.name) as HTMLInputElement).value = ''; // clear the file
			} else {
				// Proceed further
			}
		}
	}

	return (
		<Field>
			{({}: any) => (
				<FormControl isInvalid={!!error}>
					<FormLabel htmlFor={field.name}>{label}</FormLabel>
					{/* More investigation */}
					{/* <Button>
						<label htmlFor={props.name} style={{ cursor: 'pointer' }}>
							Upload
						</label>
					</Button> */}
					<input
						style={{ cursor: 'pointer' }}
						type="file"
						{...props}
						id={props.name}
						name={props.name}
						onChange={event => {
							if (!event.currentTarget.files) return;
							validateSize(event.currentTarget);
							setFieldValue('file', event.currentTarget.files[0]);
							setFile(event.currentTarget.files[0]);
						}}
					/>

					{file || initialThumbnail ? (
						<Box>
							<Center>
								<Thumb file={file} thumbnail={initialThumbnail} />
								<Button
									m={3}
									variant="outline"
									colorScheme="red"
									border="2px"
									onClick={() => {
										(
											document.getElementById(props.name) as HTMLInputElement
										).value = '';
										setFieldValue('file', undefined);
										setFile(undefined);
										setInitialThumbnail(undefined);
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
	thumbnail?: string;
}

class Thumb extends React.Component<ThumbProps> {
	state = {
		thumb: undefined,
	};

	componentWillReceiveProps(nextProps: any) {
		if (!nextProps.file) {
			return;
		}

		this.setState(() => {
			let reader = new FileReader();

			reader.onloadend = () => {
				this.setState({ thumb: reader.result });
			};

			reader.readAsDataURL(nextProps.file);
		});
	}

	render() {
		const { file }: any = this.props;
		const { thumbnail }: any = this.props;
		const { thumb } = this.state;

		if (!file && !thumbnail) {
			return null;
		}

		return (
			<div>
				<img
					style={{ margin: 15 }}
					src={thumb ? thumb : thumbnail}
					alt={thumb ? file.name : thumbnail}
					className="img-thumbnail mt-2"
					height={200}
					width={200}
				/>
			</div>
		);
	}
}
