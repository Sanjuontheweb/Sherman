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

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.price = productDetails.price;
  }

  getStars() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `₹ ${this.price}`;
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
      <a href = "${this.sizeChartLink}" target = "_blank"
      class = "size-chart-link"> Size Chart </a>
    `;
  }
}

export const products = [
  {
    id: "0d7f9qha-4efe-4r89-r0ff-ba8363e0a642",
    image: "images/products/retro_speaker.png",
    name: "Retro Bluetooth Speaker with Pixel Display",
    rating: {
      stars: 5,
      count: 1298
    },
    price: 8999,
    description: "This is a product special to the hearts belonging to the early 2000's. it has the fully cultivated retro vibe which any retro fan can encourage. This product is a truly crafted emotion for any retro fan. And even tho the design and looks are inspired by the retro era, the hardware and power is not. It can handle any retro or even some of the modern games that you have owned. Take it home, order today",
    keywords: [
      "Retro",
      "Pixelated",
      "Beats"
    ],
  },
  {
    id: "4d7d7qfa-3tfe-4e48-r06f-ba8353h0w602",
    image: "images/products/gojo-wall-poster.jpg",
    name: "Gojo Satoru Domain Expansion Wall Poster",
    rating: {
      stars: 4.5,
      count: 14293
    },
    price: 5599,
    description: "This is a product special to the hearts belonging to the early 2000's. it has the fully cultivated retro vibe which any retro fan can encourage. This product is a truly crafted emotion for any retro fan. And even tho the design and looks are inspired by the retro era, the hardware and power is not. It can handle any retro or even some of the modern games that you have owned. Take it home, order today",
    keywords: [
      "poster",
      "Anime",
      "Elevating"
    ]
  },
  {
    id: "3n6d6kfs-3jod-7o90-f72d-ba0724x0w881",
    image: "images/products/naruto-anime-figure.png",
    name: "Naruto Anime Figure",
    rating: {
      stars: 4.5,
      count: 12484
    },
    price: 2300,
    description: "This is a product special to the hearts belonging to the early 2000's. it has the fully cultivated retro vibe which any retro fan can encourage. This product is a truly crafted emotion for any retro fan. And even tho the design and looks are inspired by the retro era, the hardware and power is not. It can handle any retro or even some of the modern games that you have owned. Take it home, order today",
    keywords: [
      "classy",
      "Anime",
      "flying",
      "kurama"
    ]
  },
  {
    id: "6d1d7jal-3cqu-3i27-z04b-mh8734h5e385",
    image: "images/products/pani-puri.png",
    name: "Pani Puri Plate | 6 piece",
    rating: {
      stars: 3,
      count: 1048
    },
    price: 98,
    description: "This is a product special to the hearts belonging to the early 2000's. it has the fully cultivated retro vibe which any retro fan can encourage. This product is a truly crafted emotion for any retro fan. And even tho the design and looks are inspired by the retro era, the hardware and power is not. It can handle any retro or even some of the modern games that you have owned. Take it home, order today",
    keywords: [
      "Delicious",
      "Explosion",
      "un-stoppable"
    ]
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/levitating-speaker.png",
    name: "Bluetooth Speaker Levitating Magnetic, 360°Rotation",
    rating: {
      stars: 4.5,
      count: 566
    },
    price: 8699,
    description: "This is a product special to the hearts belonging to the early 2000's. it has the fully cultivated retro vibe which any retro fan can encourage. This product is a truly crafted emotion for any retro fan. And even tho the design and looks are inspired by the retro era, the hardware and power is not. It can handle any retro or even some of the modern games that you have owned. Take it home, order today",
    keywords: [
      "Gravity-Forgotten",
      "Sphere",
      "unstoppableBeats"
    ],
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/zigzag-lamp.png ",
    name: "Modern Smart Zig-Zag Lamp",
    rating: {
      stars: 4.5,
      count: 717
    },
    price: 3899,
    description: "This is a product special to the hearts belonging to the early 2000's. it has the fully cultivated retro vibe which any retro fan can encourage. This product is a truly crafted emotion for any retro fan. And even tho the design and looks are inspired by the retro era, the hardware and power is not. It can handle any retro or even some of the modern games that you have owned. Take it home, order today",
    keywords: [
      "Lampy",
      "LampLighty",
      "ziggy-zaggy-btch"
    ]
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "images/products/Gunmetal-swatch.webp",
    name: "Matwb-I0 - An AI Note Taker",
    rating: {
      stars: 4,
      count: 3796
    },
    price: 20099,
    description: "This is a product special to the hearts belonging to the early 2000's. it has the fully cultivated retro vibe which any retro fan can encourage. This product is a truly crafted emotion for any retro fan. And even tho the design and looks are inspired by the retro era, the hardware and power is not. It can handle any retro or even some of the modern games that you have owned. Take it home, order today",
    keywords: [
      "Revolutionary",
      "First-Ever",
      "Market-Leading-AI"
    ]
  },
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    image: "images/products/white-desk.png",
    name: "Modern Engineered Wood Computer Desk with Built-in Bookshelf & Space-Saving Design | White",
    rating: {
      stars: 4.5,
      count: 11758
    },
    price: 3499,
    description: "This is a product special to the hearts belonging to the early 2000's. it has the fully cultivated retro vibe which any retro fan can encourage. This product is a truly crafted emotion for any retro fan. And even tho the design and looks are inspired by the retro era, the hardware and power is not. It can handle any retro or even some of the modern games that you have owned. Take it home, order today",
    keywords: [
      "Stabalizing",
      "NotCold",
      "Hi-Fi"
    ]
  },
  {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    image: "images/products/hollow-mouse.png",
    name: "WMouse | 8K DPI | OM & TTC Switch | Black",
    rating: {
      stars: 5,
      count: 31721
    },
    price: 23399,
    description: "This is a product special to the hearts belonging to the early 2000's. it has the fully cultivated retro vibe which any retro fan can encourage. This product is a truly crafted emotion for any retro fan. And even tho the design and looks are inspired by the retro era, the hardware and power is not. It can handle any retro or even some of the modern games that you have owned. Take it home, order today",
    keywords: [
      "Ground-Breaking-Design",
      "Future",
      "noCats"
    ],
  },
  {
    id: "3b7d6jfe-3jdo-7o93-r04c-ba8924h0w851",
    image: "images/products/scorpion-gaming.png",
    name: "Premium Scorpion Gaming Station | 5 Mount",
    rating: {
      stars: 5,
      count: 91530
    },
    price: 521999,
    description: "This is a product special to the hearts belonging to the early 2000's. it has the fully cultivated retro vibe which any retro fan can encourage. This product is a truly crafted emotion for any retro fan. And even tho the design and looks are inspired by the retro era, the hardware and power is not. It can handle any retro or even some of the modern games that you have owned. Take it home, order today",
    keywords: [
      "braceurself",
      "Stinger",
      "Nerve-bending",
      "Bye-byeWallet"
    ]
  },
  {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    image: "images/products/bowtie-collar.png",
    name: "Maxbell Bowtie Elegant Collar Jewelry Solid Color Corsage | Vest Shirt Strap",
    rating: {
      stars: 2.5,
      count: 144
    },
    price: 399,
    description: "This is a product special to the hearts belonging to the early 2000's. it has the fully cultivated retro vibe which any retro fan can encourage. This product is a truly crafted emotion for any retro fan. And even tho the design and looks are inspired by the retro era, the hardware and power is not. It can handle any retro or even some of the modern games that you have owned. Take it home, order today",
    keywords: [
      "bathroom",
      "washroom",
      "restroom",
      "everywhere",
      "statuous"
    ]
  },
  {
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    image: "images/products/blueyy-watch.png",
    name: "Mirror Engine Aqua with Silver Dial | Bonneau Skeleton Engine Edition",
    rating: {
      stars: 4.5,
      count: 89456
    },
    price: 93399,
    description: "This is a product special to the hearts belonging to the early 2000's. it has the fully cultivated retro vibe which any retro fan can encourage. This product is a truly crafted emotion for any retro fan. And even tho the design and looks are inspired by the retro era, the hardware and power is not. It can handle any retro or even some of the modern games that you have owned. Take it home, order today",
    keywords: [
      "swiss",
      "intricate",
      "status through the roof"
    ]
  },
  {
    id: "5968897c-4d27-4872-89f6-5bcb052746d7",
    image: "images/products/women-chiffon-beachwear-coverup-black.png",
    name: "Women's Chiffon Beachwear Cover Up | Black",
    rating: {
      stars: 4.5,
      count: 235
    },
    price: 2099,
    description: "This is a product special to the hearts belonging to the early 2000's. it has the fully cultivated retro vibe which any retro fan can encourage. This product is a truly crafted emotion for any retro fan. And even tho the design and looks are inspired by the retro era, the hardware and power is not. It can handle any retro or even some of the modern games that you have owned. Take it home, order today",
    keywords: [
      "robe",
      "swimsuit",
      "swimming",
      "bathing",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.jpg"
  },
  {
    id: "aad29d11-ea98-41ee-9285-b916638cac4a",
    image: "images/products/modern-bag.png",
    name: "Equivoyage Soft One Size Backpack | Grey",
    rating: {
      stars: 5,
      count: 33050
    },
    price: 15555,
    description: "This is a product special to the hearts belonging to the early 2000's. it has the fully cultivated retro vibe which any retro fan can encourage. This product is a truly crafted emotion for any retro fan. And even tho the design and looks are inspired by the retro era, the hardware and power is not. It can handle any retro or even some of the modern games that you have owned. Take it home, order today",
    keywords: [
      "modern",
      "stylish"
    ]
  },
  {
    id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
    image: "images/products/gojo-anime-figure.png",
    name: "Gojo Satoru Domain Expansion | Figurine",
    rating: {
      stars: 3,
      count: 1604
    },
    price: 1699,
    description: "This is a product special to the hearts belonging to the early 2000's. it has the fully cultivated retro vibe which any retro fan can encourage. This product is a truly crafted emotion for any retro fan. And even tho the design and looks are inspired by the retro era, the hardware and power is not. It can handle any retro or even some of the modern games that you have owned. Take it home, order today",
    keywords: [
      "Anime",
      "Showpiece",
      "mens"
    ]
  }
].map((productDetails) => {
  if(productDetails.type === 'clothing') {
    return new Clothing(productDetails);
  }

  return new Product(productDetails);
});