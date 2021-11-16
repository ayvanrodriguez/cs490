import * as constants from './const.js';
import { useState, useEffect } from "react";
import ListPosts from './ListPosts.js';
import Profile from "./Profile.js";
import Post from './Post.js';
import Services from "./Services";
import React, { Component } from 'react';
import PlayWidget from 'react-spotify-widgets';

const Spotify = (props) => {

    const [ userItem, setUserItem ] = useState({});

    useEffect(() => {
        Services.list_users({
            user_id: props.user_id,
        })
            .then(r => {
                console.log(r);
                console.log(r.user_ids[0])
                r.user_ids.length && setUserItem(r.user_ids[0]);
                return r;
            })
            .catch(err => console.log('err:', err))
    }, [])

    return(
      <div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <h2>Top 10 From My Favorite Artist:</h2>
          </div>
          <PlayWidget
            width={560}
            height={400}
            uri={userItem.artist_uri || userItem.artistURI}
            lightTheme={true}
          />

          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <h2>Favorite Song:</h2>
          </div>
          <PlayWidget
            width={560}
            height={80}
            uri={userItem.track_uri || userItem.trackURI}
            lightTheme={true}
          />

          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <h2>Favorite Custom Playlist:</h2>
          </div>
          <PlayWidget
            width={560}
            height={580}
            uri={userItem.playlist_uri || userItem.playlistURI}
            lightTheme={true}
          />

      </div>
    );
}

export default Spotify;
