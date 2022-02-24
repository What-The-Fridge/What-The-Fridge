import styled, { css } from 'styled-components';

interface TableStyleProps {
	isDark: boolean;
}

export const Styles = styled.div<TableStyleProps>`
	.table {
		border: 1px solid black;
		max-height: 500px;

		overflow: auto;

		.tr {
			:last-child {
				.td {
					border-bottom: 0;
				}
			}
		}

		.th,
		.td {
			padding: 5px;
			border-bottom: 1px solid black;
			border-right: 1px solid black;
			${({ isDark }) =>
				isDark &&
				css`
					background: #222a3a;
				`}

			${({ isDark }) =>
				!isDark &&
				css`
					background: #fff;
				`}
			overflow: hidden;

			:last-child {
				border-right: 0;
			}
		}

		&.sticky {
			.header,
			.footer {
				position: sticky;
				z-index: 1;
				width: fit-content;
			}

			.header {
				top: 0;
			}

			.footer {
				bottom: 0;
			}

			.body {
				position: relative;
				z-index: 0;
			}
		}
	}
`;
