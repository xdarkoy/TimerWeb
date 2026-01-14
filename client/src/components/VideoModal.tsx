import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
        <DialogHeader className="sr-only">
          <DialogTitle>Timer Demo Video</DialogTitle>
        </DialogHeader>
        
        {/* Video Container */}
        <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20">
          {/* Placeholder for actual video - replace with real video embed */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 hover:bg-white/30 transition-colors cursor-pointer">
              <Play className="w-10 h-10 text-white ml-1" />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Timer Produkt-Demo
            </h3>
            <p className="text-white/70 text-center max-w-md px-4">
              Sehen Sie, wie Timer Ihre Zeiterfassung revolutioniert. 
              Dieses Video zeigt alle wichtigen Funktionen in unter 3 Minuten.
            </p>
            
            {/* Demo Video Sections Preview */}
            <div className="mt-8 grid grid-cols-4 gap-4 px-8 w-full max-w-2xl">
              {[
                { time: '0:00', label: 'Dashboard' },
                { time: '0:45', label: 'Zeiterfassung' },
                { time: '1:30', label: 'Abwesenheiten' },
                { time: '2:15', label: 'Berichte' },
              ].map((section) => (
                <div 
                  key={section.time}
                  className="text-center p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <div className="text-xs text-white/50 mb-1">{section.time}</div>
                  <div className="text-sm font-medium">{section.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* When you have a real video, replace the above with:
          <iframe
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
