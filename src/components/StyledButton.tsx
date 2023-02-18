import styled from "styled-components";

type ButtonKind = "primary" | "secondary";

type ButtonStyleProps = {
	color: string;
	borderColor: string;
	hoverBackgroundColor: string;
	hoverBorderColor: string;
};

const STYLES_PER_KIND: Record<ButtonKind, ButtonStyleProps> = {
	primary: {
		color: "royalblue",
		borderColor: "royalblue",
		hoverBackgroundColor: "royalblue",
		hoverBorderColor: "royalblue",
	},
	secondary: {
		color: "rgb(68, 68, 68)",
		borderColor: "rgb(68, 68, 68)",
		hoverBackgroundColor: "rgb(68, 68, 68)",
		hoverBorderColor: "rgb(68, 68, 68)",
	},
};

export const StyledButton = styled.button<{ kind: ButtonKind }>`
	font-size: 1em;

	border-radius: 5px;
	background-color: transparent;

	color: ${(props) => STYLES_PER_KIND[props.kind].color};
	border: 2px solid ${(props) => STYLES_PER_KIND[props.kind].borderColor};
	text-decoration: none;
	transition: all 0.2s ease-in-out;

	&:hover {
		background-color: ${(props) =>
			STYLES_PER_KIND[props.kind].hoverBackgroundColor};
		border-color: ${(props) =>
			STYLES_PER_KIND[props.kind].hoverBorderColor};
		color: white;
	}
`;
