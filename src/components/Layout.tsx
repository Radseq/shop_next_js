import { ReactNode } from "react"
import { PageFooter } from "./footer/PageFooter"
import { Navigation } from "./header/Navigation"
import { TopBar } from "./header/TopBar"
import { RootNavigation } from "./header/Types"
import styles from "../styles/MainPageBody.module.css"

type Props = {
	children?: ReactNode
	navigation: RootNavigation[]
}

export const Layout = ({ children, ...props }: Props) => {
	return (
		<div className={styles.webMain}>
			<header>
				<TopBar />
				<Navigation navigations={props.navigation} />
			</header>
			<main {...props}>{children}</main>
			<footer>
				<PageFooter />
			</footer>
		</div>
	)
}
