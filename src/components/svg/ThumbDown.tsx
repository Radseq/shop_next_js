import React, { FC } from "react";

export const ThumbDown: FC<{ color?: string; className?: string }> = ({
	color = "#757575",
	className,
}) => {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill={color}
				fillRule="evenodd"
				d="M4.051 14.052c-.565 0-1.025.446-1.025.995 0 .548.46.995 1.025.995h7.668l-.585.788c-.663.893-1.38 3.677-.325 5.593.201.364.55.582.935.582.565 0 1.025-.446 1.025-.995 0-5.953 4.579-7.958 6.667-7.958h1.538V7.09s-3.095.187-4.102 0c-1.356-.254-3.773-1.737-5.128-1.99-1.26-.235-5.129 0-5.129 0-.565 0-1.025.446-1.025.995 0 .548.46.995 1.025.995h1.026v.994H5.59c-.565 0-1.026.446-1.026.995 0 .548.46.995 1.026.995h1.025v.995h-2.05c-.566 0-1.027.445-1.027.995 0 .548.461.994 1.026.994H5.59v.995H4.05zM2 15.047c0-.726.407-1.356 1.007-1.704a1.94 1.94 0 0 1-.494-1.28c0-.868.578-1.599 1.378-1.872a1.933 1.933 0 0 1-.353-1.113c0-.867.579-1.598 1.379-1.87a1.933 1.933 0 0 1-.353-1.114c0-1.098.92-1.99 2.051-1.99 0 0 3.87-.234 5.129 0 1.355.253 3.772 1.736 5.128 1.99 1.007.187 4.102 0 4.102 0H22v8.953h-2.564c-1.767 0-5.641 1.754-5.641 6.963 0 1.098-.92 1.99-2.051 1.99a2.11 2.11 0 0 1-1.84-1.108c-1.054-1.917-.673-4.403-.04-5.855H4.05C2.92 17.037 2 16.144 2 15.047z"
			></path>
		</svg>
	);
};
