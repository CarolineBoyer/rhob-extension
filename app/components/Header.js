import React, { Component } from 'react';
import ReactDom from 'react-dom';
import rhobLogo from '../img/logo_250.png'
import style from './Header.css';

export default class Header extends Component {


    constructor(props) {
        super(props);

        this.state = {
            rot: 0,
            live : !!props.twitchData.twitchData
        };

        this.calculateHourSinceBeginningOfStream = this.calculateHourSinceBeginningOfStream.bind(this);
    }

    componentDidMount() {
        console.log("mounted");
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
    componentWillUnmount() {
        console.log("unmounting");
       document.removeEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    handleMouseMove(event) {
        if (this) {
            var eye = ReactDom.findDOMNode(this).getElementsByClassName('Header__eyeBg___R6QbX')[0].getBoundingClientRect();
            var x = (eye.left) + (eye.width / 2);
            var y = (eye.top) + (eye.height / 2);
            var rad = Math.atan2(event.x - x, event.y - y);
            var rot = (rad * (180 / Math.PI) * -1 ) + 180;
            this.setState({ rot: rot});
        }
    }

    calculateHourSinceBeginningOfStream() {
        var now = new Date();
        var now = now.getTime();

        var startedAt = new Date(this.props.twitchData.twitchData.started_at);
        var startedAt = startedAt.getTime();

        var differenceInTime = now - startedAt;
        var h = parseInt((differenceInTime/(1000*60*60))%24);

        var output = h + 'h';

        return output;
    }


    render() {
        return (
            <header>
                <div className={style.headerContainer}>
                    <div className={style.logoContainer}>
                        <img src={rhobLogo}/>
                        <div className={style.eyeContainer}>
                            <div className={style.eyeBg} style={{'WebkitTransform': 'rotate(' + this.state.rot + 'deg)',
                            'MozTransform': 'rotate(' +  this.state.rot + 'deg)',
                            'msTransform': 'rotate(' +  this.state.rot + 'deg)',
                            'transform': 'rotate(' +  this.state.rot + 'deg)'}} />
                        </div>
                    </div>
                    <h3>Full Time Streamer</h3>
                </div>
                <div className={style.menuContainer}>
                    <ul>
                        <li className={ this.state.live ? style.live : style.offline}>
                            {this.state.live ?
                                <span>Live - {this.calculateHourSinceBeginningOfStream()}</span>
                                : <span>'Offline'</span>
                            }
                        </li>
                        <li className={style.donate}><a href="https://streamlabs.com/rhobalas_lol#/"  onClick={function() {chrome.tabs.create({url:'https://streamlabs.com/rhobalas_lol#/'} )} }>Me soutenir</a></li>
                    </ul>
                </div>
            </header>
        );
    }
}
