import React, {useState, useEffect} from 'react';
import './App.css';
import { categoryInt2Str, categoryStr2Int } from '../../utils/utils';

import { videoMetadata } from "../../assets/videoMetadata";

import dayVideo from "../../assets/videos/v_day.mp4";
import nightVideo from "../../assets/videos/v_night.mp4";

import daySearch from "../../assets/inferences/v_day_search_data.json";
import nightSearch from "../../assets/inferences/v_night_search_data.json";

function App() {
  // Access the DOM element (<video>)
  const videoRef = React.useRef(null);
  function play() { videoRef.current.play(); };
  function pause() { videoRef.current.pause(); };
  function setCurrentTime(requiredTime) { videoRef.current.currentTime = requiredTime; };

  
  // Video Selection
  const [currentPlayingName, setCurrentPlayingName] = useState(videoMetadata[0]); // Name of the video that is being playing
  const [currentPlaying, setCurrentPlaying] = useState(dayVideo); // Video that is loaded to the player
  const [currentSearchData, setCurrentSearchData] = useState(daySearch); // Search data that is used
  
  function handleChangeSource(source) {
    setCurrentPlaying(source);
    videoRef.current.load();
  }
  
  const handleSelectVideo = (e) => {
    setCurrentPlayingName(e.target.value);
    if (e.target.value === videoMetadata[0]) {
      handleChangeSource(dayVideo);
      setCurrentSearchData(daySearch);
    } else if (e.target.value === videoMetadata[1]) {
      handleChangeSource(nightVideo);
      setCurrentSearchData(nightSearch);
    }
  }

  function videosSelect(videos) {
    return (
      <div>
        <label>Select a Video</label>
        <select value={currentPlayingName} onChange={handleSelectVideo}>
          <option></option>
          {videos.map((video) =>
            <option key={video}>{video}</option>
          )}
        </select>
      </div>
    );
  }

  // Category Selection
  const [currentSelectedCategory, setCurrentSelectedCategory] = useState(""); // Object category that is selected
  
  const handleCategorySelect = (e) => {
    setCurrentSelectedCategory(e.target.value);
  }

  function categoriesSelect(categories) {
    return (
      <div>
        <label>Object Query</label>
        <select value={currentSelectedCategory} onChange={handleCategorySelect}>
          <option></option>
          {categories.map((category) =>
            <option key={category}>{categoryInt2Str(category)}</option>
          )}
        </select>
      </div>
    );
  }

  // Fetching Search Results
  function fetchTimestamps(category, searchData) {
    if (!(categoryStr2Int(category) in searchData)) {
      return []
    } else {
      return searchData[categoryStr2Int(category)];
    }
  }

  const [searchResult, setSearchResult] = useState([]); // Search results in timestamps (being rendered as buttons)
  useEffect(() => {
    setSearchResult(fetchTimestamps(currentSelectedCategory, currentSearchData));
  }, [currentSelectedCategory, currentSearchData]);

  function timestampButtons (timestamps) {
    return (
      <div>
        {timestamps.map((timestamp) =>
          <button key={timestamp} onClick={() => setCurrentTime(timestamp)}>{timestamp}</button>
        )}
      </div>
    );
  }
  
  
  return (
    <div>
      <video width="960" height="480" ref={videoRef} controls>
          <source 
            src={currentPlaying}
            type="video/mp4" 
          />
      </video>
      {/* <button onClick={() => play()}>Start</button>
      <button onClick={() => pause()}>Pause</button> */}
      {videosSelect(videoMetadata)}
      {categoriesSelect(currentSearchData.key)}
      {timestampButtons(searchResult)}
    </div>
  );
}

export default App;
