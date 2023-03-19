import styled from "styled-components";

export const StyledAlert = styled.div<{ result: "success" | "failure" }>`
	color: ${(props) => (props.result == "success" ? "green" : "red")};
`;
