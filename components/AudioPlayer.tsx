
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
    };

    // Add error listener to debug loading issues
    const handleError = (e: Event) => {
        console.error("Audio loading error:", audio.error);
        setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      }
    }
  };
  
  const toggleMute = () => {
      if (audioRef.current) {
          audioRef.current.muted = !isMuted;
          setIsMuted(!isMuted);
      }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!audioRef.current || !audioRef.current.duration) return;
      const bar = e.currentTarget;
      const rect = bar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
  };
  
  const formatTime = (seconds: number) => {
      if (isNaN(seconds)) return "0:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full mt-auto pt-6">
        <div className="bg-black/30 border border-white/10 rounded-xl p-4 flex items-center gap-4 backdrop-blur-md group/player hover:border-accent/30 transition-all duration-500">
            {/* Added preload and crossorigin for better robustness */}
            <audio 
                ref={audioRef} 
                src={src} 
                preload="metadata" 
                crossOrigin="anonymous" 
            />
            
            {/* Play/Pause Button */}
            <button 
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-accent text-black flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0 shadow-[0_0_15px_rgba(204,255,0,0.1)] hover:shadow-[0_0_25px_rgba(204,255,0,0.4)]"
            >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
            </button>

            {/* Main Controls */}
            <div className="flex-1 flex flex-col justify-center gap-2.5">
                {/* Visualizer & Title Row */}
                <div className="flex items-center justify-between h-3">
                    {/* Visualizer Bars */}
                    <div className="flex items-end gap-[2px] h-full">
                        {[...Array(12)].map((_, i) => (
                            <div 
                                key={i} 
                                className={`w-1 bg-accent/80 rounded-t-[1px] transition-all duration-300 ${isPlaying ? 'animate-music-bar' : 'h-1 bg-white/10'}`}
                                style={{ 
                                    animationDelay: `${i * 0.05}s`,
                                    animationDuration: '0.8s'
                                }}
                            ></div>
                        ))}
                    </div>
                    
                    <div className="text-[9px] font-sans uppercase tracking-widest text-accent opacity-80">
                        {isPlaying ? 'Now Playing' : 'Paused'}
                    </div>
                </div>
                
                {/* Progress Bar */}
                <div 
                    className="h-1 bg-white/10 rounded-full cursor-pointer relative group/bar py-1"
                    onClick={handleSeek}
                >
                    {/* Touch Target / Hitbox is bigger via py-1 but visible line is h-1 */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-full h-[2px] bg-white/10 rounded-full"></div>
                    <div 
                        className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-accent rounded-full transition-all duration-100 relative"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity shadow-[0_0_10px_rgba(204,255,0,0.8)]"></div>
                    </div>
                </div>
                
                <div className="flex justify-between text-[9px] font-sans tracking-widest text-secondary uppercase">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume Toggle */}
            <button onClick={toggleMute} className="text-secondary hover:text-white transition-colors w-8 flex justify-end">
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
        </div>
    </div>
  );
};

export default AudioPlayer;
