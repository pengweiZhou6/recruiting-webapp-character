import React from "react"
import { Provider } from "react-redux"
import { store } from "./store"
import "./App.css"
import Characters from "./containers/Characters"
import Party from "./containers/Party"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Party />
        <Characters />
      </div>
    </Provider>
  )
}

export default App
