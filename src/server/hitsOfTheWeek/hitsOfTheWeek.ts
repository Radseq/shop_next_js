import { CONFIG } from "@/config"
import { getMostSoldProductsByDate } from "../bestseller/bestseller"

export const getHitsOfWeekProducts = async () => {
	const hitsOfWeekData = new Date()
	hitsOfWeekData.setDate(
		hitsOfWeekData.getDate() - CONFIG.HITS_OF_WEEK_DAYS_PERIOD
	)
	return getMostSoldProductsByDate(hitsOfWeekData)
}
