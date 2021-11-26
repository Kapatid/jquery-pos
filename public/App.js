import Navbar from './components/Navbar.js'
import Pos from './components/pos.js'
import AppDOM from './index.js'

/**
 * Initialize app
 * @param {AppDOM} AppDOM 
 */
const App = (AppDOM) => {
  AppDOM.render([Navbar, Pos], 'root')
}

export default App