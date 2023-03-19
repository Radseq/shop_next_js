import styled from "styled-components";

export const StyledAlert = styled.div<{ result: "success" | "failure" }>`
	text-align: center;
	color: ${(props) => (props.result == "success" ? "green" : "red")};
`;
