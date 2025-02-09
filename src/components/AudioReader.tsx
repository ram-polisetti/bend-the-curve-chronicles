import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, FastForward } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';

interface AudioReaderProps {
  content: string;
  summary: string;
  onHighlight: (paragraphIndex: number) => void;
}

// Helper function to format time
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const AudioReader = ({ content, summary, onHighlight }: AudioReaderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isSummaryMode, setIsSummaryMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Calculate total paragraphs for progress tracking
  const totalParagraphs = content.split('\n').length;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgress = (value: number) => {
    setProgress(value);
    const paragraphIndex = Math.floor((value / 100) * totalParagraphs);
    onHighlight(paragraphIndex);
    // Update current time based on progress
    if (duration) {
      setCurrentTime((value / 100) * duration);
    }
  };

  const source = "BendTheCurve.today";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black py-4 px-6 shadow-lg z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Play Controls */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="h-10 w-10 rounded-full hover:bg-gray-100"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            {/* Summary Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                checked={isSummaryMode}
                onCheckedChange={setIsSummaryMode}
              />
              <span className="text-sm font-serif">
                {isSummaryMode ? 'Summary' : 'Full Article'}
              </span>
            </div>

            {/* Fast Forward to Summary */}
            {!isSummaryMode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSummaryMode(true)}
                className="text-sm"
              >
                <FastForward className="h-4 w-4 mr-2" />
                Skip to Summary
              </Button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="flex-1 mx-8">
            <Slider
              value={[progress]}
              onValueChange={([value]) => handleProgress(value)}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="hover:bg-gray-100"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume * 100]}
              onValueChange={([value]) => {
                setVolume(value / 100);
                setIsMuted(value === 0);
              }}
              max={100}
              step={1}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 