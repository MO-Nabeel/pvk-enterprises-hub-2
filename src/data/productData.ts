import trophyImage from "@/assets/trophy-product.jpg";
import officeImage from "@/assets/office-supplies.jpg";
import stampImage from "@/assets/rubber-stamps.jpg";
import printerImage from "@/assets/printer-equipment.jpg";
import mobileImage from "@/assets/mobile-accessories.jpg";
import customPrintingImage from "@/assets/ct-customprinting.png";
import offsetPrintingImage from "@/assets/ct-offsetprinting.png";
import frameStudioImage from "@/assets/ct-framestudio.jpg";

export type Product = {
  id: string;
  name: string;
  imageGallery: string[];
  price: number;
  oldPrice?: number;
  purchasePrice?: number;
  tax?: number;
  category: string;
  brand?: string;
  discount?: number;
  description?: string;
};

export const allProducts: Product[] = [
  {
    id: "058-B-TROPHY",
    name: "058 B TROPHY",
    imageGallery: [trophyImage],
    price: 100,
    oldPrice: 130,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 10
  },
  {
    id: "3154-A-TROPHY",
    name: "3154 A TROPHY",
    imageGallery: [trophyImage],
    price: 70,
    oldPrice: 90,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 22.22
  },
  {
    id: "3154-C-TROPHY",
    name: "3154 C TROPHY",
    imageGallery: [trophyImage],
    price: 90,
    oldPrice: 150,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 40
  },
  {
    id: "3155-B-TROPHY",
    name: "3155 B TROPHY",
    imageGallery: [trophyImage],
    price: 90,
    oldPrice: 120,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 25
  },
  {
    id: "3155-C-TROPHY",
    name: "3155 C TROPHY",
    imageGallery: [trophyImage],
    price: 130,
    oldPrice: 170,
    category: "Trophies & Awards",
    brand: "Pvk Enterprises",
    discount: 23.53
  },
  {
    id: "3196-C-TROPHY",
    name: "3196 C TROPHY",
    imageGallery: [trophyImage],
    price: 1400,
    oldPrice: 1600,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 12.5
  },
  {
    id: "344-C-TROPHY",
    name: "344 C TROPHY",
    imageGallery: [trophyImage],
    price: 120,
    oldPrice: 150,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 20
  },
  {
    id: "417-C-TROPHY",
    name: "417 C TROPHY",
    imageGallery: [trophyImage],
    price: 500,
    oldPrice: 650,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 23.08
  },
  {
    id: "4216-A-TROPHY",
    name: "4216 A TROPHY",
    imageGallery: [trophyImage],
    price: 800,
    oldPrice: 1000,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 20
  },
  {
    id: "4455-A-TROPHY",
    name: "4455 A TROPHY",
    imageGallery: [trophyImage],
    price: 140,
    oldPrice: 160,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 12.5
  },
  {
    id: "555-C-TROPHY",
    name: "555 C TROPHY",
    imageGallery: [trophyImage],
    price: 270,
    oldPrice: 300,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 10
  },
  {
    id: "AC220-A-TROPHY",
    name: "AC220 A TROPHY",
    imageGallery: [trophyImage],
    price: 180,
    oldPrice: 220,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 18.18
  },
  {
    id: "BLACK-WOOD-TROPHY-31297",
    name: "BLACK WOOD TROPHY 31297",
    imageGallery: [trophyImage],
    price: 190,
    oldPrice: 240,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 20.83
  },
  {
    id: "CROWN-LOVE-B-TROPHY-34818",
    name: "Crown Love B Trophy 34818",
    imageGallery: [trophyImage],
    price: 250,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "CUP-5-INCH",
    name: "CUP 5 INCH",
    imageGallery: [trophyImage],
    price: 30,
    oldPrice: 50,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 40
  },
  {
    id: "EXB-05-TROPHY",
    name: "EXB 05 TROPHY",
    imageGallery: [trophyImage],
    price: 750,
    oldPrice: 850,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 11.76
  },
  {
    id: "EXB-38-TROPHY",
    name: "EXB 38 TROPHY",
    imageGallery: [trophyImage],
    price: 1200,
    oldPrice: 1400,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 14.29
  },
  {
    id: "EXB-49-TROPHY",
    name: "EXB 49 TROPHY",
    imageGallery: [trophyImage],
    price: 1200,
    oldPrice: 1500,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 20
  },
  {
    id: "EXB-51-TROPHY",
    name: "EXB 51 TROPHY",
    imageGallery: [trophyImage],
    price: 650,
    oldPrice: 750,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 13.33
  },
  {
    id: "EXB-52-TROPHY",
    name: "EXB 52 TROPHY",
    imageGallery: [trophyImage],
    price: 1500,
    oldPrice: 1700,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 11.76
  },
  {
    id: "EXB-71-TROPHY",
    name: "EXB 71 TROPHY",
    imageGallery: [trophyImage],
    price: 1200,
    oldPrice: 1500,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 20
  },
  {
    id: "FOOTBALL-TROPHY-5315-A",
    name: "FOOTBALL TROPHY 5315 A",
    imageGallery: [trophyImage],
    price: 600,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "HANDGLASS-TROPHY",
    name: "HANDGLASS TROPHY",
    imageGallery: [trophyImage],
    price: 950,
    oldPrice: 1050,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 9.52
  },
  {
    id: "KABOOTAR-S32641",
    name: "KABOOTAR S32641",
    imageGallery: [trophyImage],
    price: 550,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "MINI-CUP-31444",
    name: "MINI CUP 31444",
    imageGallery: [trophyImage],
    price: 60,
    oldPrice: 70,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 14.29
  },
  {
    id: "MIRROR-M-TROPHY",
    name: "MIRROR M TROPHY",
    imageGallery: [trophyImage],
    price: 360,
    oldPrice: 480,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 25
  },
  {
    id: "NIB-FLAG-D-TROPHY",
    name: "NIB FLAG D TROPHY",
    imageGallery: [trophyImage],
    price: 55,
    oldPrice: 80,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 31.25
  },
  {
    id: "NO480-B-TROPHY",
    name: "NO480 B TROPHY",
    imageGallery: [trophyImage],
    price: 500,
    oldPrice: 750,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 33.33
  },
  {
    id: "PAAN-C-33640-TROPHY",
    name: "PAAN C 33640 TROPHY",
    imageGallery: [trophyImage],
    price: 80,
    oldPrice: 120,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 33.33
  },
  {
    id: "PAM-64-TROPHY",
    name: "PAM 64 TROPHY",
    imageGallery: [trophyImage],
    price: 250,
    oldPrice: 350,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 28.57
  },
  {
    id: "PAM-69-TROPHY",
    name: "PAM 69 TROPHY",
    imageGallery: [trophyImage],
    price: 900,
    oldPrice: 1250,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 28
  },
  {
    id: "PAM-70-TROPHY",
    name: "PAM 70 TROPHY",
    imageGallery: [trophyImage],
    price: 900,
    oldPrice: 1200,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 25
  },
  {
    id: "PAM-71-TROPHY",
    name: "PAM 71 TROPHY",
    imageGallery: [trophyImage],
    price: 850,
    oldPrice: 1000,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 15
  },
  {
    id: "PD-5039-TROPHY",
    name: "PD 5039 TROPHY",
    imageGallery: [trophyImage],
    price: 800,
    oldPrice: 1000,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 20
  },
  {
    id: "PF-ROUND-TROPHY",
    name: "PF ROUND TROPHY",
    imageGallery: [trophyImage],
    price: 800,
    oldPrice: 1000,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 20
  },
  {
    id: "RANTHAL-WOOD-B-3397",
    name: "RANTHAL WOOD B 3397",
    imageGallery: [trophyImage],
    price: 500,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "RONIA-33639-TROPHY",
    name: "Ronia 33639 Trophy",
    imageGallery: [trophyImage],
    price: 140,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "ROYALWOOD-B-TROPHY",
    name: "ROYALWOOD B TROPHY",
    imageGallery: [trophyImage],
    price: 90,
    oldPrice: 120,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 25
  },
  {
    id: "TROPHY-055-A",
    name: "Trophy 055 A",
    imageGallery: [trophyImage],
    price: 135,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-055-B",
    name: "Trophy 055 B",
    imageGallery: [trophyImage],
    price: 135,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-055-C",
    name: "Trophy 055 C",
    imageGallery: [trophyImage],
    price: 160,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-071-B",
    name: "Trophy 071 B",
    imageGallery: [trophyImage],
    price: 300,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-1038-A",
    name: "Trophy 1038 A",
    imageGallery: [trophyImage],
    price: 180,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-1079-A",
    name: "Trophy 1079 A",
    imageGallery: [trophyImage],
    price: 80,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-1125-B",
    name: "Trophy 1125 B",
    imageGallery: [trophyImage],
    price: 80,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-1127-A",
    name: "Trophy 1127 A",
    imageGallery: [trophyImage],
    price: 650,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-1175-B",
    name: "Trophy 1175 B",
    imageGallery: [trophyImage],
    price: 130,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-1184-A",
    name: "Trophy 1184 A",
    imageGallery: [trophyImage],
    price: 150,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-1192-C",
    name: "Trophy 1192 C",
    imageGallery: [trophyImage],
    price: 100,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-1193-B",
    name: "Trophy 1193 B",
    imageGallery: [trophyImage],
    price: 75,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-1193-C",
    name: "Trophy 1193 C",
    imageGallery: [trophyImage],
    price: 90,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-1226-B",
    name: "Trophy 1226 B",
    imageGallery: [trophyImage],
    price: 100,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-1230",
    name: "Trophy 1230",
    imageGallery: [trophyImage],
    price: 120,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-1322-A",
    name: "TROPHY 1322A",
    imageGallery: [trophyImage],
    price: 200,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-2081-B",
    name: "Trophy 2081 B",
    imageGallery: [trophyImage],
    price: 300,
    oldPrice: 450,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 33.33
  },
  {
    id: "TROPHY-2151-A",
    name: "Trophy 2151 A",
    imageGallery: [trophyImage],
    price: 120,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-278-C",
    name: "Trophy 278 C",
    imageGallery: [trophyImage],
    price: 56,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-3-D",
    name: "Trophy 3 D",
    imageGallery: [trophyImage],
    price: 900,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-3160-A",
    name: "Trophy 3160 A",
    imageGallery: [trophyImage],
    price: 140,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-340-A",
    name: "Trophy 340 A",
    imageGallery: [trophyImage],
    price: 140,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-5-STAR-B",
    name: "Trophy 5 Star B",
    imageGallery: [trophyImage],
    price: 26,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-5962-A",
    name: "Trophy 5962 A",
    imageGallery: [trophyImage],
    price: 150,
    oldPrice: 170,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 11.76
  },
  {
    id: "TROPHY-7676",
    name: "Trophy 7676",
    imageGallery: [trophyImage],
    price: 65,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-ABD3",
    name: "Trophy ABD3",
    imageGallery: [trophyImage],
    price: 1600,
    oldPrice: 1752,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 8.68
  },
  {
    id: "TROPHY-BLACKBALL-A",
    name: "TROPHY BLACKBALL A",
    imageGallery: [trophyImage],
    price: 400,
    oldPrice: 600,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 33.33
  },
  {
    id: "TROPHY-BOOK-PEN-HJ500",
    name: "Trophy book and pen HJ500",
    imageGallery: [trophyImage],
    price: 1200,
    oldPrice: 1350,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 11.11
  },
  {
    id: "TROPHY-COPPER-B",
    name: "Trophy Copper B",
    imageGallery: [trophyImage],
    price: 1400,
    oldPrice: 1600,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 12.5
  },
  {
    id: "TROPHY-CUP-WOOD",
    name: "Trophy Cup wood",
    imageGallery: [trophyImage],
    price: 100,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-DUCK",
    name: "Trophy DUCK",
    imageGallery: [trophyImage],
    price: 2900,
    oldPrice: 3050,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 4.92
  },
  {
    id: "TROPHY-EXB06",
    name: "Trophy EXB06",
    imageGallery: [trophyImage],
    price: 950,
    oldPrice: 1100,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 13.64
  },
  {
    id: "TROPHY-EXB07",
    name: "Trophy EXB07",
    imageGallery: [trophyImage],
    price: 800,
    oldPrice: 950,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 15.79
  },
  {
    id: "TROPHY-EXB105",
    name: "Trophy EXB105",
    imageGallery: [trophyImage],
    price: 400,
    oldPrice: 500,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 20
  },
  {
    id: "TROPHY-EXB09",
    name: "Trophy EXB09",
    imageGallery: [trophyImage],
    price: 450,
    oldPrice: 550,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 18.18
  },
  {
    id: "TROPHY-EXB11",
    name: "Trophy EXB11",
    imageGallery: [trophyImage],
    price: 600,
    oldPrice: 750,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 20
  },
  {
    id: "TROPHY-EXB34",
    name: "Trophy EXB34",
    imageGallery: [trophyImage],
    price: 650,
    oldPrice: 750,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 13.33
  },
  {
    id: "TROPHY-EXB39",
    name: "Trophy EXB39",
    imageGallery: [trophyImage],
    price: 1100,
    oldPrice: 1250,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 12
  },
  {
    id: "TROPHY-EXB41",
    name: "Trophy EXB41",
    imageGallery: [trophyImage],
    price: 1300,
    oldPrice: 1450,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 10.34
  },
  {
    id: "TROPHY-EXB60",
    name: "Trophy EXB60",
    imageGallery: [trophyImage],
    price: 650,
    oldPrice: 750,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 13.33
  },
  {
    id: "TROPHY-EXB62",
    name: "Trophy EXB62",
    imageGallery: [trophyImage],
    price: 550,
    oldPrice: 650,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 15.38
  },
  {
    id: "TROPHY-EXB63",
    name: "Trophy EXB63",
    imageGallery: [trophyImage],
    price: 500,
    oldPrice: 650,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 23.08
  },
  {
    id: "TROPHY-EXB64",
    name: "Trophy EXB64",
    imageGallery: [trophyImage],
    price: 600,
    oldPrice: 750,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 20
  },
  {
    id: "TROPHY-EXB69",
    name: "Trophy EXB69",
    imageGallery: [trophyImage],
    price: 400,
    oldPrice: 550,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 27.27
  },
  {
    id: "TROPHY-EXB87",
    name: "Trophy EXB87",
    imageGallery: [trophyImage],
    price: 740,
    oldPrice: 880,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 15.91
  },
  {
    id: "TROPHY-EXB93",
    name: "Trophy EXB93",
    imageGallery: [trophyImage],
    price: 700,
    oldPrice: 850,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 17.65
  },
  {
    id: "TROPHY-EXB96",
    name: "Trophy EXB96",
    imageGallery: [trophyImage],
    price: 750,
    oldPrice: 850,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 11.76
  },
  {
    id: "TROPHY-EXB98",
    name: "Trophy EXB98",
    imageGallery: [trophyImage],
    price: 800,
    oldPrice: 950,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 15.79
  },
  {
    id: "TROPHY-HC07",
    name: "Trophy HC07",
    imageGallery: [trophyImage],
    price: 1700,
    oldPrice: 1850,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 8.11
  },
  {
    id: "TROPHY-LC18S",
    name: "Trophy LC18S",
    imageGallery: [trophyImage],
    price: 250,
    oldPrice: 350,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 28.57
  },
  {
    id: "TROPHY-MINI-CUP-7",
    name: "Trophy Mini Cup 7",
    imageGallery: [trophyImage],
    price: 50,
    oldPrice: 70,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 28.57
  },
  {
    id: "TROPHY-NP-14-B",
    name: "Trophy NP 14 B",
    imageGallery: [trophyImage],
    price: 250,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-NP-A",
    name: "Trophy NP A",
    imageGallery: [trophyImage],
    price: 130,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-PAM23",
    name: "Trophy PAM23",
    imageGallery: [trophyImage],
    price: 700,
    oldPrice: 850,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 17.65
  },
  {
    id: "TROPHY-PAM58",
    name: "Trophy PAM58",
    imageGallery: [trophyImage],
    price: 380,
    oldPrice: 450,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 15.56
  },
  {
    id: "TROPHY-PAM68",
    name: "Trophy PAM68",
    imageGallery: [trophyImage],
    price: 950,
    oldPrice: 1100,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 13.64
  },
  {
    id: "TROPHY-PAM81",
    name: "Trophy PAM81",
    imageGallery: [trophyImage],
    price: 620,
    oldPrice: 750,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 17.33
  },
  {
    id: "TROPHY-PAM82",
    name: "Trophy PAM82",
    imageGallery: [trophyImage],
    price: 700,
    oldPrice: 850,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 17.65
  },
  {
    id: "TROPHY-PAM83",
    name: "Trophy PAM83",
    imageGallery: [trophyImage],
    price: 700,
    oldPrice: 850,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 17.65
  },
  {
    id: "TROPHY-PH2",
    name: "Trophy PH2",
    imageGallery: [trophyImage],
    price: 1170,
    oldPrice: 1300,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 10
  },
  {
    id: "TROPHY-S-7-B",
    name: "Trophy S 7 B",
    imageGallery: [trophyImage],
    price: 130,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-EXB14",
    name: "Trophy EXB14",
    imageGallery: [trophyImage],
    price: 850,
    oldPrice: 950,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 10.53
  },
  {
    id: "TROPHY-PI-FLOG-B",
    name: "Trophy PI Flog (B)",
    imageGallery: [trophyImage],
    price: 30,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-AM-STAR-B",
    name: "Trophy AM Star (B)",
    imageGallery: [trophyImage],
    price: 26,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-1036-FRAME-34603",
    name: "1036 Frame Trophy 34603",
    imageGallery: [trophyImage],
    price: 920,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-664A-35032",
    name: "664 A Trophy 35032",
    imageGallery: [trophyImage],
    price: 350,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-7X3-GLASS",
    name: "7 x 3 Glass Trophy",
    imageGallery: [trophyImage],
    price: 140,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "TROPHY-8MM-NEW-GLASS",
    name: "8 MM NEW GLASS TROPHY",
    imageGallery: [trophyImage],
    price: 650,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "8MM-ROUND-GLASS",
    name: "8 mm Round Glass Trophy",
    imageGallery: [trophyImage],
    price: 650,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "A-ONE-MINI-A",
    name: "A One Mini A Trophy",
    imageGallery: [trophyImage],
    price: 800,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "A-ONE-MINI-B",
    name: "A One Mini B Trophy",
    imageGallery: [trophyImage],
    price: 1000,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "A-ONE-MINI-C",
    name: "A One Mini C Trophy",
    imageGallery: [trophyImage],
    price: 1300,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "ANANKOMBU-NEW-C-TR-33892",
    name: "Anankombu New C TR 33892",
    imageGallery: [trophyImage],
    price: 550,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "AMALA-TROPHY",
    name: "AMALA TROPHY",
    imageGallery: [trophyImage],
    price: 120,
    oldPrice: 133,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 10
  },
  {
    id: "ANANKOMBU-A-TROPHY",
    name: "Anankombu A Trophy",
    imageGallery: [trophyImage],
    price: 1200,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "BURG-A-ARAB-GLASS",
    name: "BURG A ARAB GLASS TROPHY",
    imageGallery: [trophyImage],
    price: 390,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "CF-CUP-A",
    name: "CF Cup A Trophy",
    imageGallery: [trophyImage],
    price: 1700,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "CF-CUP-B",
    name: "CF Cup B Trophy",
    imageGallery: [trophyImage],
    price: 2250,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "CF-CUP-C",
    name: "CF Cup C Trophy",
    imageGallery: [trophyImage],
    price: 2700,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "CRICKET-CONE-A-NEW",
    name: "CRICKET CONE A NEW",
    imageGallery: [trophyImage],
    price: 350,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "DMD-DIAMOND-GLASS",
    name: "DMD DIAMOND GLASS TROPHY",
    imageGallery: [trophyImage],
    price: 350,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "FANCY-CUP-C-34817",
    name: "Fancy Cup C Trophy 34817",
    imageGallery: [trophyImage],
    price: 150,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "FLAME-BEVELED-BIG-GLASS",
    name: "Flame Beveled Big Glass Trophy",
    imageGallery: [trophyImage],
    price: 400,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "FOOTBALL-MINI-GOLD-TR",
    name: "Football Mini Gold TR",
    imageGallery: [trophyImage],
    price: 200,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "FOOTBALL-STATUE-32218",
    name: "FOOTBALL STATUE 32218",
    imageGallery: [trophyImage],
    price: 45,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "FOOTBALL-STATUE-WHITE-WOOD",
    name: "FOOTBALL STATUE WHITE WOOD",
    imageGallery: [trophyImage],
    price: 550,
    oldPrice: 600,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 8.33
  },
  {
    id: "GENIERS-WOOD-950A",
    name: "Geniers Wood 950A",
    imageGallery: [trophyImage],
    price: 50,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "GLASS-MEMENTO-29971",
    name: "Glass Memento 29971",
    imageGallery: [trophyImage],
    price: 290,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "GLASS-PMG-2075-326445",
    name: "Glass PMG 2075 326445",
    imageGallery: [trophyImage],
    price: 300,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "GLASS-TROPHY-29970",
    name: "Glass Trophy 29970",
    imageGallery: [trophyImage],
    price: 475,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "GLASS-TROPHY-29990",
    name: "Glass Trophy 29990",
    imageGallery: [trophyImage],
    price: 330,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "GLASS-TROPHY-53",
    name: "Glass Trophy 53",
    imageGallery: [trophyImage],
    price: 80,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "HANS-S-33979",
    name: "Hans S Trophy 33979",
    imageGallery: [trophyImage],
    price: 750,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "HAND-BOND-A",
    name: "HAND BOND A TROPHY",
    imageGallery: [trophyImage],
    price: 250,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "HON-WOOD-A-34605",
    name: "HON Wood A Trophy 34605",
    imageGallery: [trophyImage],
    price: 450,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "HON-WOOD-B-34606",
    name: "HON Wood B Trophy 34606",
    imageGallery: [trophyImage],
    price: 600,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "JDS-C-TROPHY",
    name: "JDS C Trophy",
    imageGallery: [trophyImage],
    price: 480,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "KB-BIG-ROUND-GLASS",
    name: "K B Big Round Glass Trophy",
    imageGallery: [trophyImage],
    price: 400,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "K-BLACK-A-TROPHY",
    name: "K Black A Trophy",
    imageGallery: [trophyImage],
    price: 490,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "LONG-CUP-A",
    name: "LONG CUP A",
    imageGallery: [trophyImage],
    price: 1600,
    oldPrice: 1800,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 11.11
  },
  {
    id: "MEMENTO-10101A",
    name: "MEMENTO 10101A",
    imageGallery: [trophyImage],
    price: 80,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "MEMENTO-10168",
    name: "MEMENTO 10168",
    imageGallery: [trophyImage],
    price: 100,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "MEMENTO-1034-C",
    name: "Memento 1034 C",
    imageGallery: [trophyImage],
    price: 150,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "MEMENTO-1036A",
    name: "MEMENTO 1036A",
    imageGallery: [trophyImage],
    price: 900,
    oldPrice: 1000,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 10
  },
  {
    id: "thermal-paper-roll-80",
    name: "THERMAL PAPER ROLL 80mm x 50m",
    imageGallery: [printerImage],
    price: 450,
    category: "Printer Supplies",
    brand: "Generic"
  },
  {
    id: "colop-printer-38-dater",
    name: "COLOP Printer 38 Dater Self-inking Stamp",
    imageGallery: [stampImage],
    price: 1250,
    oldPrice: 1471,
    category: "Custom Rubber Stamps",
    brand: "COLOP",
    discount: 15
  },
  {
    id: "smartphone-case-bundle",
    name: "Smartphone Case & Screen Protector Bundle",
    imageGallery: [mobileImage],
    price: 650,
    oldPrice: 813,
    category: "Mobile Accessories",
    brand: "Erd",
    discount: 20
  },
  {
    id: "tnpl-copier-a4",
    name: "TNPL COPIER PAPEL GSM A4 Size 500 Sheets",
    imageGallery: [printerImage],
    price: 420,
    category: "Printer Supplies",
    brand: "TNPL"
  },
  {
    id: "professional-rubber-stamp-set",
    name: "Professional Rubber Stamp Set",
    imageGallery: [stampImage],
    price: 1800,
    category: "Custom Rubber Stamps",
    brand: "Professional"
  },
  {
    id: "premium-wireless-earbuds",
    name: "Premium Wireless Earbuds",
    imageGallery: [mobileImage],
    price: 2200,
    oldPrice: 2934,
    category: "Mobile Accessories",
    brand: "Erd",
    discount: 25
  },
  {
    id: "custom-t-shirt-printing",
    name: "Custom T-Shirt Printing Service",
    imageGallery: [customPrintingImage],
    price: 450,
    category: "Custom Printing",
    brand: "Pvk Enterprises"
  },
  {
    id: "banner-printing-service",
    name: "Banner & Flex Printing Service",
    imageGallery: [customPrintingImage],
    price: 1200,
    oldPrice: 1333,
    category: "Custom Printing",
    brand: "Pvk Enterprises",
    discount: 10
  },
  {
    id: "business-card-offset",
    name: "Business Card Offset Printing (1000 pcs)",
    imageGallery: [offsetPrintingImage],
    price: 1800,
    category: "Offset Printing",
    brand: "Pvk Enterprises"
  },
  {
    id: "brochure-offset-printing",
    name: "Brochure Offset Printing (500 pcs)",
    imageGallery: [offsetPrintingImage],
    price: 2500,
    oldPrice: 2941,
    category: "Offset Printing",
    brand: "Pvk Enterprises",
    discount: 15
  },
  {
    id: "wooden-photo-frame",
    name: "Premium Wooden Photo Frame Set",
    imageGallery: [frameStudioImage],
    price: 1200,
    category: "Frame Studio",
    brand: "Pvk Enterprises"
  },
  {
    id: "display-pedestal",
    name: "Display Pedestal for Trophies",
    imageGallery: [frameStudioImage],
    price: 2800,
    oldPrice: 3182,
    category: "Frame Studio",
    brand: "Pvk Enterprises",
    discount: 12
  },
  {
    id: "wedding-invite-classic",
    name: "Handcrafted Wedding Invitation Suite",
    imageGallery: [customPrintingImage],
    price: 3200,
    category: "Wedding Cards",
    brand: "PVK Custom"
  },
  {
    id: "notebook-custom-luxe",
    name: "Executive Customized Notebook Set",
    imageGallery: [officeImage],
    price: 950,
    category: "Customized Notebook",
    brand: "Premium Office"
  },
  {
    id: "student-id-premium",
    name: "Premium Student ID Card Package",
    imageGallery: [printerImage],
    price: 260,
    category: "Student ID",
    brand: "PVK Print"
  },
  {
    id: "visiting-card-velvet",
    name: "Velvet Touch Visiting Card (100 pcs)",
    imageGallery: [offsetPrintingImage],
    price: 780,
    category: "Visiting Card",
    brand: "PVK Print"
  },
  {
    id: "notice-printing-rush",
    name: "Rush Notice Printing (A3 Laminated)",
    imageGallery: [customPrintingImage],
    price: 540,
    category: "Notice Printing",
    brand: "PVK Custom"
  },
  {
    id: "memento-1051a",
    name: "MEMENTO 1051A",
    imageGallery: [trophyImage],
    price: 80,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "memento-1053a",
    name: "MEMENTO 1053A",
    imageGallery: [trophyImage],
    price: 180,
    oldPrice: 200,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 10
  },
  {
    id: "memento-1480a",
    name: "MEMENTO 1480 A",
    imageGallery: [trophyImage],
    price: 40,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "memento-1618b",
    name: "MEMENTO 1618 B",
    imageGallery: [trophyImage],
    price: 75,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "memento-162a",
    name: "MEMENTO 162A",
    imageGallery: [trophyImage],
    price: 40,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "memento-1734c",
    name: "MEMENTO 1734C",
    imageGallery: [trophyImage],
    price: 47,
    oldPrice: 49,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 5
  },
  {
    id: "memento-211c",
    name: "MEMENTO 211C",
    imageGallery: [trophyImage],
    price: 140,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "memento-29977",
    name: "MEMENTO 29977",
    imageGallery: [trophyImage],
    price: 95,
    oldPrice: 100,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 5
  },
  {
    id: "memento-32923",
    name: "MEMENTO 32923",
    imageGallery: [trophyImage],
    price: 500,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "memento-33333",
    name: "MEMENTO 33333",
    imageGallery: [trophyImage],
    price: 160,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "memento-3335",
    name: "MEMENTO 3335",
    imageGallery: [trophyImage],
    price: 145,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "memento-55a",
    name: "MEMENTO 55A",
    imageGallery: [trophyImage],
    price: 95,
    oldPrice: 100,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 5
  },
  {
    id: "memento-6mm2a",
    name: "MEMENTO 6MM2A",
    imageGallery: [trophyImage],
    price: 88,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "memento-7211a",
    name: "MEMENTO 7211A",
    imageGallery: [trophyImage],
    price: 36,
    oldPrice: 40,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 10
  },
  {
    id: "memento-7215a",
    name: "MEMENTO 7215A",
    imageGallery: [trophyImage],
    price: 37,
    oldPrice: 49,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 25
  },
  {
    id: "memento-8208",
    name: "MEMENTO 8208",
    imageGallery: [trophyImage],
    price: 95,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "memento-976a",
    name: "MEMENTO 976A",
    imageGallery: [trophyImage],
    price: 36,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "mini-c-2082-33638",
    name: "Mini C 2082 33638",
    imageGallery: [trophyImage],
    price: 60,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "mini-cup-31434",
    name: "MINI CUP 31434",
    imageGallery: [trophyImage],
    price: 20,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "mini-cup-matt-finishin",
    name: "Mini Cup Matt Finishin",
    imageGallery: [trophyImage],
    price: 85,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "mini-spider-black-trophy",
    name: "MINI SPIDER BLACK TROPHY",
    imageGallery: [trophyImage],
    price: 2200,
    oldPrice: 2500,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 12
  },
  {
    id: "new-zara-glass-trophy",
    name: "New Zara Glass Trophy",
    imageGallery: [trophyImage],
    price: 375,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "oval-foil-trophy-31855",
    name: "OVAL FOIL TROPHY 31855",
    imageGallery: [trophyImage],
    price: 960,
    oldPrice: 1000,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 4
  },
  {
    id: "penwood-2",
    name: "PENWOOD 2",
    imageGallery: [trophyImage],
    price: 750,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "petel-6mm-glass-trophy",
    name: "Petel 6mm Glass Trophy",
    imageGallery: [trophyImage],
    price: 300,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "pmg-2089-pamco",
    name: "PMG 2089 PAMCO",
    imageGallery: [trophyImage],
    price: 180,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "priya-wood-trophy",
    name: "Priya Wood Trophy",
    imageGallery: [trophyImage],
    price: 1200,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "q3-beveled-glass-trophy",
    name: "Q3 Beveled Glass Trophy",
    imageGallery: [trophyImage],
    price: 320,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "round-wood-b",
    name: "Round Wood B",
    imageGallery: [trophyImage],
    price: 650,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "s2-big-c-34820",
    name: "S2 Big C 34820",
    imageGallery: [trophyImage],
    price: 100,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "sf-n-glass-trophy-34025",
    name: "SF-N Glass Trophy 34025",
    imageGallery: [trophyImage],
    price: 250,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "spider-red-a-trophy",
    name: "Spider Red A Trophy",
    imageGallery: [trophyImage],
    price: 3400,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "spider-red-b-trophy",
    name: "Spider Red B Trophy",
    imageGallery: [trophyImage],
    price: 4400,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "star-5306b",
    name: "STAR 5306B",
    imageGallery: [trophyImage],
    price: 135,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "star-c-trophy-31308",
    name: "Star C Trophy 31308",
    imageGallery: [trophyImage],
    price: 170,
    oldPrice: 200,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 15
  },
  {
    id: "star-wood-mini-a",
    name: "Star Wood Mini A",
    imageGallery: [trophyImage],
    price: 46,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "star-wood-mini-b",
    name: "Star Wood Mini B",
    imageGallery: [trophyImage],
    price: 55,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "sunny-a29840",
    name: "SUNNY A29840",
    imageGallery: [trophyImage],
    price: 22,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-10-inch",
    name: "Trophy 10 Inch",
    imageGallery: [trophyImage],
    price: 280,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-10-37397",
    name: "Trophy 10\" 37397",
    imageGallery: [trophyImage],
    price: 280,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1001-a",
    name: "Trophy 1001 A",
    imageGallery: [trophyImage],
    price: 110,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1010-a",
    name: "Trophy 1010 A",
    imageGallery: [trophyImage],
    price: 110,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1035-a",
    name: "Trophy 1035 A",
    imageGallery: [trophyImage],
    price: 120,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1035-c",
    name: "Trophy 1035 C",
    imageGallery: [trophyImage],
    price: 160,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1036-mini-a",
    name: "Trophy 1036 Mini A",
    imageGallery: [trophyImage],
    price: 450,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1041-a",
    name: "Trophy 1041 A",
    imageGallery: [trophyImage],
    price: 80,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1041-c-35028",
    name: "Trophy 1041 C 35028",
    imageGallery: [trophyImage],
    price: 150,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1071-c-35029",
    name: "Trophy 1071 C 35029",
    imageGallery: [trophyImage],
    price: 150,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1090-a",
    name: "Trophy 1090 A",
    imageGallery: [trophyImage],
    price: 60,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1090-b",
    name: "Trophy 1090 B",
    imageGallery: [trophyImage],
    price: 80,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1106-a",
    name: "Trophy 1106 A",
    imageGallery: [trophyImage],
    price: 48,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1106-b",
    name: "Trophy 1106 B",
    imageGallery: [trophyImage],
    price: 56,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1115-b",
    name: "Trophy 1115 B",
    imageGallery: [trophyImage],
    price: 80,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1140-2",
    name: "Trophy 1140-2",
    imageGallery: [trophyImage],
    price: 1200,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1140-3",
    name: "Trophy 1140-3",
    imageGallery: [trophyImage],
    price: 1600,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1140-4",
    name: "Trophy 1140-4",
    imageGallery: [trophyImage],
    price: 1900,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1149-a",
    name: "Trophy 1149 A",
    imageGallery: [trophyImage],
    price: 75,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1322c",
    name: "TROPHY 1322C",
    imageGallery: [trophyImage],
    price: 250,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-1537",
    name: "Trophy 1537",
    imageGallery: [trophyImage],
    price: 32,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-197-a",
    name: "Trophy 197 A",
    imageGallery: [trophyImage],
    price: 1700,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-197-cup-c",
    name: "Trophy 197 Cup C",
    imageGallery: [trophyImage],
    price: 1800,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-204-trophy-35025",
    name: "Trophy 204 Trophy 35025",
    imageGallery: [trophyImage],
    price: 750,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-205-a-35026",
    name: "Trophy 205 A 35026",
    imageGallery: [trophyImage],
    price: 750,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-212-a",
    name: "Trophy 212 A",
    imageGallery: [trophyImage],
    price: 550,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-212-b",
    name: "Trophy 212 B",
    imageGallery: [trophyImage],
    price: 600,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-212-c",
    name: "Trophy 212 C",
    imageGallery: [trophyImage],
    price: 700,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-212-metal-c",
    name: "Trophy 212 Metal C",
    imageGallery: [trophyImage],
    price: 700,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-215-c",
    name: "Trophy 215 C",
    imageGallery: [trophyImage],
    price: 360,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-216-c-33119",
    name: "Trophy 216 C 33119",
    imageGallery: [trophyImage],
    price: 80,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-216a-34604",
    name: "Trophy 216A 34604",
    imageGallery: [trophyImage],
    price: 40,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-22-b",
    name: "Trophy 22 B",
    imageGallery: [trophyImage],
    price: 30,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-22-c",
    name: "Trophy 22 C",
    imageGallery: [trophyImage],
    price: 40,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-229-c",
    name: "Trophy 229 C",
    imageGallery: [trophyImage],
    price: 70,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-260-a",
    name: "Trophy 260 A",
    imageGallery: [trophyImage],
    price: 46,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-260-b",
    name: "Trophy 260 B",
    imageGallery: [trophyImage],
    price: 54,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-260-c",
    name: "Trophy 260 C",
    imageGallery: [trophyImage],
    price: 60,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-273-c",
    name: "Trophy 273 C",
    imageGallery: [trophyImage],
    price: 200,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-278-a",
    name: "Trophy 278 A",
    imageGallery: [trophyImage],
    price: 42,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-29987",
    name: "Trophy 29987",
    imageGallery: [trophyImage],
    price: 1600,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-29988",
    name: "Trophy 29988",
    imageGallery: [trophyImage],
    price: 1400,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-304-c",
    name: "Trophy 304 C",
    imageGallery: [trophyImage],
    price: 320,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-3196-a",
    name: "Trophy 3196 A",
    imageGallery: [trophyImage],
    price: 400,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-3196-b",
    name: "Trophy 3196 B",
    imageGallery: [trophyImage],
    price: 500,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-3196-c",
    name: "Trophy 3196 C",
    imageGallery: [trophyImage],
    price: 800,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-416-b",
    name: "Trophy 416 B",
    imageGallery: [trophyImage],
    price: 500,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-417-a",
    name: "Trophy 417 A",
    imageGallery: [trophyImage],
    price: 350,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-417-b",
    name: "Trophy 417 B",
    imageGallery: [trophyImage],
    price: 450,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-417-c",
    name: "Trophy 417 C",
    imageGallery: [trophyImage],
    price: 500,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-4352-a",
    name: "Trophy 4352 A",
    imageGallery: [trophyImage],
    price: 800,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-4352-b",
    name: "Trophy 4352 B",
    imageGallery: [trophyImage],
    price: 1000,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-4352-c",
    name: "Trophy 4352 C",
    imageGallery: [trophyImage],
    price: 1200,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-4365-a",
    name: "Trophy 4365 A",
    imageGallery: [trophyImage],
    price: 400,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-4365-b",
    name: "Trophy 4365 B",
    imageGallery: [trophyImage],
    price: 500,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-4365-c",
    name: "Trophy 4365 C",
    imageGallery: [trophyImage],
    price: 700,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-5-star-31318",
    name: "TROPHY 5 STAR 31318",
    imageGallery: [trophyImage],
    price: 35,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-5-5-inch",
    name: "Trophy 5.5 Inch",
    imageGallery: [trophyImage],
    price: 80,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-5317-a",
    name: "Trophy 5317 A",
    imageGallery: [trophyImage],
    price: 750,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-5349-a",
    name: "Trophy 5349 A",
    imageGallery: [trophyImage],
    price: 400,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-5349-b",
    name: "Trophy 5349 B",
    imageGallery: [trophyImage],
    price: 420,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-5349-c",
    name: "Trophy 5349 C",
    imageGallery: [trophyImage],
    price: 450,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-5641-a",
    name: "Trophy 5641 A",
    imageGallery: [trophyImage],
    price: 800,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-5641-b",
    name: "Trophy 5641 B",
    imageGallery: [trophyImage],
    price: 1000,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-5641-c",
    name: "Trophy 5641 C",
    imageGallery: [trophyImage],
    price: 1600,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-5641-d",
    name: "Trophy 5641 D",
    imageGallery: [trophyImage],
    price: 2000,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-5972a-34607",
    name: "Trophy 5972A 34607",
    imageGallery: [trophyImage],
    price: 90,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-5972c-34608",
    name: "Trophy 5972C 34608",
    imageGallery: [trophyImage],
    price: 130,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-6512",
    name: "Trophy 6512",
    imageGallery: [trophyImage],
    price: 160,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-6565-a",
    name: "Trophy 6565 A",
    imageGallery: [trophyImage],
    price: 110,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-6565-c",
    name: "Trophy 6565 C",
    imageGallery: [trophyImage],
    price: 180,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-6617-c",
    name: "Trophy 6617 C",
    imageGallery: [trophyImage],
    price: 275,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-664c",
    name: "TROPHY 664C",
    imageGallery: [trophyImage],
    price: 370,
    oldPrice: 400,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 7.5
  },
  {
    id: "trophy-993-c-33980",
    name: "Trophy 993 C 33980",
    imageGallery: [trophyImage],
    price: 150,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-998a",
    name: "TROPHY 998A",
    imageGallery: [trophyImage],
    price: 580,
    oldPrice: 600,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 3.33
  },
  {
    id: "trophy-aanakkombu-32919",
    name: "Trophy Aanakkombu 32919",
    imageGallery: [trophyImage],
    price: 350,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-abbba",
    name: "Trophy ABBBA",
    imageGallery: [trophyImage],
    price: 300,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-cd-cup",
    name: "Trophy CD Cup",
    imageGallery: [trophyImage],
    price: 1900,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-copper-a",
    name: "Trophy Copper A",
    imageGallery: [trophyImage],
    price: 1100,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-copper-c",
    name: "Trophy Copper C",
    imageGallery: [trophyImage],
    price: 1600,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-cricket-file",
    name: "Trophy Cricket File",
    imageGallery: [trophyImage],
    price: 1100,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-delta-a",
    name: "Trophy Delta A",
    imageGallery: [trophyImage],
    price: 22,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-euro-a",
    name: "Trophy Euro A",
    imageGallery: [trophyImage],
    price: 22,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-golden-boot",
    name: "Trophy Golden Boot",
    imageGallery: [trophyImage],
    price: 450,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-jambo",
    name: "Trophy Jambo",
    imageGallery: [trophyImage],
    price: 3500,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-king-34024",
    name: "Trophy King 34024",
    imageGallery: [trophyImage],
    price: 290,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-lsf-b",
    name: "Trophy LSF B",
    imageGallery: [trophyImage],
    price: 30,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-lsf-c",
    name: "Trophy LSF C",
    imageGallery: [trophyImage],
    price: 40,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-mandir-32193",
    name: "Trophy Mandir 32193",
    imageGallery: [trophyImage],
    price: 220,
    oldPrice: 250,
    category: "Trophies & Awards",
    brand: "PVK",
    discount: 12
  },
  {
    id: "trophy-mini-cup-5",
    name: "Trophy Mini Cup 5",
    imageGallery: [trophyImage],
    price: 30,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-mt-419-a",
    name: "Trophy MT 419 A",
    imageGallery: [trophyImage],
    price: 350,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-mt-419-b",
    name: "Trophy MT 419 B",
    imageGallery: [trophyImage],
    price: 500,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-mt-419-c",
    name: "Trophy MT 419 C",
    imageGallery: [trophyImage],
    price: 600,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-nip-b",
    name: "Trophy Nip B",
    imageGallery: [trophyImage],
    price: 30,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-nip-c",
    name: "Trophy Nip C",
    imageGallery: [trophyImage],
    price: 42,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-nip-d",
    name: "Trophy Nip D",
    imageGallery: [trophyImage],
    price: 55,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-no-21-b",
    name: "Trophy NO 21 B",
    imageGallery: [trophyImage],
    price: 30,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-no-21-c",
    name: "Trophy NO 21 C",
    imageGallery: [trophyImage],
    price: 40,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-no-480-b",
    name: "Trophy NO 480 B",
    imageGallery: [trophyImage],
    price: 500,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-np-406-a",
    name: "Trophy NP 406 A",
    imageGallery: [trophyImage],
    price: 110,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-np-406-b",
    name: "Trophy NP 406 B",
    imageGallery: [trophyImage],
    price: 130,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-np-406-c",
    name: "Trophy NP 406 C",
    imageGallery: [trophyImage],
    price: 150,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-np-c",
    name: "Trophy NP C",
    imageGallery: [trophyImage],
    price: 180,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-pd-01",
    name: "Trophy PD 01",
    imageGallery: [trophyImage],
    price: 80,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-plate-wood",
    name: "Trophy Plate Wood",
    imageGallery: [trophyImage],
    price: 150,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-simo-thukdi",
    name: "Trophy SIMO Thukdi",
    imageGallery: [trophyImage],
    price: 350,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-to-5",
    name: "Trophy TO 5",
    imageGallery: [trophyImage],
    price: 350,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-tree-a-31448",
    name: "TROPHY TREE A 31448",
    imageGallery: [trophyImage],
    price: 22,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-v-statue",
    name: "Trophy V Statue",
    imageGallery: [trophyImage],
    price: 350,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-valkkannadi-a-32923",
    name: "Trophy Valkkannadi A 32923",
    imageGallery: [trophyImage],
    price: 500,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "trophy-8212-a",
    name: "Trophy 8212 A",
    imageGallery: [trophyImage],
    price: 120,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "tsgm-130-31452",
    name: "TSGM 130 31452",
    imageGallery: [trophyImage],
    price: 180,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "tsgm-140",
    name: "TSGM 140",
    imageGallery: [trophyImage],
    price: 180,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "white-football-trophy-34819",
    name: "White Football Trophy 34819",
    imageGallery: [trophyImage],
    price: 600,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "zara-8001-glass-trophy",
    name: "ZARA 8001 GLASS TROPHY",
    imageGallery: [trophyImage],
    price: 450,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "zara-8008-glass-trophy",
    name: "Zara 8008 Glass Trophy",
    imageGallery: [trophyImage],
    price: 400,
    category: "Trophies & Awards",
    brand: "PVK"
  },
  {
    id: "akari-led-night-lamp-touch-switch",
    name: "AKARI Led Night Lamp With Touch Switch",
    imageGallery: [officeImage],
    price: 500,
    category: "Office Stationery",
    brand: "Akari"
  },
  {
    id: "anpu-notebook-65gsm-160-pages-plain",
    name: "Anpu Notebook 65GSM 160 Pages Plain",
    imageGallery: [officeImage],
    price: 50,
    category: "Office Stationery",
    brand: "Anpu"
  },
  {
    id: "apsara-16-wax-crayons-16-shades",
    name: "Apsara 16 Wax Crayons - 16 Shades",
    imageGallery: [officeImage],
    price: 40,
    category: "Office Stationery",
    brand: "Apsara"
  },
  {
    id: "apsara-long-point-sharpeners-pack-of-20",
    name: "Apsara Long Point Sharpeners - Pack of 20",
    imageGallery: [officeImage],
    price: 80,
    oldPrice: 100,
    category: "Office Stationery",
    brand: "Apsara",
    discount: 20
  },
  {
    id: "apsara-matt-magic-pencil-2-0-pack-of-100",
    name: "Apsara Matt Magic Pencil 2.0 [Pack of 100]",
    imageGallery: [officeImage],
    price: 425,
    oldPrice: 600,
    category: "Office Stationery",
    brand: "Apsara",
    discount: 29.17
  },
  {
    id: "apsara-matt-magic-pencil-2-0-pack-of-10",
    name: "Apsara Matt Magic Pencil 2.0 [Pack of 10]",
    imageGallery: [officeImage],
    price: 50,
    oldPrice: 60,
    category: "Office Stationery",
    brand: "Apsara",
    discount: 16.67
  },
  {
    id: "apsara-platinum-extra-dark-pencils-pack-of-10",
    name: "Apsara Platinum Extra Dark Pencils - Pack of 10",
    imageGallery: [officeImage],
    price: 50,
    category: "Office Stationery",
    brand: "Apsara"
  },
  {
    id: "apsara-platinum-extra-dark-pencils-pack-of-100",
    name: "Apsara Platinum Extra Dark Pencils - Pack of 100",
    imageGallery: [officeImage],
    price: 425,
    oldPrice: 600,
    category: "Office Stationery",
    brand: "Apsara",
    discount: 29.17
  },
  {
    id: "balaji-magik-12-colour-1-non-toxic",
    name: "Balaji Magik 12 Colour 1 Non Toxic",
    imageGallery: [officeImage],
    price: 30,
    category: "Office Stationery",
    brand: "Balaji"
  },
  {
    id: "diya-a4-note-book-144-pages",
    name: "Diya A4 Note Book 144 Pages",
    imageGallery: [officeImage],
    price: 70,
    oldPrice: 80,
    category: "Office Stationery",
    brand: "Bbi",
    discount: 12.5
  },
  {
    id: "camel-student-oil-pastels-assorted-carton-set-of-12",
    name: "Camel Student Oil Pastels: Assorted Carton Set of 12",
    imageGallery: [officeImage],
    price: 45,
    oldPrice: 50,
    category: "Office Stationery",
    brand: "Camel",
    discount: 10
  },
  {
    id: "camlin-kokuyo-student-water-color-cakes-12-shades",
    name: "Camlin Kokuyo Student Water Color Cakes - 12 Shades",
    imageGallery: [officeImage],
    price: 35,
    category: "Office Stationery",
    brand: "Camel"
  },
  {
    id: "camlin-whiteboard-marker-ink-black-colour-15ml",
    name: "Camlin Whiteboard Marker Ink (Black Colour) 15ml",
    imageGallery: [officeImage],
    price: 35,
    category: "Office Stationery",
    brand: "Camlin"
  },
  {
    id: "casio-fx-82ms-2nd-gen-non-programmable-scientific",
    name: "Casio FX-82MS 2nd Gen Non-Programmable Scientific Calculator",
    imageGallery: [officeImage],
    price: 550,
    category: "Office Stationery",
    brand: "Casio"
  },
  {
    id: "casio-hl-815l-bk-portable-calculator",
    name: "CASIO HL-815L-BK Portable Calculator",
    imageGallery: [officeImage],
    price: 160,
    category: "Office Stationery",
    brand: "Casio"
  },
  {
    id: "casio-mj-120d-150-steps-check-and-correct-desktop",
    name: "Casio MJ-120D 150 Steps Check and Correct Desktop Calculator",
    imageGallery: [officeImage],
    price: 535,
    category: "Office Stationery",
    brand: "Casio"
  },
  {
    id: "casio-sx-300p-w-portable-calculator-with-metallic",
    name: "Casio SX-300P-W Portable Calculator with Metallic",
    imageGallery: [officeImage],
    price: 270,
    category: "Office Stationery",
    brand: "Casio"
  },
  {
    id: "cello-techno-tip-ball-pen",
    name: "Cello Techno Tip Ball Pen",
    imageGallery: [officeImage],
    price: 100,
    category: "Office Stationery",
    brand: "Cello"
  },
  {
    id: "doms-art-strokes",
    name: "DOMS Art Strokes",
    imageGallery: [officeImage],
    price: 149,
    category: "Office Stationery",
    brand: "Doms"
  },
  {
    id: "kaveris-swan-envelopes-9x4-25-pack-of-250-white",
    name: "Kaveri's Swan Envelopes 9x4.25 (Pack of 250 White)",
    imageGallery: [officeImage],
    price: 210,
    category: "Office Stationery",
    brand: "Envelopes"
  },
  {
    id: "esha-cartoon-colouring-book",
    name: "Esha Cartoon Colouring Book",
    imageGallery: [officeImage],
    price: 30,
    category: "Office Stationery",
    brand: "Esha"
  },
  {
    id: "fasson-barcode-sticker-rolls-34mm-by-20mm-6000pc",
    name: "Fasson Barcode Sticker rolls-34mm by 20mm (6000pc per roll) NG - Pack of 1 Rolls- Thermal Transfer Stickers",
    imageGallery: [officeImage],
    price: 270,
    oldPrice: 300,
    category: "Office Stationery",
    brand: "Fasson",
    discount: 10
  },
  {
    id: "fasson-barcode-sticker-rolls-38mm-by-25mm-with-gap",
    name: "Fasson Barcode Sticker rolls-38mm by 25mm (With Gap) NG - Pack of 1 Rolls- Thermal Transfer Stickers (1000 pcs per roll)",
    imageGallery: [officeImage],
    price: 200,
    category: "Office Stationery",
    brand: "Fasson"
  },
  {
    id: "fasson-barcode-sticker-rolls-40mm-by-35mm-1500pc",
    name: "Fasson Barcode Sticker rolls-40mm by 35mm (1500pc per roll) TS - Pack of 1 Rolls- Thermal Transfer Stickers",
    imageGallery: [officeImage],
    price: 98,
    oldPrice: 100,
    category: "Office Stationery",
    brand: "Fasson",
    discount: 2
  },
  {
    id: "fasson-barcode-sticker-rolls-58mm-by-38mm-3000pc",
    name: "Fasson Barcode Sticker rolls-58mm by 38mm (3000pc per roll) - Pack of 1 Rolls- Thermal Transfer Stickers",
    imageGallery: [officeImage],
    price: 190,
    oldPrice: 200,
    category: "Office Stationery",
    brand: "Fasson",
    discount: 5
  },
  {
    id: "premium-quality-ivory-paper-a4-size-210mm-x-297mm-85-sheets",
    name: "PREMIUM QUALITY IVORY PAPER A4 Size (210mm x 297mm) 85 Sheets",
    imageGallery: [officeImage],
    price: 115,
    oldPrice: 125,
    category: "Office Stationery",
    brand: "God's Grace",
    discount: 8
  }
];