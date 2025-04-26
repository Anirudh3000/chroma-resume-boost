
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          EventEase<span className="text-sm font-normal ml-1">Pro</span>
        </Link>

        {/* Search Bar - Only on larger screens */}
        <div className="hidden md:flex relative w-1/3">
          <Input 
            type="text" 
            placeholder="Search events..." 
            className="pr-8"
          />
          <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/events" className="hidden md:block text-gray-700 hover:text-primary">
            Browse Events
          </Link>
          <Link to="/create" className="hidden md:block text-gray-700 hover:text-primary">
            Create Event
          </Link>
          <Button size="sm" variant="outline" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
