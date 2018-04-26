import * as types from '../constants/ActionTypes';
import request from 'superagent'

import config from '../reducers/config.json'

function requestData() {
  return { type: types.REQ_DATA };
}

function receiveData( data, gameName ) {
    return {
        type: types.RECEIVE_DATA,
        twitchData: data,
        gameName: gameName
    }
}

export function fetchData() {

    return function( dispatch ) {
        dispatch(requestData())

        return request
        .get('https://api.twitch.tv/helix/streams')
        .set({
            'Client-ID': config.client_id,
            Accept: 'application/json'
        })
        .query({ 'user_login': config.user_login })
        .then( function(res) {
            //var result = JSON.stringify(res.body)
            var result = res.body.data[0]
           console.log(result);
           if ( !result || result.length === 0 ) {
               // Twitch returns [] when the streamer is offline
               dispatch ( receiveData( null, ""))
           } else {
               // getting Game name
               request
               .get('https://api.twitch.tv/helix/games')
               .set({
                   'Client-ID': config.client_id,
                   Accept: 'application/json' })
               .query({ 'id': result.game_id })
               .then( function(res) {
                   dispatch( receiveData( result, JSON.parse(res.text).data[0].name ))
               })
           }
       })

       /**
       *
       * KEEP this for upgrade to webhook : might need a server however...

        .post( 'https://api.twitch.tv/helix/webhooks/hub' )
        .set({
            'Client-ID': config.client_id,
            'client_secret' : config.client_secret,
            'Content-Type': 'application/json' })
        .send({
            'hub.callback': "http://localhost:3000/js/rhobalas.bundle.js",
            'hub.mode':"subscribe",
            'hub.topic': 'https://api.twitch.tv/helix/streams?user_id='+config.user_id,
            "hub.lease_seconds":"864000"
        })
        */



    }
}
