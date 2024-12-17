import React from 'react';
import { Card } from '@nextui-org/react';
// This imports the functional component from the previous sample.
import VideoJS from './video.jsx';

const Video = () => {
    const playerRef = React.useRef(null);

    const videoJsOptions = {
        autoplay: true,
        controls: false,    // Desactiva los controles completos, incluyendo la barra de duración
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
            <Card >
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </Card>
        </>
    );
}

export default Video;