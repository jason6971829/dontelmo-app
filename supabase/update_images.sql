-- ============================================
-- Me Inspiras 17 — Actualizar imágenes reales del catálogo
-- EJECUTAR EN: Supabase Dashboard → SQL Editor
-- ============================================

-- DESAYUNOS SORPRESA
UPDATE products SET images = ARRAY['/catalog-images/page_031.jpg'] WHERE slug = 'desayuno-sorpresa-clasico';
UPDATE products SET images = ARRAY['/catalog-images/page_032.jpg'] WHERE slug = 'desayuno-sorpresa-con-peluche';
UPDATE products SET images = ARRAY['/catalog-images/page_033.jpg'] WHERE slug = 'desayuno-sorpresa-premium';
UPDATE products SET images = ARRAY['/catalog-images/page_034.jpg'] WHERE slug = 'desayuno-sorpresa-cervezas';
UPDATE products SET images = ARRAY['/catalog-images/page_035.jpg'] WHERE slug = 'desayuno-sorpresa-mini-torta';
UPDATE products SET images = ARRAY['/catalog-images/page_036.jpg'] WHERE slug = 'desayuno-sorpresa-con-flores';
UPDATE products SET images = ARRAY['/catalog-images/page_037.jpg'] WHERE slug = 'desayuno-sorpresa-girasoles';
UPDATE products SET images = ARRAY['/catalog-images/page_038.jpg'] WHERE slug = 'desayuno-sorpresa-deluxe';

-- DESAYUNOS LUXURY
UPDATE products SET images = ARRAY['/catalog-images/page_041.jpg'] WHERE slug = 'desayuno-luxury-casita';
UPDATE products SET images = ARRAY['/catalog-images/page_042.jpg'] WHERE slug = 'desayuno-luxury-12-rosas';
UPDATE products SET images = ARRAY['/catalog-images/page_043.jpg'] WHERE slug = 'desayuno-luxury-premium';
UPDATE products SET images = ARRAY['/catalog-images/page_044.jpg'] WHERE slug = 'desayuno-luxury-waffles';
UPDATE products SET images = ARRAY['/catalog-images/page_046.jpg'] WHERE slug = 'desayuno-luxury-buchanans';
UPDATE products SET images = ARRAY['/catalog-images/page_049.jpg'] WHERE slug = 'desayuno-luxury-vino-60-rosas';

-- FLORES
UPDATE products SET images = ARRAY['/catalog-images/page_011.jpg'] WHERE slug = 'bouquet-12-rosas-ferrero';
UPDATE products SET images = ARRAY['/catalog-images/page_014.jpg'] WHERE slug = 'bouquet-15-rosas';
UPDATE products SET images = ARRAY['/catalog-images/page_014.jpg'] WHERE slug = 'bouquet-30-rosas';
UPDATE products SET images = ARRAY['/catalog-images/page_012.jpg'] WHERE slug = 'combo-floral-peluche';
UPDATE products SET images = ARRAY['/catalog-images/page_015.jpg'] WHERE slug = '10-rosas-peluche-ferrero';
UPDATE products SET images = ARRAY['/catalog-images/page_016.jpg'] WHERE slug = 'bouquet-50-rosas';
UPDATE products SET images = ARRAY['/catalog-images/page_019.jpg'] WHERE slug = 'bouquet-50-rosas-peluche-45';
UPDATE products SET images = ARRAY['/catalog-images/page_018.jpg'] WHERE slug = 'bouquet-100-rosas';
UPDATE products SET images = ARRAY['/catalog-images/page_019.jpg'] WHERE slug = 'bouquet-100-rosas-peluche-140';

-- FRESAS Y FLORES
UPDATE products SET images = ARRAY['/catalog-images/page_021.jpg'] WHERE slug = 'caja-14-fresas-ferrero';
UPDATE products SET images = ARRAY['/catalog-images/page_023.jpg'] WHERE slug = '12-rosas-10-fresas';
UPDATE products SET images = ARRAY['/catalog-images/page_022.jpg'] WHERE slug = '10-rosas-7-fresas';
UPDATE products SET images = ARRAY['/catalog-images/page_025.jpg'] WHERE slug = '25-rosas-12-fresas';
UPDATE products SET images = ARRAY['/catalog-images/page_024.jpg'] WHERE slug = 'bouquet-24-rosas-caja-fresas';
UPDATE products SET images = ARRAY['/catalog-images/page_026.jpg'] WHERE slug = 'caja-corazon-fresas-rosas';
UPDATE products SET images = ARRAY['/catalog-images/page_029.jpg'] WHERE slug = 'gran-caja-corazon-50cm';

-- ANCHETAS
UPDATE products SET images = ARRAY['/catalog-images/page_051.jpg'] WHERE slug = 'ancheta-sorpresa-basica';
UPDATE products SET images = ARRAY['/catalog-images/page_052.jpg'] WHERE slug = 'ancheta-con-mini-arco';
UPDATE products SET images = ARRAY['/catalog-images/page_053.jpg'] WHERE slug = 'ancheta-balde-premium';
UPDATE products SET images = ARRAY['/catalog-images/page_056.jpg'] WHERE slug = 'ancheta-con-vino-rosas';
UPDATE products SET images = ARRAY['/catalog-images/page_058.jpg'] WHERE slug = 'ancheta-gran-peluche-40';

-- FRUTALES
UPDATE products SET images = ARRAY['/catalog-images/page_069.jpg'] WHERE slug = 'arreglo-frutal-clasico';
UPDATE products SET images = ARRAY['/catalog-images/page_070.jpg'] WHERE slug = 'ancheta-frutas-con-rosas';
UPDATE products SET images = ARRAY['/catalog-images/page_071.jpg'] WHERE slug = 'caja-hexagonal-frutal';
UPDATE products SET images = ARRAY['/catalog-images/page_072.jpg'] WHERE slug = 'arreglo-frutal-premium';
UPDATE products SET images = ARRAY['/catalog-images/page_076.jpg'] WHERE slug = 'arreglo-frutal-con-vino';

-- GRADOS
UPDATE products SET images = ARRAY['/catalog-images/page_079.jpg'] WHERE slug = 'combo-grado-basico';
UPDATE products SET images = ARRAY['/catalog-images/page_080.jpg'] WHERE slug = 'bouquet-grado-ferrero';
UPDATE products SET images = ARRAY['/catalog-images/page_081.jpg'] WHERE slug = 'combo-grado-24-rosas';
UPDATE products SET images = ARRAY['/catalog-images/page_083.jpg'] WHERE slug = 'combo-grado-champana';
UPDATE products SET images = ARRAY['/catalog-images/page_085.jpg'] WHERE slug = 'combo-grado-premium-rosas';
UPDATE products SET images = ARRAY['/catalog-images/page_086.jpg'] WHERE slug = 'combo-grado-50-rosas';

-- INFANTIL
UPDATE products SET images = ARRAY['/catalog-images/page_090.jpg'] WHERE slug = 'sorpresa-infantil-peluche';
UPDATE products SET images = ARRAY['/catalog-images/page_092.jpg'] WHERE slug = 'desayuno-infantil-tematico';
UPDATE products SET images = ARRAY['/catalog-images/page_095.jpg'] WHERE slug = 'sorpresa-infantil-girasoles';
UPDATE products SET images = ARRAY['/catalog-images/page_099.jpg'] WHERE slug = 'sorpresa-infantil-premium';

-- 15 AÑOS
UPDATE products SET images = ARRAY['/catalog-images/page_101.jpg'] WHERE slug = 'desayuno-15-anos';
UPDATE products SET images = ARRAY['/catalog-images/page_102.jpg'] WHERE slug = 'combo-15-anos-peluche-50';
UPDATE products SET images = ARRAY['/catalog-images/page_103.jpg'] WHERE slug = 'combo-15-anos-ferrero-12';
UPDATE products SET images = ARRAY['/catalog-images/page_106.jpg'] WHERE slug = 'combo-15-anos-baileys';
UPDATE products SET images = ARRAY['/catalog-images/page_108.jpg'] WHERE slug = 'combo-15-anos-luxury';

-- BEBÉS
UPDATE products SET images = ARRAY['/catalog-images/page_110.jpg'] WHERE slug = 'combo-bebe-flores';
UPDATE products SET images = ARRAY['/catalog-images/page_111.jpg'] WHERE slug = 'combo-bebe-18-rosas';
UPDATE products SET images = ARRAY['/catalog-images/page_113.jpg'] WHERE slug = 'combo-bebe-ferrero-8';
UPDATE products SET images = ARRAY['/catalog-images/page_114.jpg'] WHERE slug = 'combo-bebe-10-fresas';
UPDATE products SET images = ARRAY['/catalog-images/page_117.jpg'] WHERE slug = 'combo-bebe-50-rosas';

-- LUXURY
UPDATE products SET images = ARRAY['/catalog-images/page_120.jpg'] WHERE slug = 'ramo-10-tulipanes';
UPDATE products SET images = ARRAY['/catalog-images/page_121.jpg'] WHERE slug = 'orquidea-con-fresas';
UPDATE products SET images = ARRAY['/catalog-images/page_122.jpg'] WHERE slug = 'oso-500-rosas';
UPDATE products SET images = ARRAY['/catalog-images/page_123.jpg'] WHERE slug = 'cupula-rosa-preservada';
UPDATE products SET images = ARRAY['/catalog-images/page_125.jpg'] WHERE slug = 'bouquet-100-rosas-corona';
UPDATE products SET images = ARRAY['/catalog-images/page_126.jpg'] WHERE slug = 'peluche-120cm-100-rosas';
UPDATE products SET images = ARRAY['/catalog-images/page_128.jpg'] WHERE slug = 'peluche-150m-100-rosas';

-- COMBOS
UPDATE products SET images = ARRAY['/catalog-images/page_130.jpg'] WHERE slug = 'combo-20-rosas-ferrero-peluche';
UPDATE products SET images = ARRAY['/catalog-images/page_131.jpg'] WHERE slug = 'combo-torta-peluche';
UPDATE products SET images = ARRAY['/catalog-images/page_132.jpg'] WHERE slug = 'combo-6-girasoles-peluche-40';
UPDATE products SET images = ARRAY['/catalog-images/page_133.jpg'] WHERE slug = 'combo-20-rosas-ferrero-corazon';
UPDATE products SET images = ARRAY['/catalog-images/page_134.jpg'] WHERE slug = 'combo-20-rosas-peluche-40';
UPDATE products SET images = ARRAY['/catalog-images/page_137.jpg'] WHERE slug = 'combo-30-rosas-ferrero-12';

-- HOMBRES
UPDATE products SET images = ARRAY['/catalog-images/page_140.jpg'] WHERE slug = 'ancheta-hombre-cervezas';
UPDATE products SET images = ARRAY['/catalog-images/page_141.jpg'] WHERE slug = 'ancheta-hombre-pringles';
UPDATE products SET images = ARRAY['/catalog-images/page_142.jpg'] WHERE slug = 'ancheta-hombre-balde';
UPDATE products SET images = ARRAY['/catalog-images/page_147.jpg'] WHERE slug = 'caja-madera-copas';
UPDATE products SET images = ARRAY['/catalog-images/page_143.jpg'] WHERE slug = 'ancheta-hombre-ferrero-8';
UPDATE products SET images = ARRAY['/catalog-images/page_144.jpg'] WHERE slug = 'ancheta-hombre-buchanans';
UPDATE products SET images = ARRAY['/catalog-images/page_148.jpg'] WHERE slug = 'desayuno-para-hombre';

-- ROSAS ETERNAS
UPDATE products SET images = ARRAY['/catalog-images/page_151.jpg'] WHERE slug = '6-rosas-eternas';
UPDATE products SET images = ARRAY['/catalog-images/page_157.jpg'] WHERE slug = '20-rosas-eternas';
UPDATE products SET images = ARRAY['/catalog-images/page_152.jpg'] WHERE slug = 'peluche-12-rosas-eternas';
UPDATE products SET images = ARRAY['/catalog-images/page_153.jpg'] WHERE slug = 'bouquet-20-rosas-eternas-ferrero';
UPDATE products SET images = ARRAY['/catalog-images/page_158.jpg'] WHERE slug = '30-rosas-eternas-corona';
UPDATE products SET images = ARRAY['/catalog-images/page_154.jpg'] WHERE slug = 'peluche-40-15-rosas-eternas';
UPDATE products SET images = ARRAY['/catalog-images/page_159.jpg'] WHERE slug = 'bouquet-40-rosas-eternas';
