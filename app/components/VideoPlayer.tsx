"use client";

import { useRef, useState } from "react";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.duration) setProgress((v.currentTime / v.duration) * 100);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-xl aspect-video group">
      {/* Actual video element — uses a freely-licensed Big Buck Bunny clip */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setPlaying(false)}
        poster=""
        preload="metadata"
        playsInline
      >
        <source
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

      {/* Poster / initial state backdrop (shown before play) */}
      {!playing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900/90 to-violet-900/90">
          <p className="text-white/60 text-xs uppercase tracking-widest mb-4">Demo Video</p>
          <h3 className="text-white text-2xl font-bold mb-2">Web2PDF in 90 Seconds</h3>
          <p className="text-white/70 text-sm mb-8">See how Hint-sequencing captures every UI state</p>
        </div>
      )}

      {/*
        Veeva Hint: click action on the play/pause button.
        data-vv-action="click"   → simulate a click to start playback.
        data-vv-snapshot="after" → capture the page after the click,
                                   i.e. while the video is in the "playing" state,
                                   so the PDF shows the video mid-play frame rather
                                   than the poster.
      */}
      <button
        onClick={togglePlay}
        data-vv-action="click"
        data-vv-snapshot="after"
        className="absolute inset-0 flex items-center justify-center focus:outline-none"
        aria-label={playing ? "Pause video" : "Play video"}
      >
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm transition-all
            ${playing
              ? "bg-white/10 opacity-0 group-hover:opacity-100"
              : "bg-white/25 hover:bg-white/40 scale-100 hover:scale-110"
            }`}
        >
          {playing ? (
            /* Pause icon */
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            /* Play icon */
            <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-indigo-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
