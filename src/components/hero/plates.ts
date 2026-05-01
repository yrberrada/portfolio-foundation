// Top-down food photos from Unsplash. Sized for plate textures.
export interface Plate {
  id: string;
  image: string;
  alt: string;
}

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=512&h=512&q=70`;

export const PLATES: Plate[] = [
  { id: "pasta",   image: u("photo-1551183053-bf91a1d81141"), alt: "Pasta with herbs" },
  { id: "steak",   image: u("photo-1546964124-0cce460f38ef"), alt: "Steak with garnish" },
  { id: "sushi",   image: u("photo-1579871494447-9811cf80d66c"), alt: "Sushi platter" },
  { id: "salad",   image: u("photo-1512621776951-a57141f2eefd"), alt: "Salad bowl" },
  { id: "dessert", image: u("photo-1488477181946-6428a0291777"), alt: "Dessert tart" },
  { id: "soup",    image: u("photo-1547592180-85f173990554"), alt: "Soup with toppings" },
];
