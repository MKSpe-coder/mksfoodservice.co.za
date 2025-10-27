import { Product } from '../types';

// Helper function to map category strings to category IDs
const getCategoryId = (category: string | undefined): string => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('fryer_baskets_scoops')) return 'fryer_baskets_scoops';
    if (cat.includes('spares')) return 'mks_spares';
    if (cat.includes('smalls') || cat.includes('kitchenware')) return 'smalls_kfc';
    if (cat.includes('filter')) return 'filters';
    if (cat.includes('refrigeration') || cat.includes('freezer') || cat.includes('chiller') || cat.includes('ice')) return 'beverage_refrigeration';
    if (cat.includes('holding') || cat.includes('warmer')) return 'holding_solutions';
    if (cat.includes('fryer') || cat.includes('oven') || cat.includes('grill') || cat.includes('toaster') || cat.includes('cooker') || cat.includes('cooking')) return 'cooking_equipment';
    if (cat.includes('repair') || cat.includes('service')) return 'repairs_services';
    return 'new_equipment'; // Default
};

// Helper function to extract brand name from product name
const getBrandName = (productName: string): string => {
    const name = productName.toUpperCase();
    if (name.includes('PITCO')) return 'Pitco';
    if (name.includes('BKI')) return 'BKI';
    if (name.includes('HENNY PENNY')) return 'Henny Penny';
    if (name.includes('DESMON')) return 'Desmon';
    if (name.includes('FOLLETT')) return 'Follett';
    if (name.includes('TAYLOR')) return 'Taylor';
    if (name.includes('PRINCE CASTLE')) return 'Prince Castle';
    if (name.includes('ICETRO')) return 'Icetro';
    if (name.includes('CARTER-HOFFMANN')) return 'Carter-Hoffmann';
    if (name.includes('HOUNO') || name.includes('INVOQ')) return 'Houno';
    if (name.includes('ANVIL')) return 'Anvil';
    if (name.includes('ANTUNES')) return 'Antunes';
    if (name.includes('APW WYOTT')) return 'APW Wyott';
    if (name.includes('CAMBRO')) return 'Cambro';
    if (name.includes('ROBOT COUPE')) return 'Robot Coupe';
    if (name.includes('HAMILTON BEACH')) return 'Hamilton Beach';
    if (name.includes('MIDDLEBY')) return 'Middleby';
    if (name.includes('GARLAND')) return 'Garland';
    if (name.includes('LINCOLN')) return 'Lincoln';
    if (name.includes('VULCAN')) return 'Vulcan';
    if (name.includes('RATIONAL')) return 'Rational';
    if (name.includes('TURBOCHEF')) return 'TurboChef';
    if (name.includes('STAR')) return 'Star';
    if (name.includes('SOUTHBEND')) return 'Southbend';
    if (name.includes('NEMCO')) return 'Nemco';
    if (name.includes('AYRKING')) return 'Ayrking';

    // Default brand for MKS or generic products
    return 'MKS Innovation';
};

const getKitchenwareSubCategory = (name: string): Product['subCategory'] | undefined => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('brush') || lowerName.includes('spoon') || lowerName.includes('ladle') || lowerName.includes('tong') || lowerName.includes('scraper') || lowerName.includes('skimmer') || lowerName.includes('stirrer') || lowerName.includes('muddler') || lowerName.includes('knife') || lowerName.includes('slicer') || lowerName.includes('spatula')) {
        return 'Utensils';
    }
    if (lowerName.includes('insert') || lowerName.includes('pan') || lowerName.includes('lid') || lowerName.includes('crate') || lowerName.includes('jug') || lowerName.includes('pot') || lowerName.includes('bottle') || lowerName.includes('shaker') || lowerName.includes('drain pan') || lowerName.includes('dip pot') || lowerName.includes('bain marie') || lowerName.includes('lug') || lowerName.includes('plug')) {
        return 'Containers & Storage';
    }
    if (lowerName.includes('scoop') || lowerName.includes('opener') || lowerName.includes('tester') || lowerName.includes('scale') || lowerName.includes('sieve') || lowerName.includes('bagging scoop') || lowerName.includes('timer')) {
        return 'Tools & Gadgets';
    }
    if (lowerName.includes('basket') || lowerName.includes('rack') || lowerName.includes('shelf') || lowerName.includes('screen') || lowerName.includes('trolley') || lowerName.includes('chute')) {
        return 'Baskets & Racks';
    }
    return undefined;
};


const rawProductData: Array<Partial<Product> & { name: string, id: string, description: string, category: string, imageUrl: string }> = [
    // Smalls / Kitchenware
    {"name": "BASTING BRUSH NYLON", "id": "BBH1040", "category": "smalls_kfc", "description": "240 X 40 MM, durable nylon bristles for basting.", "imageUrl": "https://i.postimg.cc/pTbtWWYN/CC-Nylon-basting-brush-1.jpg"},
    {"name": "MKS Stainless Steel Insert Pan", "id": "MKS-IP200", "category": "smalls_kfc", "description": "Durable stainless steel half-size insert pan, 2.5 inches deep.", "imageUrl": "https://i.postimg.cc/NFmg2stJ/INH2150.png"},
    {"name": "MKS Stainless Steel Full Size Insert Pan (100mm)", "id": "INH1100", "category": "smalls_kfc", "description": "Full-size, 100mm deep stainless steel insert pan, perfect for holding and serving food in steam tables.", "imageUrl": "https://i.postimg.cc/KzGk7yv7/INH1100.png"},
    {"name": "MKS Stainless Steel Full Size Insert Pan (150mm)", "id": "INH1150", "category": "smalls_kfc", "description": "Extra-deep 150mm full-size stainless steel insert pan for high-volume food storage and serving.", "imageUrl": "https://i.postimg.cc/mDprb7pG/INH1150.png"},
    {"name": "MKS Stainless Steel Half Size Insert Pan (100mm)", "id": "INH2100", "category": "smalls_kfc", "description": "Half-size, 100mm deep stainless steel insert pan, versatile for various food holding applications.", "imageUrl": "https://i.postimg.cc/mkb7jP9Y/INH2100.png"},
    {"name": "MKS Perforated Basting Spoon", "id": "MKS-SPOON-01", "category": "smalls_kfc", "description": "Durable perforated basting spoon for straining and serving, made from high-quality stainless steel.", "imageUrl": "https://i.postimg.cc/fLNqL62L/MKS-Basting-Spoon.png"},
    {"name": "MKS Stainless Steel Chips Scoop", "id": "MKS-SCOOP-01", "category": "smalls_kfc", "description": "Ergonomic stainless steel scoop for quick and easy bagging of chips and other fried foods.", "imageUrl": "https://i.postimg.cc/pX0LgqV3/MKS-Chips-Scoop.png"},
    {"name": "MKS Stainless Steel Pan Lid", "id": "MKS-LID-01", "category": "smalls_kfc", "description": "Standard stainless steel lid to fit full-size insert pans, helping to maintain food temperature.", "imageUrl": "https://i.postimg.cc/wTjY514J/MKS-Lid-for-Pan.png"},
    {"name": "MKS Polycarbonate Measuring Jug", "id": "MKS-JUG-01", "category": "smalls_kfc", "description": "Clear, durable polycarbonate measuring jug with easy-to-read markings for accurate liquid measurement.", "imageUrl": "https://i.postimg.cc/J0b4rC4X/MKS-Measuring-Jug.png"},
    {"name": "MKS High-Heat Scraper", "id": "MKS-SCRAPER-01", "category": "smalls_kfc", "description": "A versatile high-heat scraper with a silicone blade, safe for use on hot surfaces like griddles.", "imageUrl": "https://i.postimg.cc/SRZc49Gg/MKS-Scraper.png"},
    {"name": "MKS Fine Mesh Skimmer", "id": "MKS-SKIMMER-01", "category": "smalls_kfc", "description": "Fine mesh skimmer for removing particles from hot oil or liquids, keeping your fryer clean.", "imageUrl": "https://i.postimg.cc/prgqYk4q/MKS-Skimmer.png"},
    {"name": "MKS Stainless Steel Spatula", "id": "MKS-SPATULA-01", "category": "smalls_kfc", "description": "Sturdy stainless steel spatula, perfect for flipping burgers, grilling, and general kitchen use.", "imageUrl": "https://i.postimg.cc/2j5T3tG4/MKS-Spatula.png"},
    {"name": "MKS Stainless Steel Spice Shaker", "id": "MKS-SHAKER-01", "category": "smalls_kfc", "description": "Durable stainless steel shaker for dispensing spices, herbs, and seasonings evenly.", "imageUrl": "https://i.postimg.cc/zXN6n5yC/MKS-Spice-Shaker.png"},
    {"name": "MKS Heavy-Duty Utility Tongs", "id": "MKS-TONGS-01", "category": "smalls_kfc", "description": "Heavy-duty stainless steel utility tongs with a locking mechanism for secure handling of food.", "imageUrl": "https://i.postimg.cc/C1Q1W3qJ/MKS-Tongs.png"},
    {"name": "MKS Professional Utility Knife", "id": "MKS-KNIFE-01", "category": "smalls_kfc", "description": "A sharp and reliable utility knife with an ergonomic handle for various kitchen prep tasks.", "imageUrl": "https://i.postimg.cc/283P8L3h/MKS-Utility-Knife.png"},
    {"name": "MKS Spatula", "id": "40614", "category": "smalls_kfc", "description": "Durable spatula for various kitchen applications.", "imageUrl": "https://i.postimg.cc/9Q2c6QYJ/40614.png"},
    {"name": "MKS Drain Pan", "id": "6035-1", "category": "smalls_kfc", "description": "Perforated drain pan for food preparation.", "imageUrl": "https://i.postimg.cc/90X9CbyP/6035-1.png"},
    {"name": "MKS Dip Pot", "id": "75091", "category": "smalls_kfc", "description": "Stainless steel dip pot for sauces and liquids.", "imageUrl": "https://i.postimg.cc/y8X73Nqk/75091.png"},
    {"name": "MKS Bagging Scoop", "id": "N5100", "category": "smalls_kfc", "description": "Ergonomic bagging scoop for chips and other fried items.", "imageUrl": "https://i.postimg.cc/L5nF4F24/N5100.png"},
    {"name": "MKS Digital Timer", "id": "TM-111", "category": "smalls_kfc", "description": "Digital kitchen timer for precise cooking control.", "imageUrl": "https://i.postimg.cc/44N07q9c/TM-111.png"},
    {"name": "MKS Bain Marie Pot", "id": "V2204", "category": "smalls_kfc", "description": "Bain Marie pot for gentle heating and holding.", "imageUrl": "https://i.postimg.cc/Kz4D5M70/V2204.png"},
    {"name": "MKS Meat Lug", "id": "V2241", "category": "smalls_kfc", "description": "Heavy-duty meat lug for transport and storage.", "imageUrl": "https://i.postimg.cc/JnpsP2nh/V2241.png"},
    {"name": "MKS Lug Plug", "id": "V2241PLUG", "category": "smalls_kfc", "description": "Plug for MKS meat lug.", "imageUrl": "https://i.postimg.cc/50fT4t1R/V2241-PLUG.png"},

    // Fryer Baskets
    {"name": "BASKET BIG BIRD GAS", "id": "MKS-WIRE0013", "category": "fryer_baskets_scoops", "description": "Replacement basket for Big Bird gas fryers.", "imageUrl": "https://i.postimg.cc/cCc2bzVt/Whats-App-Image-2025-08-13-at-16-06-10_74fc4187.jpg"},
    {"name": "BASKET CHIPS SMALL", "id": "MKS-WIRE0001", "category": "fryer_baskets_scoops", "description": "Small basket for frying chips, compatible with various models.", "imageUrl": "https://i.postimg.cc/cCc2bzVt/Whats-App-Image-2025-08-13-at-16-06-10_74fc4187.jpg"},

    // Filters
    {"name": "FILTER PAPER ENVELOPE", "id": "MKS-12 X 15", "category": "filters", "description": "High-quality filter paper envelope, size 12x15.", "imageUrl": "https://i.postimg.cc/4ypJkRzS/smart-filter.jpg"},
    {"name": "SMART FILTER PAD", "id": "MKS-FILTER01", "category": "filters", "description": "Advanced filter pad for smart filtration systems.", "imageUrl": "https://i.postimg.cc/4ypJkRzS/smart-filter.jpg"},

    // Holding Solutions
    {"name": "CVAP HOLDING CABINET", "id": "HC7-14-DD", "category": "holding_solutions", "description": "CVap holding cabinet, double door, 14-pan capacity.", "imageUrl": "https://i.postimg.cc/L8y2h2wW/henny-penny-holding-1.jpg"},
    {"name": "Prince Castle DHB2-33 Modular Holding Bin", "id": "PC-DHB2-33", "category": "holding_solutions", "description": "Modular holding bin with independent upper and lower heat zones, ensuring food quality and temperature for extended periods.", "imageUrl": "https://i.postimg.cc/hG12Y8Ld/Prince-Castle-DHB2-33-SS-Extended-Modular-Holding-Bin.jpg"},

    // Cooking Equipment
    {"name": "PITCO GAS FRYER", "id": "P-SG14", "category": "cooking_equipment", "description": "Pitco Solstice Gas Fryer, 14-inch model.", "imageUrl": "https://i.postimg.cc/d3Z5Twtx/SE14-Right-B-Up-1220-Web.jpg"},
    {"name": "PITCO FRIALATOR SE14-S ELECTRIC FRYER", "id": "P-SE14S", "category": "cooking_equipment", "description": "Pitco Frialator SE14-S Electric Fryer with a 14-inch vat, solid state controls, and high-efficiency heating elements.", "imageUrl": "https://i.postimg.cc/SK53q7xK/8-HD-RACK-FRYER-PITCO.jpg"},
    {"name": "PITCO SOLSTICE SUPREME SSH60 GAS FRYER", "id": "P-SSH60", "category": "cooking_equipment", "description": "Pitco Solstice Supreme SSH60 high-efficiency gas fryer, 60-65 lb. oil capacity, with digital controls and self-cleaning burner.", "imageUrl": "https://i.postimg.cc/VLfTLWKj/pitco.jpg"},
    
    // BKI NEW PRODUCTS
    {"name": "BKI Middleby Pressure Fryer Electric FKM-TC", "id": "BKI-FKM-TC", "category": "cooking_equipment", "description": "High-performance electric pressure fryer from BKI Middleby, model FKM-TC. Ideal for high-volume chicken.", "imageUrl": "https://i.postimg.cc/pXr92yvS/BKI-Middleby-PRESSURE-FRYER-ELECTRIC-FKM-TC.png"},
    {"name": "BKI VGG-16-F Electric Rotisserie Oven", "id": "BKI-VGG-16-F", "category": "cooking_equipment", "description": "BKI VGG-16-F electric rotisserie oven with a 16-spit capacity for high-volume cooking.", "imageUrl": "https://i.postimg.cc/L6WJhR4w/BKI-VGG-16-F-ROTISSERIE-BKI-ELECTRIC-OVEN-VGG-16-F.png"},
    {"name": "BKI VGG-8-F Commercial Electric Rotisserie Oven", "id": "BKI-VGG-8-F", "category": "cooking_equipment", "description": "BKI VGG-8-F commercial electric rotisserie oven, 8-spit capacity, perfect for showcasing and cooking delicious rotisserie chicken.", "imageUrl": "https://i.postimg.cc/dtfhDvQb/BKI-VGG-8-F-COMMERCIAL-ROTISSERIE-OVEN-ELECTRIC-VGG-8-F.png"},
    {"name": "BKI FKG-FC Gas Pressure Fryer", "id": "BKI-FKG-FC", "category": "cooking_equipment", "description": "BKI FKG-FC gas pressure fryer, designed for efficiency and consistency in high-volume kitchens.", "imageUrl": "https://i.postimg.cc/7YhCxbDy/BKI-PRESSURE-FRYER-GAS-FKG-FC.webp"},
    
    {"name": "INVOQ COMBI OVEN", "id": "INVOQ-7", "category": "cooking_equipment", "description": "Houno Invoq Combi Oven, 7-rack capacity for versatile cooking.", "imageUrl": "https://i.postimg.cc/1zdhdBTW/Invoq-7-RACKS-Filled-03.jpg"},
    {"name": "BASE STAND FOR INVOQ OVENS", "id": "10010", "category": "new_equipment", "description": "Houno Model No. 10010 INVOQ STAND / BASE Includes Houno Model No. 10010 STAND PARTS 1/1 GN F-P RACK FOR STAND.", "imageUrl": "https://i.postimg.cc/MHnVHxnS/107964-107971-107972-107974-Invoq-Stand-2-1-GN-castors-racks-cabinet-e1702388157448-2048x1659.png"},
    {"name": "COMBI OVEN, ELECTRIC Houno Model No. INVOQ COMBI 20-1/1", "id": "INVOQ COMBI 20-1/1", "category": "cooking_equipment", "description": "INVOQ COMBI 20-1/1GN COMBI OVEN, ELECTRIC Houno Model No. INVOQ COMBI 20-1/1 GN Electric model Invoq Combi: Injection steam Care Cycle, hand shower, probe and adjustable feet are included in all models. Voltage 400 V 3PN AC Power consumption [kW] 38.2 Trolley included", "imageUrl": "https://i.postimg.cc/k5wbyD8C/Generic-Invoq-20-1-GN-Cam001-COMBI-transparent-no-shadow-e1667990969366.png"},
    {"name": "HOUNO COMBI OVEN ELECTRIC 10 PAN", "id": "INVOQ COMBI 10-1/1 GN", "category": "cooking_equipment", "description": "COMBI OVEN, ELECTRIC Houno Model No. INVOQ COMBI 10-1/1 GN Electric model Invoq Combi: Injection steam CareCycle, hand shower, probe and adjustable feet are included in all models Voltage 400 V 3PN AC", "imageUrl": "https://i.postimg.cc/Wzn2rqxL/Invoq-10-1-1-GN-1.png"},
    {"name": "Toaster vertical ANTUNES VCT-2000", "id": "VCT-2000", "category": "cooking_equipment", "description": "Toaster vertical ANTUNES BUN TOASTER VCT-2000 10 sec 220/240V 50Hz CE PN #9210212", "imageUrl": "https://i.postimg.cc/0yPzTN6Y/images.jpg"},
    {"name": "Corn cooker ANTUNES CCC-20", "id": "01155092", "category": "cooking_equipment", "description": "Corn cooker ANTUNES CCC-20 KFC330x650x365 mm230V/50Hz/1Ph, CE, with two baskets", "imageUrl": "https://i.postimg.cc/cHgFBpjJ/Screenshot-2025-10-10-093633.png"},
    {"name": "Prince Castle 943-B Tomato Saber Slicer", "id": "PC-943-B", "category": "smalls_kfc", "description": "Ergonomic and safe tomato slicer that creates uniform 3/16 inch slices with ease, improving consistency and reducing waste.", "imageUrl": "https://i.postimg.cc/Hn8qS4yQ/943-b-prince-castle-tomato-saber-tomato-slicer.jpg"},
    {"name": "Prince Castle 8-Channel Merlin II Timer", "id": "PC-8-CH", "category": "smalls_kfc", "description": "Multi-channel digital timer with programmable channels, alphanumeric displays, and a slim design for tracking multiple cooking cycles.", "imageUrl": "https://i.postimg.cc/3xfPg4Fp/Screenshot-2025-10-10-113006.png"},


    // Beverage & Refrigeration
    {"name": "ICETRO ICE MACHINE", "id": "ICE-IM200", "category": "beverage_refrigeration", "description": "Icetro modular ice machine, produces up to 200kg daily.", "imageUrl": "https://i.postimg.cc/Jzg47X4p/icetro-ice-machine.jpg"},
    
    // MKS Spares (Ayrking)
    {"name": "AYRKING Breading Table", "id": "AYR-BBSU3515-P28", "category": "mks_spares", "description": "Complete breading station table unit.", "imageUrl": "https://i.postimg.cc/yNZsfLWF/AYR-BBSU3515-P28-jpg.jpg"},
    {"name": "AYRKING Sifter Brush", "id": "AYR3700014", "category": "mks_spares", "description": "Replacement sifter brush for Ayrking breading machines.", "imageUrl": "https://i.postimg.cc/13Tyckmd/AYR3700014-view.gif"},
    {"name": "AYRKING Breader Basket", "id": "AYRB101", "category": "mks_spares", "description": "Standard replacement basket for Ayrking breaders.", "imageUrl": "https://i.postimg.cc/2SJCFskM/AYRB101-view.gif"},
    {"name": "AYRKING Breader Basket with Handle", "id": "AYRB101-H", "category": "mks_spares", "description": "Replacement breader basket featuring a convenient handle.", "imageUrl": "https://i.postimg.cc/P5cdzgXg/AYRB101-H-view.gif"},
    {"name": "AYRKING Sifter Screen", "id": "AYRB117", "category": "mks_spares", "description": "Fine mesh sifter screen for Ayrking breading systems.", "imageUrl": "https://i.postimg.cc/K8Vmr6cS/AYRB117-view.gif"},
    {"name": "AYRKING Motor Pulley", "id": "AYRB126", "category": "mks_spares", "description": "Drive motor pulley for Ayrking breading machines.", "imageUrl": "https://i.postimg.cc/kgZ7F0JL/AYRB126-view.gif"},
    {"name": "AYRKING Auger", "id": "AYRB136", "category": "mks_spares", "description": "Replacement auger for Ayrking breading and sifting systems.", "imageUrl": "https://i.postimg.cc/fRFMjGWN/AYRB136-view.gif"},
    {"name": "AYRKING Drive Belt", "id": "AYRB145", "category": "mks_spares", "description": "Replacement drive belt for Ayrking breader motors.", "imageUrl": "https://i.postimg.cc/t4f9tKRG/AYRB145-view.gif"},
    {"name": "AYRKING Drive Motor", "id": "AYRB150", "category": "mks_spares", "description": "Replacement drive motor for Ayrking breading machines.", "imageUrl": "https://i.postimg.cc/wjP9cCxd/AYRB150-view.gif"},
    {"name": "AYRKING Motor with Switch", "id": "AYRB150-S", "category": "mks_spares", "description": "Replacement drive motor assembly with power switch.", "imageUrl": "https://i.postimg.cc/QdPjk2N8/AYRB150-S-view.gif"},
    {"name": "AYRKING Power Switch", "id": "AYRB160", "category": "mks_spares", "description": "Replacement power switch for Ayrking equipment.", "imageUrl": "https://i.postimg.cc/XYhncRNN/AYRB160-view.gif"},
    {"name": "AYRKING Breader Lid", "id": "AYRB201", "category": "mks_spares", "description": "Replacement lid for Ayrking breading machine pans.", "imageUrl": "https://i.postimg.cc/jS9RQpqd/AYRB201-view.gif"},
    {"name": "AYRKING Breader Pan", "id": "AYRB202", "category": "mks_spares", "description": "Durable replacement pan for Ayrking breading stations.", "imageUrl": "https://i.postimg.cc/VkTzBxsN/AYRB202-view.gif"},
    {"name": "AYRKING Breader Leg", "id": "AYRB203", "category": "mks_spares", "description": "Single replacement leg for Ayrking breading machines.", "imageUrl": "https://i.postimg.cc/YCVtf520/AYRB203-view.gif"},
    {"name": "AYRKING Breader Frame", "id": "AYRB206", "category": "mks_spares", "description": "Main frame assembly for Ayrking breading machines.", "imageUrl": "https://i.postimg.cc/t4f9tKR1/AYRB206-view.gif"},
    {"name": "AYRKING Caster Wheel", "id": "AYRB219", "category": "mks_spares", "description": "Replacement caster wheel for mobile Ayrking equipment.", "imageUrl": "https://i.postimg.cc/t4f9tKRn/AYRB219-view.gif"},
    {"name": "AYRKING Dip Pot", "id": "AYRB240", "category": "mks_spares", "description": "Stainless steel dip pot for batter and liquids.", "imageUrl": "https://i.postimg.cc/439s8WnN/AYRB240-view.gif"},
    {"name": "AYRKING Dip Pot Lid", "id": "AYRB241", "category": "mks_spares", "description": "Lid for the Ayrking stainless steel dip pot.", "imageUrl": "https://i.postimg.cc/rprMhfzw/AYRB241-view.gif"},
    {"name": "AYRKING Breading Table Top", "id": "AYRB302", "category": "mks_spares", "description": "Replacement top surface for Ayrking breading tables.", "imageUrl": "https://i.postimg.cc/XvC42sXv/AYRB302-view.gif"},
    {"name": "AYRKING Breading Table Shelf", "id": "AYRB303", "category": "mks_spares", "description": "Lower shelf for Ayrking breading tables.", "imageUrl": "https://i.postimg.cc/g0ZmMgrj/AYRB303-view.jpg"},
    {"name": "AYRKING Breading Table Leg", "id": "AYRB304", "category": "mks_spares", "description": "Single replacement leg for Ayrking breading tables.", "imageUrl": "https://i.postimg.cc/JhkMTptt/AYRB304-view.gif"},
    {"name": "AYRKING Lid Handle", "id": "AYRB319", "category": "mks_spares", "description": "Replacement handle for Ayrking breader lids.", "imageUrl": "https://i.postimg.cc/439s8Wnm/AYRB319-view.gif"},
    {"name": "AYRKING Breader Sifter Assembly", "id": "AYRB530", "category": "mks_spares", "description": "Complete sifter assembly for Ayrking breading machines.", "imageUrl": "https://i.postimg.cc/FKLNPT1f/AYRB530-view.gif"},
    {"name": "AYRKING Breader Auger Assembly", "id": "AYRB531", "category": "mks_spares", "description": "Complete auger assembly for Ayrking breading machines.", "imageUrl": "https://i.postimg.cc/5tCbPsjY/AYRB531-view.gif"},
];

export const productList: Product[] = rawProductData
  // Ensure that only complete product data is processed
  .filter(p => p.id && p.name && p.description && p.category && p.imageUrl)
  .map(p => {
    const categoryId = getCategoryId(p.category);
    return {
      id: p.id!,
      name: p.name!,
      category: p.category!,
      categoryId: categoryId,
      brandName: getBrandName(p.name!),
      description: p.description!,
      // Add default values for missing properties
      price: 'Contact for price',
      inStock: Math.floor(Math.random() * 25) + 1, // Random stock between 1 and 25
      imageUrl: p.imageUrl!,
      subCategory: categoryId === 'smalls_kfc' ? getKitchenwareSubCategory(p.name!) : undefined,
    };
});