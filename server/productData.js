export function getProduct(productId) {
  let mathingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        mathingProduct = product;
      }
    });

    return mathingProduct;
}

export class Product {
  id;
  image;
  name;
  rating;
  price;
  description;
  keywords;
  seller;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.price = productDetails.price;
    this.description = productDetails.description;
    this.keywords = productDetails.keywords;
    this.seller = productDetails.seller;
  }

  getStars() {
    return `../images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `₹ ${this.price}`;
  }

  getKeywords() {
    return `# ${this.keywords.join(", # ")} `;
  }

  extraInfoHTML() {
    return '';
  }
}

class Clothing extends Product{
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
      <a href="/sizeChartLink" class="size-chart-link">Size Chart</a>
    `;
  }
}

export const products = [
  {
    id: "0d7f9qha-4efe-4r89-r0ff-ba8363e0a642",
    image: "/images/products/retro_speaker.png",
    name: "Retro Bluetooth Speaker with Pixel Display",
    rating: {
      stars: 5,
      count: 1298
    },
    price: 8999,
    description: "This is a product special to the hearts belonging to the early 2000's. it has the fully cultivated retro vibe which any retro fan can encourage. This product is a truly crafted emotion for any retro fan. And even tho the design and looks are inspired by the retro era, the hardware and power is not. It can handle any retro or even some of your favourite songs with deep details. Take it home, order today",
    keywords: [
      "Retro",
      "Pixelated",
      "Beats"
    ],
    seller: "BigSmall",
  },
  {
    id: "4d7d7qfa-3tfe-4e48-r06f-ba8353h0w602",
    image: "/images/products/gojo-wall-poster.png",
    name: "Gojo Satoru Domain Expansion Wall Poster",
    rating: {
      stars: 4.5,
      count: 14293
    },
    price: 5599,
    description: "This vibrant metal anime poster features Satoru Gojo in an intense, high-energy artistic style. Set against a brilliant explosion of dynamic blue, white, and purple energy lines, he is depicted with his signature spiky white hair and one striking eye revealed. The poster highlights bold graphic shading, striking contrast, and pre-drilled corner holes for easy mounting on walls.",
    keywords: [
      "poster",
      "Anime",
      "Elevating"
    ],
    seller: "Tammannah B",
  },
  {
    id: "3n6d6kfs-3jod-7o90-f72d-ba0724x0w881",
    image: "/images/products/naruto-anime-figure.png",
    name: "Naruto Anime Figure",
    rating: {
      stars: 4.5,
      count: 12484
    },
    price: 2300,
    description: "This highly detailed anime figure showcases Naruto in Sage Mode with bright yellow hair, red eyeshadow, and a flowing red cloak. He stands in a confident arms-crossed stance carrying a large scroll across his back. Set on a textured rocky terrain base labeled with his name, the set also includes two mini toad sage figures, Fukasaku and Shima, flanking him.",
    keywords: [
      "classy",
      "Anime",
      "flying",
      "kurama"
    ],
    seller: "Offo",
  },
  {
    id: "6d1d7jal-3cqu-3i27-z04b-mh8734h5e385",
    image: "/images/products/pani-puri.png",
    name: "Pani Puri Plate | 6 piece",
    rating: {
      stars: 3,
      count: 1048
    },
    price: 98,
    description: "This vibrant plate features crisp, hollow puris filled with creamy yogurt and savory spices to create a mouthwatering dahi puri chaat. Generously topped with golden, crunchy sev, roasted chickpeas, and freshly chopped cilantro, each bite offers a delightful contrast of textures. Ruby-red pomegranate seeds add a brilliant pop of color and a touch of refreshing sweetness, making this traditional Indian street food as visually stunning as it is flavorful.",
    keywords: [
      "Delicious",
      "Explosion",
      "un-stoppable"
    ],
    seller: "Kumara",
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "/images/products/levitating-speaker.png",
    name: "Bluetooth Speaker Levitating Magnetic, 360°Rotation",
    rating: {
      stars: 4.5,
      count: 566
    },
    price: 8699,
    description: "This futuristic levitating speaker features a planet-like orb with a central ring floating inside a sleek black circular frame. Warm ambient lighting casts a red and orange glow along the inner rim and orb, creating a captivating visual effect. Designed with a sturdy pedestal base and rose-gold accents, it combines magnetic levitation technology with dynamic aesthetic lighting for a modern audio setup.",
    keywords: [
      "Gravity-Forgotten",
      "Sphere",
      "unstoppableBeats"
    ],
    seller: "Banapoy",
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "/images/products/zigzag-lamp.png ",
    name: "Modern Smart Zig-Zag Lamp",
    rating: {
      stars: 4.5,
      count: 717
    },
    price: 3899,
    description: "This artistic floor lamp features a slender, dark metallic stem sculpted into a graceful, wavy squiggle design. Topped with a classic cream-colored conical shade, it emits a soft, warm glow that enhances any interior space. Grounded by a round, dark metal base, its playful serpentine silhouette effortlessly blends artistic sculpture with functional home lighting for living rooms or reading nooks.",
    keywords: [
      "Lampy",
      "LampLighty",
      "ziggy-zaggy-btch"
    ],
    seller: "Devansh",
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "/images/products/Gunmetal-swatch.png",
    name: "Matwb-I0 - An AI Note Taker",
    rating: {
      stars: 4,
      count: 3796
    },
    price: 20099,
    description: "This sleek AI note taker features a compact gunmetal body with a smooth, matte finish. At its center, a glowing white arch LED light functions as a status indicator, giving it a modern minimal look. A small loop or attachment port at the top allows for easy carrying on a key ring or lanyard, making it portable and stylish for quick voice recordings.",
    keywords: [
      "Revolutionary",
      "First-Ever",
      "Market-Leading-AI"
    ],
    seller: "Rabbit",
  },
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    image: "/images/products/white-desk.png",
    name: "Modern Engineered Wood Computer Desk with Built-in Bookshelf & Space-Saving Design | White",
    rating: {
      stars: 4.5,
      count: 11758
    },
    price: 3499,
    description: "This modern white desk features a minimalist design with a smooth rectangular tabletop and unique Z-shaped metal side legs. Built for efficient storage, it includes a lower open shelf underneath the desktop, perfect for organizing books or office supplies. Its sleek, compact structure provides a stable work surface, making it an ideal spacesaving choice for home offices, study areas, or bedrooms.",
    keywords: [
      "Stabalizing",
      "NotCold",
      "Hi-Fi"
    ],
    seller: "IKEA",
  },
  {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    image: "/images/products/hollow-mouse.png",
    name: "WMouse | 8K DPI | OM & TTC Switch | Black",
    rating: {
      stars: 5,
      count: 31721
    },
    price: 23399,
    description: "This ultra-lightweight gaming mouse features an open honeycomb-style skeleton shell designed for maximum airflow and reduced weight. Finished in a matte black aesthetic, it includes smooth main click buttons and a textured scroll wheel for precise control. Its ergonomic, hollowed-out shape provides enhanced grip and breathability, making it ideal for high-speed performance and extended competitive gaming sessions.",
    keywords: [
      "Ground-Breaking-Design",
      "Future",
      "noCats"
    ],
    seller: "AM Infinity",
  },
  {
    id: "3b7d6jfe-3jdo-7o93-r04c-ba8924h0w851",
    image: "/images/products/scorpion-gaming.png",
    name: "Premium Scorpion Gaming Station | 5 Mount",
    rating: {
      stars: 5,
      count: 91530
    },
    price: 521999,
    description: "This futuristic scorpion-inspired gaming chair cockpits an arching, segmented overhead tail that holds a multi-monitor display setup directly in front of the user. It features an ergonomic leather seat, an integrated keyboard tray, and angular, leg-like mechanical base supports. Accented with subtle blue LED lighting, this all-in-one workstation offers an immersive, high-tech experience tailored for ultimate gaming or productivity sessions.",
    keywords: [
      "braceurself",
      "Stinger",
      "Nerve-bending",
      "Bye-byeWallet"
    ],
    seller: "Cluvens",
  },
  {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    image: "/images/products/bowtie-collar.png",
    name: "Maxbell Bowtie Elegant Collar Jewelry Solid Color Corsage | Vest Shirt Strap",
    rating: {
      stars: 2.5,
      count: 144
    },
    price: 399,
    description: "This elegant black ribbon bow tie features a classic structured double-loop bow design paired with long, flowing vertical ribbons. At the center lies a stunning, intricate floral buckle encrusted with sparkling rhinestones, adding a touch of sophisticated glamour. Designed for effortless styling, it includes a convenient adjustable black neck strap with a secure metal closure to ensure a comfortable fit.",
    keywords: [
      "bathroom",
      "washroom",
      "restroom",
      "everywhere",
      "statuous"
    ],
    seller: "Balen",
  },
  {
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    image: "/images/products/blueyy-watch.png",
    name: "Mirror Engine Aqua with Silver Dial | Bonneau Skeleton Engine Edition",
    rating: {
      stars: 4.5,
      count: 89456
    },
    price: 93399,
    description: "This striking luxury timepiece features a sleek matte silver tonneau-shaped case paired with a vibrant bright blue silicone strap. Inspired by high-performance automotive design, its fully visible skeleton dial reveals intricate gearwork and a central engine block motif. Blue hands and internal accents enhance readability while matching the strap. Three prominent crowns along the bottom edge add a bold, futuristic mechanical aesthetic.",
    keywords: [
      "swiss",
      "intricate",
      "status through the roof"
    ],
    seller: "Pierre",
  },
  {
    id: "5968897c-4d27-4872-89f6-5bcb052746d7",
    image: "/images/products/women-chiffon-beachwear-coverup-black.png",
    name: "Women's Chiffon Beachwear Cover Up | Black",
    rating: {
      stars: 4.5,
      count: 235
    },
    price: 2099,
    description: "This breezy black beachwear cover-up dress features a relaxed, loose-fitting silhouette with a flattering V-neckline and short kimono-style sleeves. Crafted from lightweight, semi-sheer fabric, it offers comfortable coverage over swimwear. Delicate tassel trim accents along the sleeves and asymmetric hemline add a stylish, bohemian flair, making it an effortless, chic choice for poolside lounging, beach days, or sunny vacation outings",
    keywords: [
      "robe",
      "swimsuit",
      "swimming",
      "bathing",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.jpg",
    seller: "Tivante",
  },
  {
    id: "aad29d11-ea98-41ee-9285-b916638cac4a",
    image: "/images/products/modern-bag.png",
    name: "Equivoyage Soft One Size Backpack | Grey",
    rating: {
      stars: 5,
      count: 33050
    },
    price: 15555,
    description: "This tactical grey backpack features two molded, hard-shell front compartments with embossed geometric accents for enhanced protection. It includes a top Velcro patch panel, a lash tab, side compression straps, and sturdy top carry handles. Crafted from durable textured fabric with reinforced zippers, it offers an organized, modern aesthetic ideal for commuting, outdoor adventures, or daily travel.",
    keywords: [
      "modern",
      "stylish"
    ],
    seller: "Equivoyage",
  },
  {
    id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
    image: "/images/products/gojo-anime-figure.png",
    name: "Gojo Satoru Domain Expansion | Figurine",
    rating: {
      stars: 3,
      count: 1604
    },
    price: 1699,
    description: "This finely detailed anime figure depicts Satoru Gojo with his signature spiky white hair and striking blue eyes. He is dressed in his iconic dark high-collared uniform, captured in a dynamic pose as he casually adjusts his blindfold or collar. The sculpture features smooth matte textures, clean paint applications, and an expressive, confident smirk that perfectly reflects his powerful and charismatic personality.",
    keywords: [
      "Anime",
      "Showpiece",
      "mens"
    ],
    seller: "Natalie",
  }
].map((productDetails) => {
  if(productDetails.type === 'clothing') {
    return new Clothing(productDetails);
  }

  return new Product(productDetails);
});