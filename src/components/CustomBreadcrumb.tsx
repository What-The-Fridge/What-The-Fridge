import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

interface CustomBreadcrumbProps {
	paths?: string[];
}

export const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = (
	props
): JSX.Element => {
	return (
		<Breadcrumb
			spacing="8px"
			separator={<ChevronRightIcon color="gray.500" />}
			mb={8}
		>
			{props.paths ? (
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
			) : null}
			{props.paths?.map((path, index) => {
				let nestedPath = '';
				if (props.paths) {
					for (let i = 0; i < index + 1; i++) {
						nestedPath = `${nestedPath}/${props.paths[i]}`;
					}
				}

				return (
					<BreadcrumbItem>
						<BreadcrumbLink href={nestedPath}>
							{path.charAt(0).toUpperCase() + path.slice(1)}
						</BreadcrumbLink>
					</BreadcrumbItem>
				);
			})}
		</Breadcrumb>
	);
};
