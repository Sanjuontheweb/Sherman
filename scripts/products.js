export function getProduct(productId) {
  let mathingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        mathingProduct = product;
      }
    });

    return mathingProduct;
}

class Product {
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
    image: "images/products/anime-shirt-3d-printed.jpg",
    name: "Demon Slayer T-shirt BIG",
    rating: {
      stars: 5,
      count: 1278
    },
    price: 9999,
    keywords: [
      "T-shirt",
      "Anime",
      "mast"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.jpg"
  },
  {
    id: "4d7d7qfa-3tfe-4e48-r06f-ba8353h0w602",
    image: "images/products/gojo-wall-poster.jpg",
    name: "Gojo Satoru Domain Expansion Wall Poster",
    rating: {
      stars: 5,
      count: 14293
    },
    price: 5599,
    keywords: [
      "poster",
      "Anime",
      "chindi"
    ]
  },
  {
    id: "3n6d6kfs-3jod-7o90-f72d-ba0724x0w881",
    image: "images/products/naruto-anime-figure.webp",
    name: "Naruto Anime Figure",
    rating: {
      stars: 5,
      count: 12484
    },
    price: 8400,
    keywords: [
      "classy",
      "Anime",
      "flying",
      "kurama"
    ]
  },
  {
    id: "3s5h6jka-2vio-7l91-r79a-bc8948g0q851",
    image: "images/products/gojo-anime-figure.jpg",
    name: "Gojo Figure | Purple",
    rating: {
      stars: 5,
      count: 23987
    },
    price: 19999,
    keywords: [
      "qute-as-fk",
      "Anime",
      "Nah, I'd win",
      "Yowai Mo"
    ]
  },
  {
    id: "0n4d9kse-6jbo-7d84-f56q-xa0534m0c838",
    image: "images/products/rias-anime-figure.jpg",
    name: "Rias Gremory Hanime Figure | Exclusive",
    rating: {
      stars: 5,
      count: 6322
    },
    price: 8899,
    keywords: [
      "eye-threatening",
      "HAnime",
      "Hentai",
      "Booobs",
      "embarassed"
    ]
  },
  {
    id: "6d1d7jal-3cqu-3i27-z04b-mh8734h5e385",
    image: "images/products/pani-puri.webp",
    name: "Pani Puri Plate | 6 piece",
    rating: {
      stars: 4,
      count: 10468
    },
    price: 99,
    keywords: [
      "Delicious",
      "Explosion",
      "un-stoppable"
    ]
  },
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/artificial-plant.webp",
    name: "Peaceful Natural-like plant",
    rating: {
      stars: 5,
      count: 8778
    },
    price: 18899,
    keywords: [
      "plant",
      "nature",
      "apparel"
    ]
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/another-dildo.jpg",
    name: "A piece for hearing stuff | Purple",
    rating: {
      stars: 5,
      count: 3105
    },
    price: 6499,
    keywords: [
      "sports",
      "ballz",
      "Pleasure-gal",
      "Insert",
      "Not-a-vibrator"
    ]
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Blue Cool Any season T-shirt | 2 Pack",
    rating: {
      stars: 4.5,
      count: 566
    },
    price: 699,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.jpg"
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/zigzag-lamp.jpg",
    name: "The Perfect Aesthetic Magnificent Lamp",
    rating: {
      stars: 4,
      count: 717
    },
    price: 899,
    keywords: [
      "Lampy",
      "LampLighty",
      "ziggy-zaggy-btch"
    ]
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "images/products/6-piece-white-dinner-plate-set.jpg",
    name: "6 Piece White Dinner Plate Set",
    rating: {
      stars: 4,
      count: 37
    },
    price: 2099,
    keywords: [
      "plates",
      "kitchen",
      "dining"
    ]
  },
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    image: "images/products/mixer.webp",
    name: "Heavy Driver Mixy Bhaii | OP",
    rating: {
      stars: 4.5,
      count: 1758
    },
    price: 13499,
    keywords: [
      "kitchen",
      "cookware",
      "Hi-Fi"
    ]
  },
  {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    image: "images/products/plain-hooded-fleece-sweatshirt-yellow.jpg",
    name: "Plain Hooded Fleece Sweatshirt",
    rating: {
      stars: 4.5,
      count: 317
    },
    price: 2399,
    keywords: [
      "hoodies",
      "sweaters",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.jpg"
  },
  {
    id: "3b7d6jfe-3jdo-7o93-r04c-ba8924h0w851",
    image: "images/products/one-piece-bracelet.jpg",
    name: "One Piece Black Pirate Bracelet",
    rating: {
      stars: 5,
      count: 9153
    },
    price: 1999,
    keywords: [
      "braceurself",
      "Anime",
      "oustanding"
    ]
  },
  {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    image: "images/products/luxury-tower-set-6-piece.jpg",
    name: "Luxury Towel Set | Graphite Gray",
    rating: {
      stars: 4.5,
      count: 144
    },
    price: 3599,
    keywords: [
      "bathroom",
      "washroom",
      "restroom",
      "towels",
      "bath towels"
    ]
  },
  {
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    image: "images/products/knit-athletic-sneakers-gray.jpg",
    name: "Waterproof Knit Athletic Sneakers | Gray",
    rating: {
      stars: 4,
      count: 89
    },
    price: 3399,
    keywords: [
      "shoes",
      "running shoes",
      "footwear"
    ]
  },
  {
    id: "5968897c-4d27-4872-89f6-5bcb052746d7",
    image: "images/products/women-chiffon-beachwear-coverup-black.jpg",
    name: "Women's Chiffon Beachwear Cover Up | Black",
    rating: {
      stars: 4.5,
      count: 235
    },
    price: 2099,
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
    image: "images/products/round-sunglasses-black.jpg",
    name: "Round Sunglasses Shades",
    rating: {
      stars: 4.5,
      count: 30
    },
    price: 1599,
    keywords: [
      "accessories",
      "shades"
    ]
  },
  {
    id: "04701903-bc79-49c6-bc11-1af7e3651358",
    image: "images/products/dildo.jpeg",
    name: "Room Decoration Stick | Perfect Gift",
    rating: {
      stars: 4.5,
      count: 982
    },
    price: 11399,
    keywords: [
      "bodywear",
      "in-body",
      "womens",
      "beach",
      "anytime"
    ]
  },
  {
    id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
    image: "images/products/blackout-curtain-set-beige.webp",
    name: "Blackout Curtains Set 4-Pack | Beige",
    rating: {
      stars: 4.5,
      count: 232
    },
    price: 4599,
    keywords: [
      "bedroom",
      "curtains",
      "home"
    ]
  },
  {
    id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
    image: "images/products/men-slim-fit-summer-shorts-gray.jpg",
    name: "Men's Slim-Fit Summer Shorts",
    rating: {
      stars: 4,
      count: 160
    },
    price: 1699,
    keywords: [
      "shorts",
      "apparel",
      "mens"
    ]
  },
  {
    id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
    image: "images/products/bedside-table.webp",
    name: "Cutie Pie lamp for Plants and You",
    rating: {
      stars: 3.5,
      count: 8451
    },
    price: 1099,
    keywords: [
      "wtable",
      "bedside",
      "sexy night"
    ]
  },
  {
    id: "6b07d4e7-f540-454e-8a1e-363f25dbae7d",
    image: "images/products/adjustable-dumbells.webp",
    name: "Adjustable Red dumbell | 2-sets | Ripped",
    rating: {
      stars: 5,
      count: 17823
    },
    price: 90009,
    keywords: [
      "costs a fortune",
      "sleek",
      "slithery",
      "dumbledore",
      "#ripped"
    ]
  },
  {
    id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    image: "images/products/straw-sunhat.webp",
    name: "Straw Lifeguard Sun Hat",
    rating: {
      stars: 4,
      count: 215
    },
    price: 2199,
    keywords: [
      "hats",
      "straw hats",
      "summer",
      "apparel"
    ]
  },
  {
    id: "e4f64a65-1377-42bc-89a5-e572d19252e2",
    image: "images/products/tire.webp",
    name: "Tire Inflater Portable | Black",
    rating: {
      stars: 4.5,
      count: 5267
    },
    price: 17999,
    keywords: [
      "tires",
      "cars",
      "punctures"
    ]
  },
  {
    id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
    image: "images/products/women-stretch-popover-hoodie-black.jpg",
    name: "Women's Stretch Popover Hoodie",
    rating: {
      stars: 4.5,
      count: 2465
    },
    price: 1299,
    keywords: [
      "hooded",
      "hoodies",
      "sweaters",
      "womens",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.jpg"
  },
  {
    id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
    image: "images/products/pressure-washer.jpg",
    name: "Pressure Washer Advanced Technology",
    rating: {
      stars: 4.5,
      count: 1199
    },
    price: 21259,
    keywords: [
      "vehicles",
      "pressure",
      "washer"
    ]
  },
  {
    id: "4f4fbcc2-4e72-45cc-935c-9e13d79cc57f",
    image: "images/products/realme-fone.jpeg",
    name: "Smartphone for Daily use | Cyan",
    rating: {
      stars: 3,
      count: 9269
    },
    price: 38699,
    keywords: [
      "phone",
      "smatphone",
      "anywhere",
      "everywhere"
    ]
  },
  {
    id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
    image: "images/products/men-golf-polo-t-shirt-blue.jpg",
    name: "Men's Regular-Fit Quick-Dry Golf Polo Shirt",
    rating: {
      stars: 4.5,
      count: 2556
    },
    price: 1599,
    keywords: [
      "tshirts",
      "shirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.jpg"
  },
  {
    id: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
    image: "images/products/trash-can-with-foot-pedal-50-liter.jpg",
    name: "Trash Can with Foot Pedal | Brushed Stainless Steel",
    rating: {
      stars: 4.5,
      count: 2286
    },
    price: 8299,
    keywords: [
      "garbage",
      "bins",
      "cans",
      "kitchen"
    ]
  },
  {
    id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
    image: "images/products/duvet-cover-set-blue-twin.jpg",
    name: "Duvet Cover Set with Zipper Closure",
    rating: {
      stars: 4,
      count: 456
    },
    price: 2399,
    keywords: [
      "bedroom",
      "bed sheets",
      "sheets",
      "covers",
      "home"
    ]
  },
  {
    id: "d2785924-743d-49b3-8f03-ec258e640503",
    image: "images/products/wierd-earphones.jpg",
    name: "Office Call Noise-cancelling Earphones",
    rating: {
      stars: 4,
      count: 1283
    },
    price: 41269,
    keywords: [
      "earfone",
      "blue",
      "shaped",
      "ergonomic"
    ]
  },
  {
    id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
    image: "images/products/men-chino-pants-beige.jpg",
    name: "Men's Classic-fit Pleated Chino Pants",
    rating: {
      stars: 4.5,
      count: 9017
    },
    price: 2299,
    keywords: [
      "pants",
      "apparel",
      "mens"
    ]
  },
  {
    id: "1c079479-8586-494f-ab53-219325432536",
    image: "images/products/men-athletic-shoes-green.jpg",
    name: "Men's Athletic Sneaker",
    rating: {
      stars: 4,
      count: 229
    },
    price: 3899,
    keywords: [
      "shoes",
      "running shoes",
      "footwear",
      "mens"
    ]
  },
  {
    id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
    image: "images/products/men-navigator-sunglasses-brown.jpg",
    name: "Men's Navigator Sunglasses Pilot",
    rating: {
      stars: 3.5,
      count: 42
    },
    price: 1699,
    keywords: [
      "sunglasses",
      "glasses",
      "accessories",
      "shades"
    ]
  },
  {
    id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
    image: "images/products/poco-fone.jpeg",
    name: "Awesome Phone to Flex | Galazy",
    rating: {
      stars: 4.5,
      count: 5113
    },
    price: 67999,
    keywords: [
      "fone",
      "killer",
      "Mind-killr"
    ]
  },
  {
    id: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
    image: "images/products/vanity-mirror-silver.jpg",
    name: "Vanity Mirror with Heavy Base | Chrome",
    rating: {
      stars: 4.5,
      count: 130
    },
    price: 1649,
    keywords: [
      "bathroom",
      "washroom",
      "mirrors",
      "home"
    ]
  },
  {
    id: "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
    image: "images/products/women-french-terry-fleece-jogger-camo.jpg",
    name: "Women's Fleece Jogger Sweatpant",
    rating: {
      stars: 4.5,
      count: 248
    },
    price: 2499,
    keywords: [
      "pants",
      "sweatpants",
      "jogging",
      "apparel",
      "womens"
    ]
  },
  {
    id: "d339adf3-e004-4c20-a120-40e8874c66cb",
    image: "images/products/double-elongated-twist-french-wire-earrings.webp",
    name: "Double Oval Twist French Wire Earrings | Gold",
    rating: {
      stars: 4.5,
      count: 117
    },
    price: 2399,
    keywords: [
      "accessories",
      "womens"
    ]
  },
  {
    id: "d37a651a-d501-483b-aae6-a9659b0757a0",
    image: "images/products/redmi-fone.png  ",
    name: "Perfect Phone for Your Friend Jimmy",
    rating: {
      stars: 3.5,
      count: 126
    },
    price: 52899,
    keywords: [
      "fone",
      "Red",
      "Vanilla"
    ]
  },
  {
    id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
    image: "images/products/coffeemaker-with-glass-carafe-black.jpg",
    name: "Coffeemaker with Glass Carafe and Reusable Filter | 25 Oz, Black",
    rating: {
      stars: 4.5,
      count: 1211
    },
    price: 2259,
    keywords: [
      "coffeemakers",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
    image: "images/products/blackout-curtains-black.jpg",
    name: "Blackout Curtains Set 42 x 84-Inch | Black, 2 Panels",
    rating: {
      stars: 4.5,
      count: 363
    },
    price: 3999,
    keywords: [
      "bedroom",
      "home"
    ]
  },
  {
    id: "8a53b080-6d40-4a65-ab26-b24ecf700bce",
    image: "images/products/earphones-red.webp",
    name: "Sleek Design Comfortable Earphones | Black-Red",
    rating: {
      stars: 4,
      count: 9453
    },
    price: 29999,
    keywords: [
      "anywhere",
      "on the go",
      "Compliments"
    ]
  },
  {
    id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
    image: "images/products/knit-athletic-sneakers-pink.webp",
    name: "Waterproof Knit Athletic Sneakers | Pink",
    rating: {
      stars: 4,
      count: 89
    },
    price: 3399,
    keywords: [
      "shoes",
      "running shoes",
      "footwear",
      "womens"
    ]
  },
  {
    id: "77a845b1-16ed-4eac-bdf9-5b591882113d",
    image: "images/products/countertop-blender-64-oz.jpg",
    name: "Countertop Blender | 64oz, 1400 Watts",
    rating: {
      stars: 4,
      count: 3
    },
    price: 10799,
    keywords: [
      "food blenders",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "36c64692-677f-4f58-b5ec-0dc2cf109e27",
    image: "images/products/floral-mixing-bowl-set.jpg",
    name: "10-Piece Mixing Bowl Set with Lids | Floral",
    rating: {
      stars: 5,
      count: 679
    },
    price: 3899,
    keywords: [
      "mixing bowls",
      "baking",
      "cookware",
      "kitchen"
    ]
  },
  {
    id: "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f",
    image: "images/products/matte-earphone.jpg",
    name: "Matte Finish Lines Earphones | Black",
    rating: {
      stars: 5,
      count: 9045
    },
    price: 17799,
    keywords: [
      "earfones",
      "Designful",
      "Long-battery"
    ]
  },
  {
    id: "bc2847e9-5323-403f-b7cf-57fde044a955",
    image: "images/products/men-cozy-fleece-zip-up-hoodie-red.jpg",
    name: "Men's Full-Zip Hooded Fleece Sweatshirt",
    rating: {
      stars: 4.5,
      count: 3157
    },
    price: 2600,
    keywords: [
      "sweaters",
      "hoodies",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.jpg"
  }
].map((productDetails) => {
  if(productDetails.type === 'clothing') {
    return new Clothing(productDetails);
  }

  return new Product(productDetails);
});