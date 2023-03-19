import React, { FC, useState } from "react";
import { SvgStar } from "./svg/SvgStar";

const createArrayAndFillUpwards = (index: number) =>
	Array.from(Array(index).keys());

export const InteractiveScores: FC<{
	starCount: number;
	onSelectedScore: CallableFunction;
	highlightColor?: string;
	color?: string;
}> = ({
	starCount,
	onSelectedScore,
	highlightColor = "#efca00",
	color = "#757575",
}) => {
	const [mouseHoverIndexArray, setMouseHoverIndexArray] =
		useState<number[]>();
	const [selectedStarIndex, setSelectedStarIndex] = useState<number[]>();

	const handleClickStar = (index: number) => {
		const starsCount = index + 1;
		const startArray = createArrayAndFillUpwards(starsCount);
		onSelectedScore(starsCount);
		setSelectedStarIndex(startArray);
		setMouseHoverIndexArray(startArray);
	};

	const onMouseEnterHandle = (index: number) => {
		if (!selectedStarIndex)
			setMouseHoverIndexArray(createArrayAndFillUpwards(index + 1));
	};

	const setFullFilledColor = (index: number) => {
		if (mouseHoverIndexArray?.some((value) => value == index)) {
			return highlightColor;
		}
		return color;
	};

	return (
		<div
			onMouseLeave={() =>
				!selectedStarIndex && setMouseHoverIndexArray(undefined)
			}
		>
			{[...new Array(starCount)].map((_, index) => (
				<SvgStar
					key={index}
					onClickHandle={() => handleClickStar(index)}
					onMouseEnterHandle={() => onMouseEnterHandle(index)}
					color={setFullFilledColor(index)}
				/>
			))}
		</div>
	);
};
