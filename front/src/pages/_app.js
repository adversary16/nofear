import { Provider } from 'react-redux'
import { SocketContextProvider } from '../contexts/SocketContext'

import store from '../redux/stores/store'
import './global.scss'

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SocketContextProvider>
        <Component {...pageProps} />
        </SocketContextProvider>
    </Provider>
  )
}