
import { useState } from "react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";

export const NewsHeader = () => {
  const [showLookup, setShowLookup] = useState(false);

  // Calculate volume and issue number based on date
  const calculateVolumeAndIssue = () => {
    const startDate = new Date('2025-03-01');
    const currentDate = new Date();
    
    // Calculate the difference in days
    const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Volume increases every year (365 days)
    const volume = Math.floor(diffDays / 365) + 1;
    
    // Issue number increases every day
    const issueNumber = (diffDays % 365) + 1;
    
    return { volume, issueNumber };
  };

  const { volume, issueNumber } = calculateVolumeAndIssue();

  return (
    <header className="py-8 px-4 animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="font-serif text-4xl md:text-6xl text-newspaper-primary tracking-tight">
          BENDTHECURVE.TODAY
        </h1>
        <div className="flex justify-center items-center gap-4 font-serif text-newspaper-secondary mt-2 text-sm">
          <p>
            VOL. {volume} NO. {issueNumber}
          </p>
          <span>|</span>
          <p>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <span>|</span>
          <Button 
            variant="link" 
            className="text-newspaper-secondary hover:text-newspaper-primary p-0 h-auto"
            onClick={() => setShowLookup(true)}
          >
            Look up past issues
          </Button>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-newspaper-muted h-4 w-4" />
          <Input 
            type="search"
            placeholder="Search articles..."
            className="pl-8 bg-white border-newspaper-border text-newspaper-primary"
          />
        </div>
      </div>

      <Dialog open={showLookup} onOpenChange={setShowLookup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Look Up Past Issues</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="volume">Volume</Label>
                <Input
                  id="volume"
                  type="number"
                  min="1"
                  max={volume}
                  className="mt-1"
                  placeholder="Enter volume..."
                />
              </div>
              <div>
                <Label htmlFor="issue">Issue Number</Label>
                <Input
                  id="issue"
                  type="number"
                  min="1"
                  max="365"
                  className="mt-1"
                  placeholder="Enter issue number..."
                />
              </div>
            </div>
            <Button className="w-full">
              Find Issue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Separator className="bg-newspaper-border" />
    </header>
  );
};
