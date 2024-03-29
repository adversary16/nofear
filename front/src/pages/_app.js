import { Provider } from 'react-redux'
import { SocketContextProvider } from '../contexts/SocketContext'
import { WebRTCProvider } from '../contexts/WebRTCContext'

import store from '../redux/stores/store'
import './global.scss'

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SocketContextProvider>
        <WebRTCProvider>
          <Component {...pageProps} />
        </WebRTCProvider>
        </SocketContextProvider>
    </Provider>
  )
}