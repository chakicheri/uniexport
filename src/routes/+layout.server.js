import { supabase } from '$lib/supabase.js';

export async function load() {
  const { data: rows, error } = await supabase
    .from('products')
    .select('*')
    .order('sort', { ascending: true });

  if (error) console.error('Supabase fetch error:', error);

  // Reshape flat DB rows into the nested object structure the UI expects
  const products = (rows || []).map(row => ({
    id: row.id,
    category: row.category,
    spec: row.spec,
    hsCode: row.hs_code,
    img: row.image_url, 
    name: { en: row.name_en, fr: row.name_fr, ar: row.name_ar },
    desc: { en: row.desc_en, fr: row.desc_fr, ar: row.desc_ar },
    details: row.details_en ? { en: row.details_en, fr: row.details_fr, ar: row.details_ar } : undefined,
    availability: row.availability_en ? { en: row.availability_en, fr: row.availability_fr, ar: row.availability_ar } : undefined,
    season: row.season_en ? { en: row.season_en, fr: row.season_fr, ar: row.season_ar } : undefined,
    origin: row.origin_en ? { en: row.origin_en, fr: row.origin_fr, ar: row.origin_ar } : undefined,
    packaging: row.packaging_en ? { en: row.packaging_en, fr: row.packaging_fr, ar: row.packaging_ar } : undefined,
    shelfLife: row.shelf_life_en ? { en: row.shelf_life_en, fr: row.shelf_life_fr, ar: row.shelf_life_ar } : undefined
  }));

  return { products };
}