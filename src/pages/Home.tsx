
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import EventCard from "@/components/EventCard";
import FeaturedEvent from "@/components/FeaturedEvent";
import { Separator } from "@/components/ui/separator";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Featured Event */}
      <section className="container mx-auto py-6 px-4">
        <FeaturedEvent 
          id="featured-1"
          title="Summer Music Festival 2025" 
          description="The biggest outdoor music festival returns with top artists from around the world. Don't miss three days of amazing performances, food, and unforgettable experiences!"
          date="June 15-17, 2025"
          location="Central Park, New York"
          image="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop"
        />
      </section>

      {/* Trending Events Section */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Trending Today</h2>
          <Link to="/events" className="text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-sm p-4 text-center cursor-pointer hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                {category.icon}
              </div>
              <h3 className="font-medium">{category.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Upcoming Events Section */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Link to="/events" className="text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-purple py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to host your own event?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers who use EventEase Pro to manage and promote their events
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
            <Link to="/create">Create Your Event</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">EventEase<span className="text-xs font-normal ml-1">Pro</span></h3>
              <p className="text-gray-600">
                Discover and book events that match your interests.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Event Organizers</a></li>
                <li><a href="#" className="hover:text-primary">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-primary">Twitter</a></li>
                <li><a href="#" className="hover:text-primary">Facebook</a></li>
                <li><a href="#" className="hover:text-primary">Instagram</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-gray-600 text-sm">
            © 2025 EventEase Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Sample data
const trendingEvents = [
  {
    id: "1",
    title: "Web Development Workshop",
    date: "May 10, 2025",
    location: "Tech Hub, San Francisco",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1470&auto=format&fit=crop",
    price: "$25",
    category: "Tech"
  },
  {
    id: "2",
    title: "Art & Wine Festival",
    date: "May 15, 2025",
    location: "Downtown Gallery, Chicago",
    image: "https://images.unsplash.com/photo-1550123217-aad93a4b5989?q=80&w=1470&auto=format&fit=crop",
    price: "$15",
    category: "Art"
  },
  {
    id: "3",
    title: "Business Networking Lunch",
    date: "May 20, 2025",
    location: "Grand Hotel, New York",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1374&auto=format&fit=crop",
    price: "$40",
    category: "Business"
  },
  {
    id: "4",
    title: "Yoga in the Park",
    date: "May 22, 2025",
    location: "Central Park, New York",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1470&auto=format&fit=crop",
    price: "Free",
    category: "Health"
  }
];

const upcomingEvents = [
  {
    id: "5",
    title: "Photography Masterclass",
    date: "June 5, 2025",
    location: "Creative Studio, Los Angeles",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1364&auto=format&fit=crop",
    price: "$35",
    category: "Art"
  },
  {
    id: "6",
    title: "Startup Pitch Competition",
    date: "June 12, 2025",
    location: "Innovation Center, Boston",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1470&auto=format&fit=crop",
    price: "$10",
    category: "Business"
  },
  {
    id: "7",
    title: "Food Truck Festival",
    date: "June 18, 2025",
    location: "Riverfront Park, Austin",
    image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?q=80&w=1471&auto=format&fit=crop",
    price: "$5",
    category: "Food"
  },
  {
    id: "8",
    title: "Indie Film Screening",
    date: "June 23, 2025",
    location: "Arts Theater, Portland",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1425&auto=format&fit=crop",
    price: "$15",
    category: "Entertainment"
  }
];

// Category icons using SVG elements for simplicity
const categories = [
  {
    name: "Music",
    icon: <svg className="w-6 h-6 text-primary" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
  },
  {
    name: "Tech",
    icon: <svg className="w-6 h-6 text-primary" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
  },
  {
    name: "Business",
    icon: <svg className="w-6 h-6 text-primary" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
  },
  {
    name: "Food",
    icon: <svg className="w-6 h-6 text-primary" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
  },
  {
    name: "Health",
    icon: <svg className="w-6 h-6 text-primary" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
  },
  {
    name: "Art",
    icon: <svg className="w-6 h-6 text-primary" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
  }
];

export default Home;
