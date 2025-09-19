import React from 'react'
import Header from './components/Header/Header.jsx'
import MobileFooter from './components/Footer/Footer'
import Main from './components/Main/Main.jsx'
import { useIsMobileView } from './utils/utils'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' // ✅ Switch not Routes
import './App.css'
import WatchLaterPage from './pages/WatchLaterPage' // make sure this file exists

function App() {
  const isMobileView = useIsMobileView()

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/watch-later" component={WatchLaterPage} />
        </Switch>
        {isMobileView && <MobileFooter />}
      </div>
    </Router>
  )
}

export default App
