import { useLayoutEffect, useState } from "react"
import React from "react"

export const useWindowSize = () => {
	if (typeof document === "undefined") {
		React.useLayoutEffect = React.useEffect
	}
	const [size, setSize] = useState([0, 0])
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight])
		}
		window.addEventListener("resize", updateSize)
		updateSize()
		return () => window.removeEventListener("resize", updateSize)
	}, [])
	return size
}
