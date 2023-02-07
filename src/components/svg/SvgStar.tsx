import React, { FC } from "react";

export const SvgStar: FC<{ color?: string; className?: string }> = ({
	color = "#757575",
	className,
}) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
		>
			<path
				fill={color}
				fillRule="evenodd"
				d="M8 10.832l-3.708 2.581L5.6 9.089 2 6.359l4.517-.092L8 2l1.483 4.267L14 6.359l-3.6 2.73 1.308 4.324z"
			></path>
		</svg>
	);
};

export const SvgHalfColoredStar: FC<{
	leftColor?: string;
	rightColor?: string;
	className?: string;
}> = ({ leftColor = "#efca00", rightColor = "#757575", className }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
		>
			<defs>
				<linearGradient id="grad">
					<stop offset="50%" stopColor={leftColor} />
					<stop offset="50%" stopColor={rightColor} />
				</linearGradient>
			</defs>
			<path
				fill="url(#grad)"
				d="M8 10.832l-3.708 2.581L5.6 9.089 2 6.359l4.517-.092L8 2l1.483 4.267L14 6.359l-3.6 2.73 1.308 4.324z"
			/>
		</svg>
	);
};
