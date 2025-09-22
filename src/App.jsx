import React from 'react'
import Header from './components/Header/Header.jsx'
import MobileFooter from './components/Footer/Footer'
import Main from './components/Main/Main.jsx'
import { useIsMobileView } from './utils/utils'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import PlaylistPage from './pages/PlaylistPage'
import WatchLaterPage from './pages/WatchLaterPage' 
import LikedVideosPage from './pages/LikedVideosPage' 

function App() {
  const isMobileView = useIsMobileView()

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/playlist" component={PlaylistPage}/>
          <Route path="/watch-later" component={WatchLaterPage} />
          <Route path="/liked-videos" component={LikedVideosPage} />
        </Switch>
        {isMobileView && <MobileFooter />}
      </div>
    </Router>
  )
}

export default App
