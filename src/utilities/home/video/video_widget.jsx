import React from 'react';
import { Card } from '@nextui-org/react';
// This imports the functional component from the previous sample.
import VideoJS from './video.jsx';
import videojs from 'video.js';

const Video = () => {
    const playerRef = React.useRef(null);

    const videoJsOptions = {
        autoplay: false,
        responsive: true,
        fluid: true,
        sources: [{
            src: 'src/utilities/home/video/video.mp4',
            type: 'video/mp4'
        }]
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    };

    return (
        <>
            <Card style={{ maxHeight: '510px', overflow: 'hidden' }}>
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </Card>
        </>
    );
}

export default Video;