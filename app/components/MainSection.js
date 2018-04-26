import React, { Component } from 'react';
// import Footer from './Footer';
import style from './MainSection.css';

import twitter_icon from "../img/twitter.png";
import twitch_icon from "../img/twitch.png";
import youtube_icon from "../img/youtube.png";


export default class MainSection extends Component {


  constructor(props, context) {
    super(props, context);
    this.state ={
        live: !!props.twitchData.twitchData,
        title : props.twitchData.twitchData ? props.twitchData.twitchData.title : "",
        viewers : props.twitchData.twitchData ? props.twitchData.twitchData.viewer_count : "",
        game_name : props.twitchData.gameName ? props.twitchData.gameName : ""
    }
  }


  render() {

    return (
      <section className={style.main}>
        { this.state.live ?
            <a  className={style.liveContainer} href="https://www.twitch.tv/rhobalas_lol"
                onClick={function() {chrome.tabs.create({url:'https://www.twitch.tv/rhobalas_lol'} )} }>
                <div className={style.viewersCount}>
                    <div className={style.viewerEye} />
                    {this.state.viewers}
                </div>
                <div className={style.liveTitleContainer}>
                    <div className={style.gameContainer}>
                        {this.state.game_name}
                    </div>
                    <div className={style.liveTitle}>
                        {this.state.title}
                    </div>
                </div>
            </a>
            : <div>
            </div>
        }
        <div className={style.socialContainer}>
            <div className={style.socialTitle}><strong>Réseaux Sociaux</strong></div>
            <div className={style.socialBtnContainer}>
                <ul className={style.socialBtnList}>
                    <li className={style.socialBtn}>
                        <a href="https://twitter.com/Rhobalasv2" onClick={function() {chrome.tabs.create({url:'https://twitter.com/Rhobalasv2'} )} }>
                            <img src={twitter_icon} />
                        </a>
                    </li>
                    <li className={style.socialBtn}>
                        <a href="https://www.twitch.tv/rhobalas_lol" onClick={function() {chrome.tabs.create({url:'https://www.twitch.tv/rhobalas_lol'} )} }>
                            <img src={twitch_icon}/>
                        </a>
                    </li>
                    <li className={style.socialBtn}><a href="https://www.youtube.com/channel/UC1OjGAD8ViSm9X9dNW7l_nA" onClick={function() {chrome.tabs.create({url:'https://www.youtube.com/channel/UC1OjGAD8ViSm9X9dNW7l_nA'} )} }><img src={youtube_icon}/></a></li>
                </ul>
            </div>
        </div>
      </section>
    );
  }
}
