import React, { FC, useState } from "react";
import { SvgStar } from "./svg/SvgStar";

const createAndFillArray = (index: number) =>
	[...new Array(index + 1)].map((_, index) => (_ = index));

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
		onSelectedScore(index + 1);
		setSelectedStarIndex(createAndFillArray(index));
		setMouseHoverIndexArray(createAndFillArray(index));
	};

	const onMouseEnterHandle = (index: number) => {
		if (!selectedStarIndex)
			setMouseHoverIndexArray(createAndFillArray(index));
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
