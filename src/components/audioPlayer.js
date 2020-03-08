import React from 'react';

class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            play: false,
            pause: true,
        }
        this.url = '/sample.mp3';
        this.audio = new Audio(this.url);
    }

    play = () => {
        this.setState({ play: true, pause: false })
        this.audio.play();
    }

    pause = () => {
        this.setState({ play: false, pause: true })
        this.audio.pause();
    }

    render() {

        return (
            <div>
                <button onClick={this.play}>Play</button>
                <button onClick={this.pause}>Pause</button>
            </div>
        );
    }
}

export default AudioPlayer