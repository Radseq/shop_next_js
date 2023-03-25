import React from "react"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider, Hydrate } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { Provider } from "react-redux"
import { wrapper } from "@/lib/storeCart"
import "@/styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
	const { store } = wrapper.useWrappedStore(pageProps)
	const [queryClient] = React.useState(() => new QueryClient())
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<Component {...pageProps} />
					<ReactQueryDevtools initialIsOpen={false} />
				</Hydrate>
			</QueryClientProvider>
		</Provider>
	)
}

export default MyApp
