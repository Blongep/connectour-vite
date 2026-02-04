import { createElement } from "react"
import { RouterProvider } from "react-router-dom"
import { router } from "./index"

export function Router(): JSX.Element {
  return createElement(RouterProvider, { router })
}

// Clean up on module reload (HMR)
// https://vitejs.dev/guide/api-hmr
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose())
}
