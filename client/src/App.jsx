import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header.jsx';
import MobileFooter from './components/Footer/Footer';
import Main from './components/Main/Main.jsx';
import { useIsMobileView } from './utils/utils';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import SearchPage from './pages/SearchPage';
import HistoryPage from './pages/HistoryPage';
import PlaylistPage from './pages/PlaylistPage';
import WatchLaterPage from './pages/WatchLaterPage'; 
import LikedVideosPage from './pages/LikedVideosPage';
import { supabase } from './supabaseClient.ts';

function App() {
  const isMobileView = useIsMobileView();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase.from('videos').select('*');
      if (error) {
        console.error("Error fetching videos:", error);
      } else {
        setVideos(data);
      }
    };
    fetchVideos();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Main videos={videos} />
          </Route>
          <Route path="/results" component={SearchPage} />
          <Route path="/history" component={HistoryPage} />
          <Route path="/playlist" component={PlaylistPage}/>
          <Route path="/watch-later" component={WatchLaterPage} />
          <Route path="/liked-videos" component={LikedVideosPage} />
        </Switch>
        {isMobileView && <MobileFooter />}
      </div>
    </Router>
  );
}

export default App;
