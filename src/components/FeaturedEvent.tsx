
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedEventProps {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

const FeaturedEvent = ({ id, title, description, date, location, image }: FeaturedEventProps) => {
  return (
    <div className="relative h-[500px] rounded-3xl overflow-hidden">
      {/* Background image with overlay gradient */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 text-white">
        <div className="bg-primary/90 inline-block px-4 py-1 rounded-full text-sm font-medium mb-4">
          Featured Event
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">{title}</h1>
        <p className="mb-6 text-white/80 max-w-2xl line-clamp-3">{description}</p>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-6">
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to={`/event/${id}`}>Get Tickets</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-black/30 border-white hover:bg-black/50">
            <Link to={`/event/${id}`}>Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent;
