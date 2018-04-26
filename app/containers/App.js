import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TwitchActions from '../actions/twitch';
import style from './App.css';

@connect(
  state => ({
    twitchData : state.twitch
  }),
  dispatch => ({
    actions: bindActionCreators(TwitchActions, dispatch)
  })
)
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //setInterval( function() { console.log(this.props); this.props.actions.fetchData(); }.bind(this) , 5000);
    }


    render() {
        return (
            <div>
                {!this.props.twitchData.isFetching ?
                    <div>
                        <Header {...this.props}/>
                        <MainSection {...this.props}/>
                    </div>
                :   <div className={style.loadingContainer}>Loading...</div>
                }
            </div>
        );
    }
}
