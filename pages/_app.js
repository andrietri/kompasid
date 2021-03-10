import App from 'next/app'
import { Provider } from 'react-redux'
import React from 'react'
import withRedux from "next-redux-wrapper"
import { store } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.min.css';

class MyApp extends App {

  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    //Anything returned here can be access by the client
    return {pageProps: pageProps}
  }

  render() {
    const {Component, pageProps} = this.props

    return (
      <Provider store={store}>
        <PersistGate persistor={store.__PERSISTOR} loading={null}>
          <Component {...pageProps}/>
        </PersistGate>
      </Provider>
    )
  }
}

//makeStore function that returns a new store for every request
const makeStore = () => store

//withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp)
