import React, { FC } from "react";
import { SvgHalfColoredStar, SvgStar } from "./svg/SvgStar";

type StarFillType = "empty" | "fill" | "half";
const Star = (props: {
	fillColor: string;
	emptyColor: string;
	fillType: StarFillType;
}) => {
	switch (props.fillType) {
		case "fill":
			return <SvgStar color={props.fillColor} />;
		case "empty":
			return <SvgStar color={props.emptyColor} />;
		case "half":
			return (
				<SvgHalfColoredStar
					leftColor={props.fillColor}
					rightColor={props.emptyColor}
				/>
			);
	}
};

const decideFillType = (starIndex: number, score: number): StarFillType => {
	if (starIndex + 1 > score) {
		return "empty";
	}
	if (starIndex + 1 > Math.floor(score)) {
		return "half";
	}
	return "fill";
};

export const StarScore: FC<{
	score: number;
	starCount: number;
	highlightColor?: string;
	color?: string;
}> = ({ score, starCount, highlightColor = "#efca00", color = "#757575" }) => {
	return (
		<>
			{[...new Array(starCount)].map((_, index) => (
				<Star
					key={index}
					emptyColor={color}
					fillColor={highlightColor}
					fillType={decideFillType(index, score)}
				/>
			))}
		</>
	);
};
