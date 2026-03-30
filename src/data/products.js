export const CATEGORIES = [
  { id: "desayunos", name: "Desayunos Sorpresa", emoji: "🥐", image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400" },
  { id: "flores", name: "Arreglos Florales", emoji: "🌹", image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400" },
  { id: "globos", name: "Globos Personalizados", emoji: "🎈", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400" },
  { id: "fresas", name: "Fresas con Chocolate", emoji: "🍓", image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400" },
  { id: "peluches", name: "Peluches", emoji: "🧸", image: "https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=400" },
  { id: "anchetas", name: "Anchetas", emoji: "🎁", image: "https://images.unsplash.com/photo-1549465220-1a8b9238f060?w=400" },
  { id: "tablas", name: "Tablas de Picada", emoji: "🧀", image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400" },
  { id: "personalizados", name: "Detalles Personalizados", emoji: "✨", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400" },
];

export const PRODUCTS = [
  // Desayunos
  { id: 1, name: "Desayuno Sorpresa Clásico", slug: "desayuno-clasico", category: "desayunos", price: 85000, oldPrice: null, description: "Bandeja de desayuno con pancakes, frutas frescas, jugo natural, sándwich gourmet, galletas decoradas y mensaje personalizado. Incluye globo de helio.", images: ["https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600", "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600"], featured: true, badge: "Popular" },
  { id: 2, name: "Desayuno Sorpresa Premium", slug: "desayuno-premium", category: "desayunos", price: 135000, oldPrice: 155000, description: "Desayuno completo en caja decorada: waffles, porción de frutas, jugo natural, croissant con jamón y queso, postre mini, chocolates artesanales. Incluye 3 globos de helio personalizados.", images: ["https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600", "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600"], featured: true, badge: "Oferta" },
  { id: 3, name: "Desayuno Fit Saludable", slug: "desayuno-fit", category: "desayunos", price: 95000, oldPrice: null, description: "Granola artesanal, yogurt griego, bowl de frutas, jugo verde detox, tostadas integrales con aguacate. Perfecto para los amantes de lo saludable.", images: ["https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=600"], featured: false, badge: null },
  { id: 4, name: "Desayuno Romántico", slug: "desayuno-romantico", category: "desayunos", price: 165000, oldPrice: null, description: "Desayuno para dos: pancakes en forma de corazón, fresas con chocolate, mimosas, croissants, mermelada artesanal. Decorado con pétalos de rosa y velas.", images: ["https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600"], featured: true, badge: "Romántico" },

  // Flores
  { id: 5, name: "Ramo de 24 Rosas Rojas", slug: "ramo-24-rosas", category: "flores", price: 120000, oldPrice: null, description: "Hermoso ramo de 24 rosas rojas premium, envueltas en papel kraft y cinta de satín. El regalo perfecto para expresar amor.", images: ["https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600", "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600"], featured: true, badge: "Más vendido" },
  { id: 6, name: "Arreglo Floral Mixto", slug: "arreglo-mixto", category: "flores", price: 95000, oldPrice: null, description: "Arreglo en caja redonda con rosas, girasoles, margaritas y follaje verde. Colores vibrantes que alegran cualquier espacio.", images: ["https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600"], featured: false, badge: null },
  { id: 7, name: "Caja de Rosas con Chocolates", slug: "caja-rosas-chocolates", category: "flores", price: 145000, oldPrice: 170000, description: "Elegante caja con 12 rosas importadas y selección de chocolates belgas. El combo perfecto de romance.", images: ["https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=600"], featured: true, badge: "Oferta" },
  { id: 8, name: "Bouquet de Girasoles", slug: "bouquet-girasoles", category: "flores", price: 85000, oldPrice: null, description: "Ramo radiante de girasoles frescos envueltos en papel natural. Transmiten alegría y energía positiva.", images: ["https://images.unsplash.com/photo-1551722434-8b94ddff27c6?w=600"], featured: false, badge: null },

  // Globos
  { id: 9, name: "Globo Burbuja Personalizado", slug: "globo-burbuja", category: "globos", price: 65000, oldPrice: null, description: "Globo burbuja transparente con mensaje personalizado en vinilo, relleno con confeti y mini globos. Incluye base y peso decorativo.", images: ["https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600"], featured: true, badge: "Personalizable" },
  { id: 10, name: "Arco de Globos Rose Gold", slug: "arco-globos-rosegold", category: "globos", price: 180000, oldPrice: null, description: "Arco de globos en tonos rose gold, dorado y blanco. Perfecto para cumpleaños, baby showers y celebraciones especiales. Incluye instalación.", images: ["https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600"], featured: false, badge: null },
  { id: 11, name: "Bouquet de Globos Cumpleaños", slug: "bouquet-globos-cumple", category: "globos", price: 75000, oldPrice: null, description: "Set de 7 globos de helio: 1 globo burbuja con mensaje, 3 metálicos dorados y 3 de látex con confeti. Con cinta decorativa.", images: ["https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600"], featured: true, badge: null },
  { id: 12, name: "Globo Gigante con Peluche", slug: "globo-gigante-peluche", category: "globos", price: 95000, oldPrice: 115000, description: "Globo burbuja gigante (60cm) con peluche pequeño, chocolates y mensaje personalizado en su interior.", images: ["https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600"], featured: false, badge: "Oferta" },

  // Fresas
  { id: 13, name: "Fresas con Chocolate x12", slug: "fresas-chocolate-12", category: "fresas", price: 55000, oldPrice: null, description: "12 fresas premium bañadas en chocolate belga semiamargo, decoradas con chocolate blanco y toppings gourmet.", images: ["https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600"], featured: true, badge: "Delicioso" },
  { id: 14, name: "Torre de Fresas Gourmet", slug: "torre-fresas", category: "fresas", price: 95000, oldPrice: null, description: "Torre de 24 fresas con chocolate en presentación premium: chocolate negro, blanco y ruby. Decoradas con oro comestible.", images: ["https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600"], featured: false, badge: null },
  { id: 15, name: "Caja de Fresas y Rosas", slug: "caja-fresas-rosas", category: "fresas", price: 125000, oldPrice: null, description: "Caja elegante con fresas bañadas en chocolate y 6 rosas rojas. La combinación perfecta de dulzura y romance.", images: ["https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600"], featured: true, badge: null },

  // Peluches
  { id: 16, name: "Oso de Peluche Grande", slug: "oso-peluche-grande", category: "peluches", price: 85000, oldPrice: null, description: "Oso de peluche de 60cm ultra suave con lazo de satín. Acompañante perfecto para cualquier detalle.", images: ["https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=600"], featured: false, badge: null },
  { id: 17, name: "Combo Peluche + Rosas + Chocolates", slug: "combo-peluche-rosas", category: "peluches", price: 175000, oldPrice: 210000, description: "Oso de peluche mediano + ramo de 12 rosas + caja de chocolates artesanales. El regalo completo para sorprender.", images: ["https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=600"], featured: true, badge: "Combo" },

  // Anchetas
  { id: 18, name: "Ancheta Gourmet", slug: "ancheta-gourmet", category: "anchetas", price: 195000, oldPrice: null, description: "Canasta gourmet con vino tinto, quesos importados, jamón serrano, crackers, aceitunas, chocolates y mermelada artesanal.", images: ["https://images.unsplash.com/photo-1549465220-1a8b9238f060?w=600"], featured: true, badge: "Premium" },
  { id: 19, name: "Ancheta Cervecera", slug: "ancheta-cervecera", category: "anchetas", price: 145000, oldPrice: null, description: "Canasta con selección de cervezas artesanales, snacks gourmet, maní japonés, jerky y chips artesanales.", images: ["https://images.unsplash.com/photo-1549465220-1a8b9238f060?w=600"], featured: false, badge: null },
  { id: 20, name: "Ancheta Spa & Relax", slug: "ancheta-spa", category: "anchetas", price: 165000, oldPrice: null, description: "Kit de relajación: velas aromáticas, sales de baño, mascarilla facial, té orgánico, chocolates y pantuflas suaves.", images: ["https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600"], featured: false, badge: "Relax" },

  // Tablas
  { id: 21, name: "Tabla de Quesos y Jamones", slug: "tabla-quesos-jamones", category: "tablas", price: 110000, oldPrice: null, description: "Tabla artesanal con selección de 4 quesos, jamón serrano, prosciutto, aceitunas, frutos secos, crackers y mermelada de higo.", images: ["https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600"], featured: true, badge: null },
  { id: 22, name: "Tabla de Frutas Tropical", slug: "tabla-frutas", category: "tablas", price: 85000, oldPrice: null, description: "Tabla con mango, piña, fresas, uvas, kiwi, papaya y dip de chocolate. Presentación artística espectacular.", images: ["https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600"], featured: false, badge: null },

  // Personalizados
  { id: 23, name: "Caja Sorpresa Personalizada", slug: "caja-sorpresa", category: "personalizados", price: 135000, oldPrice: null, description: "Caja decorada a tu gusto con los productos que elijas. Tú diseñas el detalle perfecto y nosotros lo hacemos realidad.", images: ["https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600"], featured: true, badge: "Tú diseñas" },
  { id: 24, name: "Serenata + Detalle", slug: "serenata-detalle", category: "personalizados", price: 350000, oldPrice: null, description: "Serenata en vivo con músico profesional + ramo de rosas + globos personalizados. La sorpresa más épica.", images: ["https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600"], featured: false, badge: "Épico" },
];

export const TESTIMONIALS = [
  { id: 1, name: "Carolina M.", product: "Desayuno Sorpresa", rating: 5, text: "Mi mamá quedó feliz con el desayuno, todo llegó perfecto y a tiempo. ¡El mejor servicio!" },
  { id: 2, name: "Andrés R.", product: "Ramo de Rosas", rating: 5, text: "Las rosas estaban hermosas y frescas. Mi novia quedó encantada con el detalle." },
  { id: 3, name: "Valentina G.", product: "Globo Burbuja", rating: 5, text: "Increíble la personalización del globo, quedó tal cual lo pedí. Súper recomendados." },
  { id: 4, name: "Sebastián L.", product: "Ancheta Gourmet", rating: 5, text: "La calidad de los productos es excelente. El empaque hermoso y llegó en perfecto estado." },
  { id: 5, name: "María F.", product: "Fresas con Chocolate", rating: 5, text: "Las fresas estaban deliciosas y la presentación impecable. Muy profesionales." },
  { id: 6, name: "Juan Pablo T.", product: "Combo Peluche", rating: 5, text: "Compré el combo para mi hija y fue la sorpresa perfecta. Atención 10/10." },
  { id: 7, name: "Camila V.", product: "Desayuno Romántico", rating: 5, text: "Todo estuvo espectacular, desde la atención por WhatsApp hasta la entrega." },
  { id: 8, name: "Diego O.", product: "Caja Sorpresa", rating: 5, text: "Me dejaron personalizar todo a mi gusto. El resultado superó mis expectativas." },
];

export const OCCASIONS = [
  "Cumpleaños", "Aniversario", "Amor y Amistad", "Día de la Madre",
  "Baby Shower", "Graduación", "Recuperación", "Solo porque sí",
];

export const formatPrice = (price) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);

export const WHATSAPP_NUMBER = "573126634993";

export const getWhatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
