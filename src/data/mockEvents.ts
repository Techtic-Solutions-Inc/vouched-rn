import { Event } from "../components/EventCard";

export const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Brews & Brawls",
    description:
      "Join us every Wednesday from 6PM to 12AM in the Nest for a laid-back night of Magic: The Gathering...",
    fullDescription:
      "Join us every Wednesday from 6PM to 12AM in the Nest for a laid-back night of Magic: The Gathering. Whether you're a seasoned planeswalker or just starting your journey, this is the perfect place to meet fellow players, trade cards, and enjoy some friendly competition. We'll have multiple tables set up for different formats, including Commander, Standard, and Modern. Food and drinks available for purchase. All skill levels welcome!",
    coverImage:
      "https://images.unsplash.com/photo-1651359729278-7fadd8d93152?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmluZ298ZW58MHx8MHx8fDA%3D",
    date: "2024-11-18",
    time: "6:00 PM",
    timezone: "EST",
    location: {
      venue: "St. Pete Brewing Company",
      address: "544 1st Ave N",
      city: "St. Petersburg",
      state: "FL",
      zipCode: "33701",
      coordinates: {
        latitude: 27.7676,
        longitude: -82.6403,
      },
    },
    eventType: "Games",
    interests: ["Gaming", "Social", "Trading Cards", "Competitive"],
    host: {
      name: "Magic Community Hub",
      avatar: require("../../assets/images/app_Icon.png"),
      bio: "A welcoming community for Magic: The Gathering enthusiasts.",
    },
    rsvpCount: 0,
    capacity: 50,
    price: 15,
    isFree: false,
    registrationLink: "https://example.com/register",
  },
  {
    id: "2",
    title: "Live Music Night",
    description:
      "Enjoy local bands performing live music every Friday night. Food and drinks available...",
    fullDescription:
      "Experience the vibrant local music scene every Friday night! We feature talented local bands and artists performing a variety of genres including rock, jazz, blues, and acoustic sets. The venue offers a cozy atmosphere perfect for music lovers. Food and drinks are available throughout the night. Come early to get a good spot, as the venue fills up quickly. This is a great opportunity to discover new artists and connect with fellow music enthusiasts in the community.",
    coverImage:
      "https://images.unsplash.com/photo-1618409698966-6caa2b95733a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRqfGVufDB8fDB8fHww",
    date: "2024-11-22",
    time: "8:00 PM",
    timezone: "EST",
    location: {
      venue: "The Music Hall",
      address: "123 Main St",
      city: "Tampa",
      state: "FL",
      zipCode: "33602",
      coordinates: {
        latitude: 27.9506,
        longitude: -82.4572,
      },
    },
    eventType: "Music",
    interests: ["Music", "Live Performance", "Social", "Entertainment"],
    host: {
      name: "Tampa Music Collective",
      avatar: require("../../assets/images/app_Icon.png"),
      bio: "Supporting local musicians and bringing the community together through music.",
    },
    rsvpCount: 25,
    capacity: 100,
    price: 20,
    isFree: false,
  },
  {
    id: "3",
    title: "Food Festival",
    description:
      "Sample food from 30+ local vendors. Free admission, pay as you go for food...",
    fullDescription:
      "Join us for the biggest food festival of the year! Sample delicious cuisine from over 30 local vendors, food trucks, and restaurants. From gourmet burgers to authentic international dishes, there's something for every palate. Free admission to the festival - you only pay for the food you want to try. Live cooking demonstrations, food competitions, and family-friendly activities throughout the day. Don't miss out on this culinary adventure!",
    coverImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&auto=format&fit=crop&w=1200&h=600",
    date: "2024-11-25",
    time: "12:00 PM",
    timezone: "EST",
    location: {
      venue: "Downtown Park",
      address: "500 Central Ave",
      city: "St. Petersburg",
      state: "FL",
      zipCode: "33701",
      coordinates: {
        latitude: 27.7676,
        longitude: -82.6403,
      },
    },
    eventType: "Food",
    interests: ["Food", "Festival", "Family Friendly", "Local Vendors"],
    host: {
      name: "St. Pete Food Network",
      avatar: require("../../assets/images/app_Icon.png"),
      bio: "Celebrating local food culture and bringing communities together.",
    },
    rsvpCount: 150,
    capacity: 500,
    price: 0,
    isFree: true,
  },
  {
    id: "4",
    title: "Tech Meetup",
    description:
      "Monthly meetup for developers. This month's topic: React Native and Expo...",
    fullDescription:
      "Join fellow developers for our monthly tech meetup! This month we're diving deep into React Native and Expo development. Learn about the latest features, best practices, and real-world implementation strategies. Our guest speaker will share insights from building production mobile apps. Network with other developers, share your projects, and get feedback from the community. Pizza and drinks provided. All skill levels welcome - whether you're just starting or a seasoned developer, there's something for everyone!",
    coverImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&auto=format&fit=crop&w=1200&h=600",
    date: "2024-12-01",
    time: "7:00 PM",
    timezone: "EST",
    location: {
      venue: "CoWork Space",
      address: "789 Innovation Dr",
      city: "Tampa",
      state: "FL",
      zipCode: "33607",
      coordinates: {
        latitude: 27.9506,
        longitude: -82.4572,
      },
    },
    eventType: "Tech",
    interests: ["Technology", "Programming", "Networking", "Learning"],
    host: {
      name: "Tampa Dev Community",
      avatar: require("../../assets/images/app_Icon.png"),
      bio: "Connecting developers and fostering innovation in the Tampa Bay area.",
    },
    rsvpCount: 45,
    capacity: 60,
    price: 0,
    isFree: true,
  },
];

// Helper function to get event by ID
export const getEventById = (id: string): Event | undefined => {
  return MOCK_EVENTS.find((event) => event.id === id);
};

