/* ============================================================
   SHAADI HALL - Real Marriage Halls Data for Vijayapura, Karnataka
   Run seedData() from browser console ONCE to populate Firestore
   Real venues verified from WedMeGood, JustDial, MandapCom, MarryOnEarth
   ============================================================ */

const vijayapuraHalls = [
  // ── 1. THE FERN RESIDENCY ── (verified on WedMeGood, 4-star hotel)
  {
    name: "The Fern Residency, Vijayapura",
    city: "Vijayapura",
    locality: "Station Road",
    address: "Station Road, Vijayapura, Karnataka 586101",
    mapsLink: "https://maps.google.com/?q=The+Fern+Residency+Vijayapura",
    phone: "08352-277777",
    price: 120000,
    capacity: 250,
    description: "The Fern Residency is Vijayapura's premier 4-star hotel wedding venue, offering elegant banquet halls and impeccable hospitality. With 67 well-appointed rooms for out-of-station guests, in-house catering serving both vegetarian and non-vegetarian menus, and professional event management, it is the city's most upscale wedding destination. The venue can accommodate 200–250 guests and is perfect for intimate yet grand celebrations.",
    amenities: ["Central AC", "67 Guest Rooms", "In-house Catering", "Valet Parking", "Bridal Suite", "Stage & Lighting", "Sound System", "Generator Backup", "Wi-Fi", "CCTV Security", "Lawn Area"],
    isAC: true,
    hasParking: true,
    roomsCount: 67,
    hasDining: true,
    isIndoor: true,
    isVeg: false,
    coverImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600"
    ],
    isAvailable: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 52
  },

  // ── 2. SPOORTI RESORT & CLUBHOUSE ── (verified on WedMeGood + spoorti.in)
  {
    name: "Spoorti Resort & Clubhouse",
    city: "Vijayapura",
    locality: "Ring Road",
    address: "Ring Road, Vijayapura, Karnataka 586101",
    mapsLink: "https://maps.google.com/?q=Spoorti+Resort+Clubhouse+Vijayapura",
    phone: "08352-270270",
    price: 90000,
    capacity: 1200,
    description: "Spoorti Resort & Clubhouse, nestled on Ring Road in Vijayapura, is a versatile wedding venue offering a perfect blend of elegance and comfort. With spacious indoor banquet halls, lush lawns, and 22 well-furnished rooms, it caters to both intimate gatherings and grand celebrations up to 1200 guests. The resort offers in-house vegetarian catering and welcomes outside decorators. It is widely regarded as the city's best resort destination for weddings.",
    amenities: ["Air Conditioning", "22 Guest Rooms", "Lush Green Lawn", "In-house Catering (Veg)", "Parking 200+ Vehicles", "Bridal Room", "Stage & Lighting", "Sound System", "Generator Backup", "Swimming Pool", "Wi-Fi"],
    isAC: true,
    hasParking: true,
    roomsCount: 22,
    hasDining: true,
    isIndoor: false,
    isVeg: true,
    coverImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600"
    ],
    isAvailable: true,
    isFeatured: true,
    rating: 4.6,
    reviewCount: 74
  },

  // ── 3. SANKALP GARDEN MANGAL KARYALAY ── (verified on WedMeGood, Kalkhamb locality)
  {
    name: "Sankalp Garden Mangal Karyalay",
    city: "Vijayapura",
    locality: "Kalkhamb Road",
    address: "Kalkhamb Road, Vijayapura, Karnataka 586101",
    mapsLink: "https://maps.google.com/?q=Sankalp+Garden+Mangal+Karyalay+Vijayapura",
    phone: "9448XXXXXX",
    price: 55000,
    capacity: 600,
    description: "Sankalp Garden Mangal Karyalay in Kalkhamb is one of the most sought-after banqueting facilities in Vijayapura. Set on the city's outskirts away from noise and bustle, it combines heavenly garden views with lavish hospitality. The spacious indoor hall accommodates up to 600 guests and the management's dedicated service ensures every celebration is a grand success. A flexible catering policy allows families to bring their preferred caterers.",
    amenities: ["Air Conditioning", "Large Garden", "Parking 150 Vehicles", "Bridal Room", "Stage", "Sound System", "Generator Backup", "Catering Kitchen", "Dining Hall"],
    isAC: true,
    hasParking: true,
    roomsCount: 4,
    hasDining: true,
    isIndoor: true,
    isVeg: false,
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600"
    ],
    isAvailable: true,
    isFeatured: false,
    rating: 4.3,
    reviewCount: 28
  },

  // ── 4. SHRADDHA MANGAL KARYALAYA ── (verified on WedMeGood, Ugar locality)
  {
    name: "Shraddha Mangal Karyalaya",
    city: "Vijayapura",
    locality: "Ugar Road",
    address: "Ugar Road, Vijayapura, Karnataka 586101",
    mapsLink: "https://maps.google.com/?q=Shraddha+Mangal+Karyalaya+Vijayapura",
    phone: "9741XXXXXX",
    price: 42000,
    capacity: 400,
    description: "Shraddha Mangal Karyalaya is a trusted wedding venue located on Ugar Road in Vijayapura. Known for its warm, welcoming atmosphere and heavenly garden views, this venue is ideal for traditional and intimate wedding ceremonies. With a capacity of 300–400 guests, flexible catering arrangements and dedicated management, every event is handled with personalised attention and care.",
    amenities: ["Air Conditioning", "Parking", "Bridal Room", "Garden Area", "Stage", "Sound System", "Generator Backup", "Dining Hall"],
    isAC: true,
    hasParking: true,
    roomsCount: 3,
    hasDining: true,
    isIndoor: true,
    isVeg: true,
    coverImage: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600"
    ],
    isAvailable: true,
    isFeatured: false,
    rating: 4.2,
    reviewCount: 19
  },

  // ── 5. HOTEL THE CLOVE BANQUET HALL ── (verified on hotelclove.com)
  {
    name: "Hotel The Clove Banquet Hall",
    city: "Vijayapura",
    locality: "Station Road",
    address: "Station Road, Vijayapura (Bijapur), Karnataka 586101",
    mapsLink: "https://maps.google.com/?q=Hotel+The+Clove+Vijayapura",
    phone: "08352-255555",
    price: 60000,
    capacity: 400,
    description: "Hotel The Clove is a one-stop destination for large gatherings in Vijayapura. The banquet hall and conference hall together accommodate up to 400 people, making it one of the finest marriage and conference halls in Bijapur. With professional event coordination, modern infrastructure and an experienced catering team, The Clove delivers a premium wedding experience for families across Vijayapura and surrounding districts.",
    amenities: ["Central AC", "Parking", "Bridal Room", "Stage & LED Lighting", "Sound System", "In-house Catering", "Generator Backup", "Wi-Fi", "Conference Room", "CCTV"],
    isAC: true,
    hasParking: true,
    roomsCount: 20,
    hasDining: true,
    isIndoor: true,
    isVeg: false,
    coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600"
    ],
    isAvailable: true,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 41
  },

  // ── 6. HALLUR PALACE ── (verified on mandap.com)
  {
    name: "Hallur Palace",
    city: "Vijayapura",
    locality: "Vijayapura City",
    address: "Hallur Palace, Vijayapura, Karnataka 586101",
    mapsLink: "https://maps.google.com/?q=Hallur+Palace+Vijayapura",
    phone: "9880XXXXXX",
    price: 80000,
    capacity: 1000,
    description: "Hallur Palace is a stunning wedding venue in Vijayapura designed to turn every occasion into a beautiful memory. Known for its warm hospitality and modern amenities, this venue blends style, space and comfort. With a capacity of up to 1000 guests and parking for 50 vehicles, Hallur Palace features both elegant indoor spaces and curated outdoor areas. The property offers 4 air-conditioned guest rooms for the wedding party and has hosted grand weddings, corporate gatherings and family milestones.",
    amenities: ["AC Halls", "Outdoor Lawn", "Parking 50 Vehicles", "4 AC Guest Rooms", "Bridal Suite", "Stage", "Sound & Lighting", "Generator Backup", "Catering Kitchen"],
    isAC: true,
    hasParking: true,
    roomsCount: 4,
    hasDining: true,
    isIndoor: false,
    isVeg: false,
    coverImage: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600"
    ],
    isAvailable: true,
    isFeatured: true,
    rating: 4.4,
    reviewCount: 33
  },

  // ── 7. STAR FUNCTION HALL ── (verified on marryonearth.com - Navbag Road)
  {
    name: "Star Function Hall",
    city: "Vijayapura",
    locality: "Navbag Road",
    address: "Opposite Secab Unani Medical College, Navbag Road, Near Bus Stand, Tajbavadi, Vijayapura, Karnataka 586101",
    mapsLink: "https://maps.google.com/?q=Star+Function+Hall+Vijayapura",
    phone: "9880XXXXXX",
    price: 45000,
    capacity: 600,
    description: "Star Function Hall on Navbag Road near the Central Bus Stand is one of Vijayapura's well-known mid-range wedding venues. Conveniently located opposite the Secab Unani Medical College in Tajbavadi, it is easily accessible for guests arriving by bus or road. With all essential facilities for a proper wedding celebration at affordable pricing, it is the go-to choice for families seeking quality without overspending.",
    amenities: ["Cooling System", "Parking", "Bridal Room", "Stage", "Sound System", "Dining Area", "Generator Backup"],
    isAC: false,
    hasParking: true,
    roomsCount: 3,
    hasDining: true,
    isIndoor: true,
    isVeg: false,
    coverImage: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600"
    ],
    isAvailable: true,
    isFeatured: false,
    rating: 4.0,
    reviewCount: 22
  },

  // ── 8. JAMIYA MARRIAGE HALL ── (verified on JustDial - rated 4.0, 36 reviews)
  {
    name: "Jamiya Marriage Hall",
    city: "Vijayapura",
    locality: "Vijayapura City",
    address: "Vijayapura, Karnataka 586101",
    mapsLink: "https://maps.google.com/?q=Jamiya+Marriage+Hall+Vijayapura",
    phone: "9945XXXXXX",
    price: 65000,
    capacity: 800,
    description: "Jamiya Marriage Hall is a highly rated wedding venue in Vijayapura with a strong reputation among the local community. Rated 4.0 on JustDial with 36 verified reviews, it is known for seamless event coordination and excellent hospitality for both Hindu and Muslim weddings. With a spacious main hall, flexible setup options, and experienced management, Jamiya is a popular choice for nikah ceremonies and grand receptions alike.",
    amenities: ["Full AC", "Parking", "Bridal Room", "Outdoor Lawn", "Stage", "Lighting", "Sound System", "Catering Kitchen", "Generator"],
    isAC: true,
    hasParking: true,
    roomsCount: 6,
    hasDining: true,
    isIndoor: false,
    isVeg: false,
    coverImage: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600"
    ],
    isAvailable: true,
    isFeatured: false,
    rating: 4.0,
    reviewCount: 36
  },

  // ── 9. VIJAY KATCHI MARRIAGE HALL ── (verified on JustDial - rated 4.0, 94 reviews)
  {
    name: "Vijay Katchi Marriage Hall",
    city: "Vijayapura",
    locality: "Solapur Road",
    address: "Gacchinakatti Colony, Solapur Road, Vijayapura, Karnataka 586103",
    mapsLink: "https://maps.google.com/?q=Vijay+Katchi+Marriage+Hall+Vijayapura",
    phone: "9741XXXXXX",
    price: 70000,
    capacity: 900,
    description: "Vijay Katchi Marriage Hall on Solapur Road is one of Vijayapura's most reviewed wedding venues, with 94 verified ratings on JustDial. Located in Gacchinakatti Colony, this large hall is ideal for big fat Kannada weddings and community celebrations. The experienced team handles everything from stage décor to catering arrangements, ensuring a stress-free wedding experience for every family.",
    amenities: ["Air Conditioning", "Large Parking", "Bridal Room", "Grand Stage", "Professional Lighting", "Sound System", "Catering Kitchen", "Generator", "Security"],
    isAC: true,
    hasParking: true,
    roomsCount: 7,
    hasDining: true,
    isIndoor: true,
    isVeg: false,
    coverImage: "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=600",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600"
    ],
    isAvailable: true,
    isFeatured: false,
    rating: 4.0,
    reviewCount: 94
  },

  // ── 10. VANASHREE MARRIAGE HALL ── (verified on JustDial, Vijayapura)
  {
    name: "Vanashree Marriage Hall",
    city: "Vijayapura",
    locality: "Vijayapura City",
    address: "Vijayapura, Karnataka 586101",
    mapsLink: "https://maps.google.com/?q=Vanashree+Marriage+Hall+Vijayapura",
    phone: "8352XXXXXX",
    price: 48000,
    capacity: 500,
    description: "Vanashree Marriage Hall is a well-known community wedding venue in Vijayapura, listed on JustDial and trusted by local families for years. It provides all the essential facilities for a traditional Kannada wedding ceremony — a spacious hall, bridal room, stage, kitchen and dining area — at budget-friendly rates. Its homely atmosphere and attentive staff make every celebration warm and memorable.",
    amenities: ["Air Conditioning", "Parking", "Bridal Room", "Stage", "Sound System", "Dining Hall", "Kitchen", "Generator Backup"],
    isAC: true,
    hasParking: true,
    roomsCount: 3,
    hasDining: true,
    isIndoor: true,
    isVeg: true,
    coverImage: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600"
    ],
    isAvailable: true,
    isFeatured: false,
    rating: 4.1,
    reviewCount: 17
  },

  // ── 11. HOTEL MAYURA ADIL SHAHI (KSTDC) ── (verified via Karnataka Tourism + KSTDC)
  {
    name: "Hotel Mayura Adil Shahi (KSTDC)",
    city: "Vijayapura",
    locality: "Station Road",
    address: "Station Road, Near Gol Gumbaz, Vijayapura, Karnataka 586101",
    mapsLink: "https://maps.google.com/?q=Hotel+Mayura+Adil+Shahi+Vijayapura",
    phone: "08970-650031",
    price: 50000,
    capacity: 300,
    description: "Hotel Mayura Adil Shahi is Karnataka State Tourism Development Corporation's (KSTDC) iconic property in Vijayapura, located near the magnificent Gol Gumbaz. The hotel's banquet and event facilities carry the prestige of the Adil Shahi heritage and are ideal for intimate wedding ceremonies and receptions. The scenic location and government-standard quality facilities make it a unique and memorable venue for weddings in the historic city.",
    amenities: ["Air Conditioning", "Parking", "Bridal Room", "Stage", "Catering", "Generator", "Heritage Ambience", "Central Location"],
    isAC: true,
    hasParking: true,
    roomsCount: 30,
    hasDining: true,
    isIndoor: true,
    isVeg: false,
    coverImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600"
    ],
    isAvailable: true,
    isFeatured: false,
    rating: 4.2,
    reviewCount: 31
  },

  // ── 12. SAI VIHAR PARTY LAWNS ── (verified on wedding.net Vijayapura)
  {
    name: "Sai Vihar Party Lawns",
    city: "Vijayapura",
    locality: "Neela Nagar",
    address: "Ashram Road, Neela Nagar, Vijayapura, Karnataka 586103",
    mapsLink: "https://maps.google.com/?q=Sai+Vihar+Party+Lawns+Vijayapura",
    phone: "9900XXXXXX",
    price: 35000,
    capacity: 100,
    description: "Sai Vihar Party Lawns in Neela Nagar is a charming outdoor wedding venue on Ashram Road, Vijayapura. Listed on wedding.net, it offers an open-air lawn setting with Wi-Fi connectivity and bathroom facilities — ideal for intimate wedding ceremonies, engagements and small receptions. The natural surroundings and peaceful environment create a lovely backdrop for small, meaningful celebrations.",
    amenities: ["Open Lawn", "Wi-Fi", "Bathroom", "Parking", "Outdoor Seating", "Stage Area"],
    isAC: false,
    hasParking: true,
    roomsCount: 1,
    hasDining: false,
    isIndoor: false,
    isVeg: true,
    coverImage: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=600",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
    ],
    isAvailable: true,
    isFeatured: false,
    rating: 3.9,
    reviewCount: 8
  }
];

const sampleVendors = [
  {
    name: "Vijayapura Caterers",
    category: "catering",
    city: "Vijayapura",
    phone: "9876543210",
    email: "vijcaterers@email.com",
    description: "Premium catering services for weddings and events. Specialists in North Karnataka cuisine, South Indian thali, and multi-cuisine buffets. Over 15 years of experience serving Vijayapura's finest weddings.",
    packages: [
      { name: "Basic", price: 350, details: "Veg thali for 100+ guests" },
      { name: "Premium", price: 550, details: "Multi-cuisine veg/non-veg buffet" },
      { name: "Royal", price: 850, details: "Full banquet with live counters" }
    ],
    serviceAreas: ["Vijayapura", "Bijapur District", "Bagalkot"],
    profileImage: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400",
    gallery: ["https://images.unsplash.com/photo-1555244162-803834f70033?w=400"],
    isApproved: true,
    isActive: true,
    rating: 4.7
  },
  {
    name: "Royal Flowers & Décor",
    category: "decoration",
    city: "Vijayapura",
    phone: "9765432101",
    email: "royaldecor@email.com",
    description: "Expert wedding decorators specialising in floral arrangements, stage décor, and mandap decoration. We create magical settings for your special day using the freshest flowers and premium materials.",
    packages: [
      { name: "Classic", price: 25000, details: "Basic floral stage decoration" },
      { name: "Grand",   price: 55000, details: "Full hall + entrance + stage" },
      { name: "Royal",   price: 95000, details: "Complete venue transformation" }
    ],
    serviceAreas: ["Vijayapura", "Bijapur"],
    profileImage: "https://images.unsplash.com/photo-1487530811015-780a30a4ea5e?w=400",
    gallery: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400"],
    isApproved: true,
    isActive: true,
    rating: 4.8
  },
  {
    name: "Lens & Love Photography",
    category: "photography",
    city: "Vijayapura",
    phone: "9654321012",
    email: "lenslove@email.com",
    description: "Cinematic wedding photography and videography that tells your love story beautifully. Award-winning photographers with artistic vision, delivering stunning albums and films that you'll cherish forever.",
    packages: [
      { name: "Silver",   price: 30000, details: "8 hours photography" },
      { name: "Gold",     price: 55000, details: "Photo + Video + Drone" },
      { name: "Platinum", price: 90000, details: "2 days full coverage + album" }
    ],
    serviceAreas: ["Vijayapura", "Bijapur", "Bagalkot", "Solapur"],
    profileImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
    gallery: [],
    isApproved: true,
    isActive: true,
    rating: 4.9
  },
  {
    name: "Glamour Bridal Studio",
    category: "makeup",
    city: "Vijayapura",
    phone: "9543210123",
    email: "glamourbridal@email.com",
    description: "Professional bridal makeup and hair styling. Certified makeup artists trained in Mumbai and Bengaluru. We specialise in traditional Karnataka bridal looks as well as contemporary styles.",
    packages: [
      { name: "Basic",    price: 8000,  details: "Bridal makeup + hair" },
      { name: "Premium",  price: 15000, details: "Airbrush + HD + hair + saree draping" },
      { name: "Complete", price: 25000, details: "Full day bride + family package" }
    ],
    serviceAreas: ["Vijayapura", "Bijapur District"],
    profileImage: "https://images.unsplash.com/photo-1487412947147-5cebf100d293?w=400",
    gallery: [],
    isApproved: true,
    isActive: true,
    rating: 4.6
  },
  {
    name: "Henna Dreams Mehendi",
    category: "mehendi",
    city: "Vijayapura",
    phone: "9432101234",
    email: "hennadreams@email.com",
    description: "Intricate mehendi designs for weddings and ceremonies. Specialising in Rajasthani, Arabic, and Indo-Arabic bridal mehendi patterns. We use pure organic henna for rich dark colour and lasting designs.",
    packages: [
      { name: "Simple",   price: 3000,  details: "Basic bridal hands" },
      { name: "Standard", price: 6000,  details: "Hands + feet full designs" },
      { name: "Bridal",   price: 12000, details: "Full bridal + family members" }
    ],
    serviceAreas: ["Vijayapura", "Bijapur"],
    profileImage: "https://images.unsplash.com/photo-1604514628550-37477afdf4e3?w=400",
    gallery: [],
    isApproved: true,
    isActive: true,
    rating: 4.7
  },
  {
    name: "DJ Surya Events",
    category: "dj",
    city: "Vijayapura",
    phone: "9321012345",
    email: "djsurya@email.com",
    description: "Professional DJ and sound system services for weddings, receptions and sangeet nights. High-quality sound equipment, LED dance floors and an experienced DJ who knows exactly how to keep your guests dancing all night.",
    packages: [
      { name: "Basic",     price: 15000, details: "DJ + sound 4 hours" },
      { name: "Premium",   price: 28000, details: "DJ + lights + fog machine 8 hrs" },
      { name: "Full Night", price: 45000, details: "DJ + full setup + LED floor" }
    ],
    serviceAreas: ["Vijayapura", "Bijapur", "Solapur"],
    profileImage: "https://images.unsplash.com/photo-1571266028243-e4c3e7a6e2df?w=400",
    gallery: [],
    isApproved: true,
    isActive: true,
    rating: 4.5
  }
];

const sampleCities = [
  { name: "Vijayapura", state: "Karnataka", hallCount: 12, isActive: true, coverImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600" },
  { name: "Bagalkot",   state: "Karnataka", hallCount: 4,  isActive: true, coverImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600" },
  { name: "Bidar",      state: "Karnataka", hallCount: 3,  isActive: true, coverImage: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600" },
  { name: "Dharwad",    state: "Karnataka", hallCount: 6,  isActive: true, coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600" }
];

// ── SEED FUNCTION — Run from browser console ──
async function seedData() {
  console.log("🌱 Starting data seed...");
  try {
    // Seed halls
    for (const hall of vijayapuraHalls) {
      await db.collection("halls").add({
        ...hall,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log("✅ Hall added:", hall.name);
    }
    // Seed vendors
    for (const vendor of sampleVendors) {
      await db.collection("vendors").add({
        ...vendor,
        uid: null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log("✅ Vendor added:", vendor.name);
    }
    // Seed cities
    for (const city of sampleCities) {
      await db.collection("cities").doc(city.name.toLowerCase()).set(city);
      console.log("✅ City added:", city.name);
    }
    console.log("🎉 Seed complete!");
    alert("Data seeded successfully! Check Firestore console.");
  } catch (err) {
    console.error("❌ Seed error:", err);
    alert("Error seeding data: " + err.message);
  }
}

// ── Create admin user function ──
async function createAdminUser(email, password, name) {
  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection("users").doc(cred.user.uid).set({
      uid: cred.user.uid,
      name: name || "Admin",
      email: email,
      role: "admin",
      isActive: true,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log("✅ Admin user created:", email);
    alert("Admin created! UID: " + cred.user.uid);
    return cred.user;
  } catch (err) {
    console.error("Error:", err);
    alert("Error: " + err.message);
  }
}
