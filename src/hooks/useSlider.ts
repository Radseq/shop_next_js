import {useCallback, useState} from "react";

const normalizeIndex = (newIndex: number, max: number) => (max + newIndex) % max;

export const useSlider = (numberOfSlides: number) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    return {
        currentIndex,
        nextSlide: useCallback(
            () => setCurrentIndex(index => normalizeIndex(index + 1, numberOfSlides)),
            [numberOfSlides]
        ),
        previousSlide: useCallback(
            () => setCurrentIndex(index => normalizeIndex(index - 1, numberOfSlides)),
            [numberOfSlides]
        ),
        setIndex: setCurrentIndex
    }
}
