import { useEffect } from "react";
import { useSlider } from "./useSlider";

export const useAutoSlider = (sliderCount: number, interval: number) => {
    const slider = useSlider(sliderCount);
    useEffect(() => {
        if (!interval) {
            return;
        }
        const timeout = setTimeout(() => slider.nextSlide(), interval)
        return () => clearTimeout(timeout)
    }, [slider.nextSlide, interval])

    return slider
}
