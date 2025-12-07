import { useEffect, useRef } from 'react';
import './VideoGrid.css';

interface VideoGridProps {
    localStream: MediaStream | null;
    remoteStreams: Map<string, MediaStream>;
    localMuted: boolean;
    localVideoOff: boolean;
}

export function VideoGrid({ localStream, remoteStreams, localMuted, localVideoOff }: VideoGridProps) {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
        remoteStreams.forEach((stream, peerId) => {
            const videoElement = remoteVideoRefs.current.get(peerId);
            if (videoElement) {
                videoElement.srcObject = stream;
            }
        });
    }, [remoteStreams]);

    const remoteStreamArray = Array.from(remoteStreams.entries());

    return (
        <div className="video-grid">
            <div className={`video-container local ${remoteStreamArray.length > 0 ? 'small' : 'large'}`}>
                <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className={localVideoOff ? 'video-off' : ''}
                />
                <div className="video-label">You {localMuted && '🔇'}</div>
                {localVideoOff && (
import {useEffect, useRef} from 'react';
                import './VideoGrid.css';

                interface VideoGridProps {
                    localStream: MediaStream | null;
                remoteStreams: Map<string, MediaStream>;
                localMuted: boolean;
                localVideoOff: boolean;
}

                export function VideoGrid({localStream, remoteStreams, localMuted, localVideoOff}: VideoGridProps) {
    const localVideoRef = useRef<HTMLVideoElement>(null);
                    const remoteVideoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

    useEffect(() => {
        if (localVideoRef.current && localStream) {
                            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
                            remoteStreams.forEach((stream, peerId) => {
                                const videoElement = remoteVideoRefs.current.get(peerId);
                                if (videoElement) {
                                    videoElement.srcObject = stream;
                                }
                            });
    }, [remoteStreams]);

                        const remoteStreamArray = Array.from(remoteStreams.entries());

                        return (
                        <div className="video-grid">
                            <div className={`video-container local ${remoteStreamArray.length > 0 ? 'small' : 'large'}`}>
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className={localVideoOff ? 'video-off' : ''}
                                />
                                <div className="video-label">You {localMuted && '🔇'}</div>
                                {localVideoOff && (
                                    <div className="video-placeholder">
                                        <div className="avatar-placeholder">📷</div>
                                    </div>
                                )}
                            </div>

                            {remoteStreamArray.map(([peerId]) => (
                                <div key={peerId} className="video-container remote">
                                    <video
                                        ref={(el) => {
                                            if (el) remoteVideoRefs.current.set(peerId, el);
                                        }}
                                        autoPlay
                                        playsInline
                                    />
                                    <div className="video-label">Participant {peerId.substring(0, 4)}</div>
                                </div>
                            ))}
                        </div>
                        );
}
