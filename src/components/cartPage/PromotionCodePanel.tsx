import { useState } from "react"
import { StyledButton } from "../StyledButton"
import { StyledInput } from "../StyledInput"
import styles from "./PromotionCodePanel.module.css"

export const PromotionCodePanel = () => {
	const [promotionInput, setPromotionInput] = useState(false)

	return (
		<div className={styles.promotionPanel}>
			<button onClick={() => setPromotionInput(!promotionInput)}>
				Have promotion code {promotionInput ? "⮙" : "⮛"}
			</button>
			{promotionInput && (
				<div className={styles.inputPromotionCode}>
					<StyledInput type="text" kind="primary" />
					<StyledButton kind="primary">Use code</StyledButton>
				</div>
			)}
		</div>
	)
}
