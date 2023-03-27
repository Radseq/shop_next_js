import { useSlider } from "./useSlider"

export function useMutipleItemsSlider<Type>(
	items: Array<Type>,
	itemsPerSlide: number
) {
	const numberOfSlides = Math.ceil(items.length / itemsPerSlide)
	const slider = useSlider(numberOfSlides)
	const lastElement = Math.min(
		(slider.currentIndex + 1) * itemsPerSlide,
		items.length
	)
	const firstElement = lastElement - itemsPerSlide
	return {
		currentPromotions: items.slice(firstElement, lastElement),
		nextSlide: slider.nextSlide,
		previousSlide: slider.previousSlide,
	}
}
