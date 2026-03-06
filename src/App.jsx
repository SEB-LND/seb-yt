import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import MobileFooter from "./components/Footer/Footer.jsx";
import Main from "./components/Main/Main.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import SearchPage from "./pages/SearchPage";
import HistoryPage from "./pages/HistoryPage";
import PlaylistPage from "./pages/PlaylistPage";
import WatchLaterPage from "./pages/WatchLaterPage";
import LikedVideosPage from "./pages/LikedVideosPage";
import EditPage from "./pages/EditPage";
import { useIsMobileView } from "./utils/utils";
import { supabase } from "./supabaseClient.ts";
import "./App.css";

function App() {
  const isMobileView = useIsMobileView();
  const [accessGranted, setAccessGranted] = useState(() => {
    return sessionStorage.getItem("access_granted") === "true";
  });
  const [videos, setVideos] = useState([]);

  // Fetch videos only if access is granted
  useEffect(() => {
    if (!accessGranted) return;

    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .from("videos")
          .select("*")
          .order("publishedAt", { ascending: false });

        if (error) throw error;
        setVideos(data || []);
      } catch (err) {
        console.error("Error fetching videos:", err.message);
      }
    };

    fetchVideos();
  }, [accessGranted]);

  return (
    <div className="App">
      {/* Only show header if access granted */}
      {accessGranted && <Header />}

      <Switch>
        {/* Landing Page */}
        <Route exact path="/">
          {accessGranted ? <Redirect to="/main" /> : <LandingPage onSuccess={() => setAccessGranted(true)} />}
        </Route>

        {/* Main Page */}
        <Route path="/main">
          {accessGranted ? <Main videos={videos} /> : <Redirect to="/" />}
        </Route>

        {/* Other pages (protected) */}
        <Route path="/results">
          {accessGranted ? <SearchPage /> : <Redirect to="/" />}
        </Route>
        <Route path="/history">
          {accessGranted ? <HistoryPage /> : <Redirect to="/" />}
        </Route>
        <Route path="/playlist">
          {accessGranted ? <PlaylistPage /> : <Redirect to="/" />}
        </Route>
        <Route path="/watch-later">
          {accessGranted ? <WatchLaterPage /> : <Redirect to="/" />}
        </Route>
        <Route path="/liked-videos">
          {accessGranted ? <LikedVideosPage /> : <Redirect to="/" />}
        </Route>
        <Route path="/edit-video/:id">
          {accessGranted ? <EditPage /> : <Redirect to="/" />}
        </Route>

        {/* Fallback */}
        <Redirect to="/" />
      </Switch>

      {/* Only show mobile footer if access granted */}
      {accessGranted && isMobileView && <MobileFooter />}
    </div>
  );
}

export default App;