import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import { categoryInt2Str, categoryStr2Int, categoryInt2Color } from '../../utils/utils';

import { videoMetadata } from "../../assets/videoMetadata";

import dayVideo from "../../assets/videos/v_day.mp4";
import nightVideo from "../../assets/videos/v_night.mp4";
import indoorVideo from "../../assets/videos/v_indoor.mp4";
import dayClimbBreak from "../../assets/videos/v_day_climb_break.mp4";
import dayClimbCarry from "../../assets/videos/v_day_climb_carry.mp4";
import dayDoorBreak from "../../assets/videos/v_day_door_break.mp4";
import nightClimbBody from "../../assets/videos/v_night_climb_body.mp4";

import daySearch from "../../assets/inferences/v_day_search_data.json";
import nightSearch from "../../assets/inferences/v_night_search_data.json";
import indoorSearch from "../../assets/inferences/v_indoor_search_data.json";
import dayClimbBreakSearch from "../../assets/inferences/v_day_climb_break_search_data.json";
import dayClimbCarrySearch from "../../assets/inferences/v_day_climb_carry_search_data.json";
import dayDoorBreakSearch from "../../assets/inferences/v_day_door_break_search_data.json";
import nightClimbBodySearch from "../../assets/inferences/v_night_climb_body_search_data.json";

import dayBB from "../../assets/inferences/v_day_bb_data.json";
import nightBB from "../../assets/inferences/v_night_bb_data.json";
import indoorBB from "../../assets/inferences/v_indoor_bb_data.json";
import dayClimbBreakBB from "../../assets/inferences/v_day_climb_break_bb_data.json";
import dayClimbCarryBB from "../../assets/inferences/v_day_climb_carry_bb_data.json";
import dayDoorBreakBB from "../../assets/inferences/v_day_door_break_bb_data.json";
import nightClimbBodyBB from "../../assets/inferences/v_night_climb_body_bb_data.json";

const FPS = 30;

function App() {
  // Access the DOM element (<video>)
  const videoRef = React.useRef(null);
  function play() { videoRef.current.play(); };
  function pause() { videoRef.current.pause(); };
  function increaseVolume() { videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.1) };
  function decreaseVolume() { videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.1) };
  function setCurrentTime(requiredTime) { videoRef.current.currentTime = requiredTime; };

  const [currentTimestamp, setCurrentTimestamp] = useState('0');
  
  const handleTimeUpdate = () => {
    setCurrentTimestamp(videoRef.current.currentTime);
  }
  
  // Video Selection
  const [currentPlayingName, setCurrentPlayingName] = useState(videoMetadata[0]); // Name of the video that is being playing
  const [currentPlaying, setCurrentPlaying] = useState(dayVideo); // Video that is loaded to the player
  const [currentSearchData, setCurrentSearchData] = useState(daySearch); // Search data that is used
  const [currentBBData, setCurrentBBData] = useState(dayBB); // Bounding Boxes data that is used
  
  function handleChangeSource(source) {
    setCurrentPlaying(source);
    videoRef.current.load();
  }
  
  const handleSelectVideo = (e) => {
    setCurrentPlayingName(e.target.value);
    if (e.target.value === videoMetadata[0]) {
      handleChangeSource(dayVideo);
      setCurrentSearchData(daySearch);
      setCurrentBBData(dayBB);
    } else if (e.target.value === videoMetadata[1]) {
      handleChangeSource(nightVideo);
      setCurrentSearchData(nightSearch);
      setCurrentBBData(nightBB);
    } else if (e.target.value === videoMetadata[2]) {
      handleChangeSource(indoorVideo);
      setCurrentSearchData(indoorSearch);
      setCurrentBBData(indoorBB);
    } else if (e.target.value === videoMetadata[3]) {
      handleChangeSource(dayClimbBreak);
      setCurrentSearchData(dayClimbBreakSearch);
      setCurrentBBData(dayClimbBreakBB);
    } else if (e.target.value === videoMetadata[4]) {
      handleChangeSource(dayClimbCarry);
      setCurrentSearchData(dayClimbCarrySearch);
      setCurrentBBData(dayClimbCarryBB);
    } else if (e.target.value === videoMetadata[5]) {
      handleChangeSource(dayDoorBreak);
      setCurrentSearchData(dayDoorBreakSearch);
      setCurrentBBData(dayDoorBreakBB);
    } else if (e.target.value === videoMetadata[6]) {
      handleChangeSource(nightClimbBody);
      setCurrentSearchData(nightClimbBodySearch);
      setCurrentBBData(nightClimbBodyBB);
    }
  }

  function videosSelect(videos) {
    return (
      <div>
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
        <select value={currentSelectedCategory} onChange={handleCategorySelect}>
          <option></option>
          {categories.map((category) =>
            <option key={category}>{categoryInt2Str(category)}</option>
          )}
        </select>
      </div>
    );
  }

  // Bounding Boxes Selection
  const [currentBBCode, setCurrentBBCode] = useState(0); // BBs that are selected to render

  const handleSelectBB = (e) => {
    if (e.target.checked) {
      setCurrentBBCode(currentBBCode + 2 ** parseInt(e.target.id));
    } else {
      setCurrentBBCode(currentBBCode - 2 ** parseInt(e.target.id));
    }
  }
  
  function bbSelect(categories) {
    return (
      <div>
        {categories.map((category) =>
            <div key={category}>
              <input type="checkbox" id={category} onChange={handleSelectBB} />
              <label>{categoryInt2Str(category)}</label>
            </div>
          )}
      </div>
    );
  }

  // Fetching Search Results
  function fetchTimestamps(category, searchData) {
    if (!(categoryStr2Int(category) in searchData)) {
      return [];
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
        { timestamps.length > 0 &&
          <div>
            <label style={{'color' : 'red'}}>Found {timestamps.length} occurrences of {currentSelectedCategory}</label><br/>
          </div>
        }
        {timestamps.map((timestamp) =>
          <button className='jump-button' key={timestamp} onClick={() => setCurrentTime(timestamp)}>{timestamp}</button>
        )}
      </div>
    );
  }

  // Fetch BB Results
  function fetchBBs(timestamp, bbData, categoriesCode) {
    if (bbData === undefined) {
      return [];
    } else {
      let correctedTimestamp = (Math.floor(timestamp * FPS) >= bbData["num_frames"]) ? (bbData["num_frames"] - 1) : (Math.floor(timestamp * FPS));
      let currentAllBBs = bbData[correctedTimestamp];
      
      let currentSelectedBBs = [];
      for (let i = 0; i < currentAllBBs.length; i++) {
        let categoryInt = parseInt(currentAllBBs[i][0]);
        if ((categoriesCode >> categoryInt) % 2 === 1) {
          currentSelectedBBs.push(currentAllBBs[i]);
        }
      }

      return currentSelectedBBs;
    }
  }

  // Canvas Initialization
  const canvas = useRef();

  // Draw Bounding Boxes
  const drawBB = () => {
    const currentBBs = fetchBBs(currentTimestamp, currentBBData, currentBBCode);

    canvas.current.width = canvas.current.clientWidth;
    canvas.current.height = canvas.current.clientHeight;
    const context = canvas.current.getContext('2d');
    
    for (let i = 0; i < currentBBs.length; i++) {
      let x = currentBBs[i][1];
      let y = currentBBs[i][2];
      let w = currentBBs[i][3];
      let h = currentBBs[i][4];
      let categoryText = categoryInt2Str(currentBBs[i][0]);
      let categoryColor = categoryInt2Color(currentBBs[i][0]);

      context.beginPath();
      context.strokeStyle = categoryColor;
      context.lineWidth = 2;
      context.rect(x, y, w, h);

      context.font = 'bold 12pt Arial';
      context.fillStyle = categoryColor;
      context.fillText(categoryText, x, y);
      context.stroke();
    }
  }

  // Drawing
  useEffect(() => {
    drawBB();
  });
  
  
  return (
    <div>
      <canvas className='canvas-window' ref={canvas}></canvas>
      <div className='video-window'>
        <video width="960" height="480" ref={videoRef} onTimeUpdate={handleTimeUpdate}>
            <source 
              src={currentPlaying}
              type="video/mp4" 
            />
        </video>
      </div>
      <div className='control-window'>
        <p className='general-font-medium'>Video Controller</p>
        <button className='general-button' onClick={() => play()}>Start</button>
        <button className='general-button' onClick={() => pause()}>Pause</button>
        <button className='general-button' onClick={() => increaseVolume()}>Volume+</button>
        <button className='general-button' onClick={() => decreaseVolume()}>Volume-</button>

        <div style={{ 'marginTop': '20px' }}></div>

        <p className='general-font-medium'>Select Video</p>
        {videosSelect(videoMetadata)}

        <div style={{ 'marginTop': '20px' }}></div>

        <p className='general-font-medium'>Labeling Object & Action</p>
        {bbSelect(currentSearchData.key)}

        <div style={{ 'marginTop': '20px' }}></div>

        <p className='general-font-medium'>Object & Action Search</p>
        {categoriesSelect(currentSearchData.key)}
        {timestampButtons(searchResult)}
      </div>
    </div>
  );
}

export default App;
