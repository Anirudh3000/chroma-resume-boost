
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  price: string;
  category: string;
}

const EventCard = ({ id, title, date, location, image, price, category }: EventCardProps) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md text-xs font-medium text-primary">
          {category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <Calendar className="h-4 w-4 mr-1" /> {date}
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-1">{location}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold">{price}</span>
          <Button asChild size="sm">
            <Link to={`/event/${id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
