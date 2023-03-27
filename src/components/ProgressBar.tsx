import React from "react"
import styles from "./ProgressBar.module.css"

type ProgressBarProps = {
	startValue: number
	endValue: number
	showValueInProgressBar?: boolean
	progressBarClassName?: string
	progressBarValueClassName?: string
	valueDigitCount?: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
	startValue = 0,
	endValue = 1,
	progressBarClassName = "",
	progressBarValueClassName = "",
	showValueInProgressBar = false,
	valueDigitCount = 0,
}) => {
	const barPercentage = (startValue * 100) / endValue

	const progressBarViewValue = showValueInProgressBar
		? barPercentage.toFixed(valueDigitCount)
		: undefined

	return (
		<div className={`${styles.progressBar} ${progressBarClassName}`}>
			<div
				className={`${styles.progressBarValue} ${progressBarValueClassName}`}
				style={{ width: barPercentage + "%" }}
			>
				{progressBarViewValue}
			</div>
		</div>
	)
}

export default React.memo(ProgressBar)
