import styled from "styled-components";

type InputKind = "primary";

type InputStyleProps = {
	borderColor: string;
	hoverBorderColor: string;
	hoverBoxShadowColor: string;
};

const STYLES_PER_KIND: Record<InputKind, InputStyleProps> = {
	primary: {
		borderColor: "rgb(205, 205, 203)",
		hoverBorderColor: "rgb(126, 126, 126)",
		hoverBoxShadowColor: "rgba(126, 126, 126, 0.938)",
	},
};

export const StyledInput = styled.input<{ kind: InputKind }>`
	border-radius: 20px;
	border: 2px solid ${(props) => STYLES_PER_KIND[props.kind].borderColor};
	padding-left: 20px;
	font-size: 1.5em;
	transition: all 0.5s ease-in-out;
	/* 20px of peding, border size *2 */
	width: calc(100% - 24px);

	&:hover {
		border: 2px solid
			${(props) => STYLES_PER_KIND[props.kind].hoverBorderColor};
		outline: none;
		box-shadow: ${(props) =>
				STYLES_PER_KIND[props.kind].hoverBoxShadowColor}
			0px 2px 8px;
	}
`;
