-- ============================================
-- Me Inspiras 17 — Productos Reales Catálogo 2025
-- EJECUTAR EN: Supabase Dashboard → SQL Editor
-- ============================================

-- Limpiar datos existentes
DELETE FROM products;
DELETE FROM categories;

-- ============================================
-- CATEGORÍAS REALES
-- ============================================
INSERT INTO categories (name, emoji, slug, image, sort_order, active) VALUES
('Desayunos Sorpresa',  '🍳', 'desayunos-sorpresa',  'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600', 1,  true),
('Desayunos Luxury',    '✨', 'desayunos-luxury',     'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600', 2,  true),
('Flores',              '🌸', 'flores',               'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600', 3,  true),
('Fresas y Flores',     '🍓', 'fresas-y-flores',      'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600', 4,  true),
('Anchetas',            '🎁', 'anchetas',              'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600', 5,  true),
('Frutales',            '🍉', 'frutales',              'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600', 6,  true),
('Grados',              '🎓', 'grados',                'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600', 7,  true),
('Infantil',            '🧸', 'infantil',              'https://images.unsplash.com/photo-1558171813-1fcf793a92ce?w=600', 8,  true),
('15 Años',             '👑', '15-anos',               'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600', 9,  true),
('Bebés',               '🍼', 'bebes',                 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600', 10, true),
('Luxury',              '💎', 'luxury',                'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600', 11, true),
('Combos',              '🎀', 'combos',                'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600', 12, true),
('Hombres',             '🎯', 'hombres',               'https://images.unsplash.com/photo-1574169208507-84376144848b?w=600', 13, true),
('Rosas Eternas',       '🌹', 'rosas-eternas',         'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600', 14, true);

-- ============================================
-- DESAYUNOS SORPRESA
-- ============================================
INSERT INTO products (name, slug, description, price, category_id, images, badge, featured, active) VALUES

('Desayuno Sorpresa Clásico', 'desayuno-sorpresa-clasico',
'Incluye: jugo, sándwich, dulces, fruta, maní, tarjeta personalizada, 2 globitos, globo helio, bandeja y fotos. El detalle perfecto para sorprender en cualquier momento.',
97000, (SELECT id FROM categories WHERE slug = 'desayunos-sorpresa'),
ARRAY['https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600'], 'Popular', true, true),

('Desayuno Sorpresa con Peluche', 'desayuno-sorpresa-con-peluche',
'Incluye: jugo, sándwich, fruta, maní, tarjeta, caja y peluche 20cm. Un detalle lleno de amor.',
103000, (SELECT id FROM categories WHERE slug = 'desayunos-sorpresa'),
ARRAY['https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600'], '', false, true),

('Desayuno Sorpresa Premium', 'desayuno-sorpresa-premium',
'Incluye: fruta, jugo, maní, milo, tarjeta, sándwich, globo estrella, galletas, bandeja, jamón y queso, 3 globos helio, fotos y dulces. El más completo.',
129000, (SELECT id FROM categories WHERE slug = 'desayunos-sorpresa'),
ARRAY['https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600'], 'Completo', false, true),

('Desayuno con Cervezas y Postre', 'desayuno-sorpresa-cervezas',
'Incluye: jugo, 2 cervezas, globo burbuja, postre, bandeja, sándwich, 2 globos, fotos, galletas, dulces, fruta y maní.',
149000, (SELECT id FROM categories WHERE slug = 'desayunos-sorpresa'),
ARRAY['https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600'], '', false, true),

('Desayuno con Mini Torta', 'desayuno-sorpresa-mini-torta',
'Incluye: jugo, fruta, milo, maní, mini torta personalizada, tarjeta, sándwich, globo burbuja, bandeja, brownie corazón, dulces y fotos.',
151000, (SELECT id FROM categories WHERE slug = 'desayunos-sorpresa'),
ARRAY['https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600'], 'Nuevo', false, true),

('Desayuno con Arreglo Floral', 'desayuno-sorpresa-con-flores',
'Incluye: jugo, milo, sándwich, fruta, maní, tarjeta, globo burbuja, bandeja, arreglo 6 rosas y 5 globos helio y fotos.',
167000, (SELECT id FROM categories WHERE slug = 'desayunos-sorpresa'),
ARRAY['https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600'], 'Con flores', false, true),

('Desayuno con Girasoles', 'desayuno-sorpresa-girasoles',
'Incluye: jugo, milo, sándwich, arreglo girasoles, brownie, fruta, maní, galletas, dulces, tarjeta, globo burbuja, bandeja madera, 3 globos helio y fotos.',
188000, (SELECT id FROM categories WHERE slug = 'desayunos-sorpresa'),
ARRAY['https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600'], '', false, true),

('Desayuno Deluxe con Torta', 'desayuno-sorpresa-deluxe',
'Incluye: globo burbuja, jugo, bandeja, 1 cerveza, 2 globos, mini coca, fotos, peluche, torta personalizada, sándwich, galletas, dulces, fruta y maní.',
197000, (SELECT id FROM categories WHERE slug = 'desayunos-sorpresa'),
ARRAY['https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600'], 'Deluxe', false, true);

-- ============================================
-- DESAYUNOS LUXURY
-- ============================================
INSERT INTO products (name, slug, description, price, category_id, images, badge, featured, active) VALUES

('Desayuno Luxury con Casita', 'desayuno-luxury-casita',
'Incluye: jugo, yogur, postre, casita decorada, coronita, sándwich, arreglo flores, ferrero x4, fruta, maní, tarjeta, globo coronita, casita madera, mini arco y fotos.',
198000, (SELECT id FROM categories WHERE slug = 'desayunos-luxury'),
ARRAY['https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600'], 'Luxury', true, true),

('Desayuno Luxury con 12 Rosas', 'desayuno-luxury-12-rosas',
'Incluye: té hatsu, milo, mini torta, sándwich, ferrero x3, maní, parfait, tarjeta, globo burbuja, bandeja, bouquet 12 rosas, 3 globos helio y fotos.',
208000, (SELECT id FROM categories WHERE slug = 'desayunos-luxury'),
ARRAY['https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600'], 'Luxury', false, true),

('Desayuno Luxury Premium', 'desayuno-luxury-premium',
'Incluye: jugo, milo, fruta, sándwich, ferrero x3, maní, parfait, postre, tarjeta, globo burbuja, bandeja, bouquet 12 rosas, 3 globos helio, fotos y arreglo de globos.',
247000, (SELECT id FROM categories WHERE slug = 'desayunos-luxury'),
ARRAY['https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600'], 'Top', false, true),

('Desayuno Luxury con Waffles', 'desayuno-luxury-waffles',
'Incluye: jugo, milo, waffles, sándwich, ferrero x3, maní, parfait, tarjeta, globo burbuja, bandeja, arreglo rosas, 3 globos helio y fotos.',
317000, (SELECT id FROM categories WHERE slug = 'desayunos-luxury'),
ARRAY['https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600'], 'Especial', false, true),

('Desayuno Luxury con Buchanans', 'desayuno-luxury-buchanans',
'Incluye: jugo, postre, sándwich, coronita, Buchanans 375ml, ferrero x4, fruta, maní, tarjeta, globo bigote, casita, mini arco y fotos.',
288000, (SELECT id FROM categories WHERE slug = 'desayunos-luxury'),
ARRAY['https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600'], 'Para él', false, true),

('Desayuno Luxury con Vino y 60 Rosas', 'desayuno-luxury-vino-60-rosas',
'Incluye: parfait, jugo, tarjeta, vino, globo burbuja, fruta, bandeja, sándwich, arreglo 60 rosas, ferrero x3, 6 globos helio, maní y fotos.',
361000, (SELECT id FROM categories WHERE slug = 'desayunos-luxury'),
ARRAY['https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600'], 'Exclusivo', false, true);

-- ============================================
-- FLORES
-- ============================================
INSERT INTO products (name, slug, description, price, category_id, images, badge, featured, active) VALUES

('Bouquet 15 Rosas', 'bouquet-15-rosas',
'Hermoso bouquet de 15 rosas naturales con follaje. El detalle clásico para expresar amor y admiración.',
79000, (SELECT id FROM categories WHERE slug = 'flores'),
ARRAY['https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600'], '', false, true),

('Bouquet 12 Rosas + Ferrero x8', 'bouquet-12-rosas-ferrero',
'Incluye: 12 rosas naturales, caja ferrero x8 y tarjeta personalizada. La combinación perfecta de flores y chocolate.',
123000, (SELECT id FROM categories WHERE slug = 'flores'),
ARRAY['https://images.unsplash.com/photo-1490750967868-88df5691cc54?w=600'], 'Popular', true, true),

('Bouquet 30 Rosas', 'bouquet-30-rosas',
'Impresionante bouquet de 30 rosas naturales con follaje. Para los momentos más especiales.',
129000, (SELECT id FROM categories WHERE slug = 'flores'),
ARRAY['https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600'], '', false, true),

('Combo Floral con Peluche', 'combo-floral-peluche',
'Incluye: globo burbuja, arreglo flores, peluche 20cm, dulces, tarjeta y fotos personalizadas.',
99000, (SELECT id FROM categories WHERE slug = 'flores'),
ARRAY['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600'], 'Económico', false, true),

('10 Rosas + Peluche + Ferrero', '10-rosas-peluche-ferrero',
'Incluye: 10 rosas naturales, peluche 20cm, caja ferrero y tarjeta. El regalo completo que siempre enamora.',
134000, (SELECT id FROM categories WHERE slug = 'flores'),
ARRAY['https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600'], '', false, true),

('Bouquet 50 Rosas', 'bouquet-50-rosas',
'Majestuoso bouquet de 50 rosas naturales, ideal para grandes celebraciones y ocasiones muy especiales.',
178000, (SELECT id FROM categories WHERE slug = 'flores'),
ARRAY['https://images.unsplash.com/photo-1490750967868-88df5691cc54?w=600'], 'Especial', false, true),

('Bouquet 50 Rosas + Peluche 45cm', 'bouquet-50-rosas-peluche-45',
'Incluye: bouquet 50 rosas y peluche 45cm con tarjeta personalizada. El regalo más romántico.',
267000, (SELECT id FROM categories WHERE slug = 'flores'),
ARRAY['https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600'], 'Romántico', false, true),

('Bouquet 100 Rosas', 'bouquet-100-rosas',
'El regalo más impactante: 100 rosas naturales en un bouquet espectacular. Para sorprender de verdad.',
340000, (SELECT id FROM categories WHERE slug = 'flores'),
ARRAY['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600'], 'Premium', false, true),

('Bouquet 100 Rosas + Peluche 140cm', 'bouquet-100-rosas-peluche-140',
'El regalo definitivo: 100 rosas naturales más peluche gigante de 140cm y tarjeta personalizada.',
650000, (SELECT id FROM categories WHERE slug = 'flores'),
ARRAY['https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600'], 'Exclusivo', false, true);

-- ============================================
-- FRESAS Y FLORES
-- ============================================
INSERT INTO products (name, slug, description, price, category_id, images, badge, featured, active) VALUES

('Caja 14 Fresas + Ferrero x6', 'caja-14-fresas-ferrero',
'Incluye: caja de 14 fresas con chocolate, 6 ferreros rocher, moño y tarjeta personalizada.',
98000, (SELECT id FROM categories WHERE slug = 'fresas-y-flores'),
ARRAY['https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600'], 'Popular', true, true),

('12 Rosas + 10 Fresas', '12-rosas-10-fresas',
'Incluye: 12 rosas naturales, 10 fresas con chocolate y tarjeta personalizada. El regalo que conquista.',
97000, (SELECT id FROM categories WHERE slug = 'fresas-y-flores'),
ARRAY['https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600'], '', false, true),

('10 Rosas + 7 Fresas con Chocolate', '10-rosas-7-fresas',
'Incluye: 10 rosas naturales, 7 fresas con chocolate, tarjeta y caja. La combinación más deliciosa.',
111000, (SELECT id FROM categories WHERE slug = 'fresas-y-flores'),
ARRAY['https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600'], '', false, true),

('25 Rosas + 12 Fresas', '25-rosas-12-fresas',
'Incluye: 25 rosas naturales, 2 mariposas decorativas, 12 fresas con chocolate y caja personalizada.',
167000, (SELECT id FROM categories WHERE slug = 'fresas-y-flores'),
ARRAY['https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600'], 'Especial', false, true),

('Bouquet 24 Rosas + Caja 14 Fresas', 'bouquet-24-rosas-caja-fresas',
'Incluye: bouquet 24 rosas, caja 14 fresas con chocolate y 6 ferreros rocher. El regalo perfecto.',
187000, (SELECT id FROM categories WHERE slug = 'fresas-y-flores'),
ARRAY['https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600'], 'Romántico', false, true),

('Caja Corazón + 20 Fresas + 15 Rosas', 'caja-corazon-fresas-rosas',
'Incluye: caja corazón, 15 rosas naturales, 20 fresas con chocolate, moño y tarjeta personalizada.',
147000, (SELECT id FROM categories WHERE slug = 'fresas-y-flores'),
ARRAY['https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600'], '', false, true),

('Gran Caja Corazón 50cm', 'gran-caja-corazon-50cm',
'Incluye: caja corazón 50cm, 31 fresas con chocolate, 40 rosas, 40 ferreros, moño y tarjeta. El más impactante.',
377000, (SELECT id FROM categories WHERE slug = 'fresas-y-flores'),
ARRAY['https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600'], 'Exclusivo', false, true);

-- ============================================
-- ANCHETAS
-- ============================================
INSERT INTO products (name, slug, description, price, category_id, images, badge, featured, active) VALUES

('Ancheta Sorpresa Básica', 'ancheta-sorpresa-basica',
'Incluye: globo personalizado, fotos, 2 cervezas, dulces variados, caja decorada y tarjeta. El detalle perfecto.',
78000, (SELECT id FROM categories WHERE slug = 'anchetas'),
ARRAY['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600'], 'Económica', false, true),

('Ancheta con Mini Arco', 'ancheta-con-mini-arco',
'Incluye: mini arco de globos, 3 cervezas, tarjeta, dulces variados, caja decorada y fotos personalizadas.',
110000, (SELECT id FROM categories WHERE slug = 'anchetas'),
ARRAY['https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600'], '', false, true),

('Ancheta Balde Premium', 'ancheta-balde-premium',
'Incluye: balde decorado, maní, globo burbuja, 2 globos helio, peluche 20cm, cerveza coronita y dulces variados.',
127000, (SELECT id FROM categories WHERE slug = 'anchetas'),
ARRAY['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600'], 'Popular', true, true),

('Ancheta con Vino y Rosas', 'ancheta-con-vino-rosas',
'Incluye: vino, ferrero x8, portaretrato, caja galletas, maní, globo burbuja, 3 globos helio, peluche 20cm y 10 rosas.',
187000, (SELECT id FROM categories WHERE slug = 'anchetas'),
ARRAY['https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600'], 'Con vino', false, true),

('Ancheta Gran con Peluche 40cm', 'ancheta-gran-peluche-40',
'Incluye: bouquet 24 rosas, peluche 40cm, ferrero x8, globo burbuja, 1 Baileys 375ml y guacal de pino decorado.',
265000, (SELECT id FROM categories WHERE slug = 'anchetas'),
ARRAY['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600'], 'Premium', false, true);

-- ============================================
-- FRUTALES
-- ============================================
INSERT INTO products (name, slug, description, price, category_id, images, badge, featured, active) VALUES

('Arreglo Frutal Clásico', 'arreglo-frutal-clasico',
'Arreglo frutal con frutas frescas de temporada, presentación elegante y tarjeta personalizada.',
97000, (SELECT id FROM categories WHERE slug = 'frutales'),
ARRAY['https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600'], '', false, true),

('Ancheta Frutas con Rosas', 'ancheta-frutas-con-rosas',
'Incluye: 5 frutas surtidas, 6 rosas con follaje, caja, globo, postre y tarjeta personalizada.',
112000, (SELECT id FROM categories WHERE slug = 'frutales'),
ARRAY['https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600'], 'Popular', true, true),

('Caja Hexagonal Frutal', 'caja-hexagonal-frutal',
'Incluye: caja hexagonal decorada, mini arco de globos, globo estrella, fruta surtida y tarjeta.',
132000, (SELECT id FROM categories WHERE slug = 'frutales'),
ARRAY['https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600'], '', false, true),

('Arreglo Frutal Premium', 'arreglo-frutal-premium',
'Incluye: arreglo rosas, globo, frutas variadas, bandeja decorada y tarjeta personalizada.',
169000, (SELECT id FROM categories WHERE slug = 'frutales'),
ARRAY['https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600'], '', false, true),

('Arreglo Frutal con Vino', 'arreglo-frutal-con-vino',
'Incluye: arreglo 40 rosas, 5 girasoles, follaje, frutas variadas, canasto y vino 375ml.',
232000, (SELECT id FROM categories WHERE slug = 'frutales'),
ARRAY['https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600'], 'Exclusivo', false, true);

-- ============================================
-- GRADOS
-- ============================================
INSERT INTO products (name, slug, description, price, category_id, images, badge, featured, active) VALUES

('Combo Grado Básico', 'combo-grado-basico',
'Incluye: globo personalizado de grado, peluche 20cm, 2 dulces y caja personalizada. ¡Felicitaciones!',
89000, (SELECT id FROM categories WHERE slug = 'grados'),
ARRAY['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600'], '', false, true),

('Bouquet Grado con Ferrero', 'bouquet-grado-ferrero',
'Incluye: bouquet 6 rosas, 6 ferreros rocher, tarjeta y peluche 20cm. El regalo perfecto para el graduado.',
103000, (SELECT id FROM categories WHERE slug = 'grados'),
ARRAY['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600'], 'Popular', true, true),

('Combo Grado con 24 Rosas', 'combo-grado-24-rosas',
'Incluye: arreglo 24 rosas con follaje, globo personalizado, ferrero x4, caja pino y tarjeta.',
139000, (SELECT id FROM categories WHERE slug = 'grados'),
ARRAY['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600'], '', false, true),

('Combo Grado con Champaña', 'combo-grado-champana',
'Incluye: ferrero x8, champaña, caja negra, peluche graduado 20cm, 5 rosas y globo personalizado.',
149000, (SELECT id FROM categories WHERE slug = 'grados'),
ARRAY['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600'], 'Con champaña', false, true),

('Combo Grado Premium 15 Rosas', 'combo-grado-premium-rosas',
'Incluye: 15 rosas naturales, 10 claveles, peluche graduado 20cm y tarjeta. Celebra este gran logro.',
198000, (SELECT id FROM categories WHERE slug = 'grados'),
ARRAY['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600'], 'Premium', false, true),

('Combo Grado 50 Rosas', 'combo-grado-50-rosas',
'Incluye: peluche 50cm, ramo 50 rosas naturales, globo burbuja y tarjeta. El regalo más especial para un graduado.',
253000, (SELECT id FROM categories WHERE slug = 'grados'),
ARRAY['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600'], 'Especial', false, true);

-- ============================================
-- INFANTIL
-- ============================================
INSERT INTO products (name, slug, description, price, category_id, images, badge, featured, active) VALUES

('Sorpresa Infantil con Peluche', 'sorpresa-infantil-peluche',
'Incluye: peluche 20cm, globo personalizado, 2 chocolates, caja decorada y tarjeta. Para los más pequeños.',
86000, (SELECT id FROM categories WHERE slug = 'infantil'),
ARRAY['https://images.unsplash.com/photo-1558171813-1fcf793a92ce?w=600'], '', false, true),

('Desayuno Infantil Temático', 'desayuno-infantil-tematico',
'Incluye: jugo, yogurt, cereal, sándwich, fruta, dulces, número, globo burbuja, tarjeta, peluche y decoración temática.',
125000, (SELECT id FROM categories WHERE slug = 'infantil'),
ARRAY['https://images.unsplash.com/photo-1558171813-1fcf793a92ce?w=600'], 'Temático', false, true),

('Sorpresa Infantil con Girasoles', 'sorpresa-infantil-girasoles',
'Incluye: peluche 20cm, dulces, tarjeta, fotos, 2 globos helio, arreglo girasoles, globo burbuja, moños y bandeja.',
217000, (SELECT id FROM categories WHERE slug = 'infantil'),
ARRAY['https://images.unsplash.com/photo-1558171813-1fcf793a92ce?w=600'], 'Especial', false, true),

('Sorpresa Infantil Premium', 'sorpresa-infantil-premium',
'Incluye: peluche 45cm, globo burbuja, 7 globos helio, frutas, dulces, decoración temática, tarjeta, bandeja y arreglo flores.',
298000, (SELECT id FROM categories WHERE slug = 'infantil'),
ARRAY['https://images.unsplash.com/photo-1558171813-1fcf793a92ce?w=600'], 'Premium', false, true);

-- ============================================
-- 15 AÑOS
-- ============================================
INSERT INTO products (name, slug, description, price, category_id, images, badge, featured, active) VALUES

('Desayuno 15 Años', 'desayuno-15-anos',
'Incluye: jugo, milo, brownie, sándwich, fruta, maní, galletas, dulces, tarjeta, fotos, arreglo flores, número 15, globo burbuja y 3 globos helio.',
198900, (SELECT id FROM categories WHERE slug = '15-anos'),
ARRAY['https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600'], '', false, true),

('Combo 15 Años con Peluche 50cm', 'combo-15-anos-peluche-50',
'Incluye: tarjeta, fotos, caja decorada, ferrero corazón, peluche 50cm y globos. Para ese día tan especial.',
238900, (SELECT id FROM categories WHERE slug = '15-anos'),
ARRAY['https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600'], 'Popular', true, true),

('Combo 15 Años con Ferrero x12', 'combo-15-anos-ferrero-12',
'Incluye: peluche 35cm, bouquet 10 rosas, nutella 140gr, ferrero x12, chocolates, 4 globos helio y globo burbuja.',
274000, (SELECT id FROM categories WHERE slug = '15-anos'),
ARRAY['https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600'], '', false, true),

('Combo 15 Años con Baileys', 'combo-15-anos-baileys',
'Incluye: bandeja, 4 globos helio, peluche 38cm, Baileys 375ml, caja 6 fresas, portaretrato y globo burbuja.',
247000, (SELECT id FROM categories WHERE slug = '15-anos'),
ARRAY['https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600'], 'Especial', false, true),

('Combo 15 Años Luxury', 'combo-15-anos-luxury',
'El paquete más completo y exclusivo para celebrar los 15 años. Incluye decoración premium, flores, peluche, dulces y más.',
637000, (SELECT id FROM categories WHERE slug = '15-anos'),
ARRAY['https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600'], 'Luxury', false, true);

-- ============================================
-- BEBÉS
-- ============================================
INSERT INTO products (name, slug, description, price, category_id, images, badge, featured, active) VALUES

('Combo Bebé con Flores', 'combo-bebe-flores',
'Incluye: peluche 35cm, fruta, tarjeta, fotos, arreglo flores, moños y caja decorada. ¡Bienvenido al mundo!',
155000, (SELECT id FROM categories WHERE slug = 'bebes'),
ARRAY['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600'], '', false, true),

('Combo Bebé con 18 Rosas', 'combo-bebe-18-rosas',
'Incluye: peluche 20cm, globo burbuja, caja, 18-20 rosas y 3 ferreros rocher. Para recibir al nuevo integrante.',
157000, (SELECT id FROM categories WHERE slug = 'bebes'),
ARRAY['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600'], 'Popular', true, true),

('Combo Bebé con Ferrero x8', 'combo-bebe-ferrero-8',
'Incluye: peluche 30cm, ferrero x8, tarjeta, fotos, arreglo rosas, globos, moños y caja decorada.',
191000, (SELECT id FROM categories WHERE slug = 'bebes'),
ARRAY['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600'], '', false, true),

('Combo Bebé con 10 Fresas', 'combo-bebe-10-fresas',
'Incluye: peluche 40cm, 10 fresas con chocolate, tarjeta, 2 globos helio, globo burbuja, moños, canasto y arreglo flores.',
218000, (SELECT id FROM categories WHERE slug = 'bebes'),
ARRAY['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600'], 'Especial', false, true),

('Combo Bebé con 50 Rosas', 'combo-bebe-50-rosas',
'Incluye: 3 globos helio, peluche 35cm, arreglo 50 rosas y caja decorada. El regalo más especial para el nuevo integrante.',
265000, (SELECT id FROM categories WHERE slug = 'bebes'),
ARRAY['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600'], 'Premium', false, true);

-- ============================================
-- LUXURY
-- ============================================
INSERT INTO products (name, slug, description, price, category_id, images, badge, featured, active) VALUES

('Ramo 10 Tulipanes', 'ramo-10-tulipanes',
'Elegante ramo de 10 tulipanes frescos con follaje y presentación de lujo. Para los momentos más sofisticados.',
170000, (SELECT id FROM categories WHERE slug = 'luxury'),
ARRAY['https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600'], '', false, true),

('Orquídea con Fresas', 'orquidea-con-fresas',
'Incluye: orquídea natural en matera, caja 14 fresas con chocolate y tarjeta. Elegancia y dulzura en un solo regalo.',
197000, (SELECT id FROM categories WHERE slug = 'luxury'),
ARRAY['https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600'], 'Exclusivo', false, true),

('Oso de 500 Rosas', 'oso-500-rosas',
'Impresionante oso elaborado artesanalmente con 500 rosas naturales. El regalo más impactante y único.',
267000, (SELECT id FROM categories WHERE slug = 'luxury'),
ARRAY['https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600'], 'Único', true, true),

('Cúpula Rosa Preservada', 'cupula-rosa-preservada',
'Incluye: caja con fotos personalizadas, rosa preservada en cúpula de cristal, ferrero x3 y tarjeta. Eterno como tu amor.',
238000, (SELECT id FROM categories WHERE slug = 'luxury'),
ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600'], 'Eterno', false, true),

('Bouquet 100 Rosas + Corona', 'bouquet-100-rosas-corona',
'Incluye: bouquet 100 rosas naturales, cinta personalizada y corona decorativa. Un regalo espectacular.',
400000, (SELECT id FROM categories WHERE slug = 'luxury'),
ARRAY['https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600'], 'Luxury', false, true),

('Peluche 120cm + 100 Rosas', 'peluche-120cm-100-rosas',
'Incluye: peluche gigante 120cm, bouquet 100 rosas naturales, corona y tarjeta personalizada. Un regalo que no olvidarán.',
640000, (SELECT id FROM categories WHERE slug = 'luxury'),
ARRAY['https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600'], 'Premium', false, true),

('Peluche 1.50m + 100 Rosas', 'peluche-150m-100-rosas',
'El regalo más espectacular: peluche gigante de 1.50m, bouquet 100 rosas, corona en murano y tarjeta. Para sorprender.',
730000, (SELECT id FROM categories WHERE slug = 'luxury'),
ARRAY['https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600'], 'Top Luxury', false, true);

-- ============================================
-- COMBOS (Los más vendidos)
-- ============================================
INSERT INTO products (name, slug, description, price, category_id, images, badge, featured, active) VALUES

('Combo 20 Rosas + Ferrero + Peluche', 'combo-20-rosas-ferrero-peluche',
'Incluye: bouquet 20 rosas naturales, follaje, ferrero x8, peluche 20cm y tarjeta. El combo más vendido.',
147000, (SELECT id FROM categories WHERE slug = 'combos'),
ARRAY['https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600'], 'Más vendido', true, true),

('Combo con Torta y Peluche', 'combo-torta-peluche',
'Incluye: peluche 20cm, globo personalizado, 4 globos helio, bandeja, torta, sándwich, galletas y dulces.',
149000, (SELECT id FROM categories WHERE slug = 'combos'),
ARRAY['https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600'], '', false, true),

('Combo 6 Girasoles + Peluche 40cm', 'combo-6-girasoles-peluche-40',
'Incluye: bouquet 6 girasoles frescos, ferrero x8 y peluche 40cm. Un regalo que alegra el día.',
182000, (SELECT id FROM categories WHERE slug = 'combos'),
ARRAY['https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600'], 'Popular', false, true),

('Combo 20 Rosas + Ferrero Corazón', 'combo-20-rosas-ferrero-corazon',
'Incluye: globo personalizado, arreglo 20 rosas, ferrero corazón, caja, chocolatina y peluche 20cm.',
187000, (SELECT id FROM categories WHERE slug = 'combos'),
ARRAY['https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600'], '', false, true),

('Combo 20 Rosas + Peluche 40cm', 'combo-20-rosas-peluche-40',
'Incluye: 2 globos helio, globo burbuja, fotos, arreglo 20 rosas, 3 ferreros y peluche 40cm.',
212000, (SELECT id FROM categories WHERE slug = 'combos'),
ARRAY['https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600'], '', false, true),

('Combo 30 Rosas + Ferrero x12', 'combo-30-rosas-ferrero-12',
'Incluye: 2 globos helio, tarjeta, bouquet 30 rosas naturales, ferrero x12 y peluche 40cm.',
257000, (SELECT id FROM categories WHERE slug = 'combos'),
ARRAY['https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600'], 'Especial', false, true);

-- ============================================
-- HOMBRES
-- ============================================
INSERT INTO products (name, slug, description, price, category_id, images, badge, featured, active) VALUES

('Ancheta Hombre con Cervezas', 'ancheta-hombre-cervezas',
'Incluye: 2 cervezas coronitas, té hatsu, fresas con dulces chokis y tarjeta. El regalo perfecto para él.',
109000, (SELECT id FROM categories WHERE slug = 'hombres'),
ARRAY['https://images.unsplash.com/photo-1574169208507-84376144848b?w=600'], 'Popular', true, true),

('Ancheta Hombre con Pringles', 'ancheta-hombre-pringles',
'Incluye: globo burbuja, 3 coronitas, papas pringles, maní, galletas, Milky Way y caja. ¡Todo lo que él quiere!',
127000, (SELECT id FROM categories WHERE slug = 'hombres'),
ARRAY['https://images.unsplash.com/photo-1574169208507-84376144848b?w=600'], '', false, true),

('Ancheta Hombre Balde', 'ancheta-hombre-balde',
'Incluye: balde decorado, globo burbuja, 3 coronitas, 2 globos helio, ferrero x3 y M&M chocolate.',
132000, (SELECT id FROM categories WHERE slug = 'hombres'),
ARRAY['https://images.unsplash.com/photo-1574169208507-84376144848b?w=600'], '', false, true),

('Caja Madera con Copas', 'caja-madera-copas',
'Incluye: caja de madera elegante, ferrero x8, chocolates surtidos y 2 copas. El regalo más elegante para él.',
135000, (SELECT id FROM categories WHERE slug = 'hombres'),
ARRAY['https://images.unsplash.com/photo-1574169208507-84376144848b?w=600'], 'Elegante', false, true),

('Ancheta Hombre con Ferrero x8', 'ancheta-hombre-ferrero-8',
'Incluye: globo burbuja, 2 números decorativos, bandeja, ferrero x8, chocolates variados, papas pringles y gomas.',
165000, (SELECT id FROM categories WHERE slug = 'hombres'),
ARRAY['https://images.unsplash.com/photo-1574169208507-84376144848b?w=600'], '', false, true),

('Ancheta Hombre con Buchanans', 'ancheta-hombre-buchanans',
'Incluye: dulces variados, 2 coronitas lata, caja negra y Buchanans 375ml. Para los que saben disfrutar.',
267000, (SELECT id FROM categories WHERE slug = 'hombres'),
ARRAY['https://images.unsplash.com/photo-1574169208507-84376144848b?w=600'], 'Premium', false, true),

('Desayuno Especial para Hombre', 'desayuno-para-hombre',
'Incluye: jugo, parfait, waffles, M&M maní, tabla de quesos, ferrero x4, té hatsu, tarjeta, globo bigote, casita, mini arco, fotos y 3 globos helio.',
239000, (SELECT id FROM categories WHERE slug = 'hombres'),
ARRAY['https://images.unsplash.com/photo-1574169208507-84376144848b?w=600'], 'Para él', false, true);

-- ============================================
-- ROSAS ETERNAS
-- ============================================
INSERT INTO products (name, slug, description, price, category_id, images, badge, featured, active) VALUES

('6 Rosas Eternas', '6-rosas-eternas',
'Incluye: 6 rosas eternas preservadas, tarjeta y mariposa decorativa. Las rosas que nunca se marchitan.',
57000, (SELECT id FROM categories WHERE slug = 'rosas-eternas'),
ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600'], 'Eternas', false, true),

('20 Rosas Eternas', '20-rosas-eternas',
'Incluye: 20 rosas eternas preservadas con envoltura y tarjeta personalizada. Un regalo que dura para siempre.',
120000, (SELECT id FROM categories WHERE slug = 'rosas-eternas'),
ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600'], '', false, true),

('Peluche + 12 Rosas Eternas', 'peluche-12-rosas-eternas',
'Incluye: peluche 20cm, 12 rosas eternas preservadas y tarjeta. Un regalo lleno de amor que dura para siempre.',
125000, (SELECT id FROM categories WHERE slug = 'rosas-eternas'),
ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600'], 'Popular', true, true),

('Bouquet 20 Rosas Eternas + Ferrero x10', 'bouquet-20-rosas-eternas-ferrero',
'Incluye: bouquet 20 rosas eternas preservadas, 10 ferreros rocher y mariposa decorativa.',
143000, (SELECT id FROM categories WHERE slug = 'rosas-eternas'),
ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600'], '', false, true),

('30 Rosas Eternas con Corona', '30-rosas-eternas-corona',
'Incluye: bouquet 30 rosas eternas con recortes temáticos, corona decorativa y tarjeta.',
170000, (SELECT id FROM categories WHERE slug = 'rosas-eternas'),
ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600'], 'Especial', false, true),

('Peluche 40cm + 15 Rosas Eternas', 'peluche-40-15-rosas-eternas',
'Incluye: peluche 40cm, 15 rosas eternas preservadas, caja y tarjeta personalizada.',
197000, (SELECT id FROM categories WHERE slug = 'rosas-eternas'),
ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600'], '', false, true),

('Bouquet 40 Rosas Eternas', 'bouquet-40-rosas-eternas',
'Incluye: bouquet 40 rosas eternas preservadas, corona, envoltura y tarjeta. El regalo más duradero.',
222000, (SELECT id FROM categories WHERE slug = 'rosas-eternas'),
ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600'], 'Premium', false, true);
