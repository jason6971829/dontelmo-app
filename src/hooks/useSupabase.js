import { useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import {
  PRODUCTS as STATIC_PRODUCTS,
  CATEGORIES as STATIC_CATEGORIES,
  TESTIMONIALS as STATIC_TESTIMONIALS,
  WHATSAPP_NUMBER as STATIC_WHATSAPP,
} from "../data/products";

// ─── Products ────────────────────────────────────────────────────────────────

export function useProducts(categorySlug = null) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    if (!isSupabaseConfigured) {
      let data = STATIC_PRODUCTS.filter((p) => p.active !== false);
      if (categorySlug) data = data.filter((p) => p.category === categorySlug);
      setProducts(data);
      setLoading(false);
      return;
    }
    let query = supabase.from("products").select("*, categories(name, emoji, slug)").eq("active", true).order("created_at", { ascending: false });
    if (categorySlug) {
      query = query.eq("categories.slug", categorySlug);
    }
    const { data, error } = await query;
    console.log("Supabase products response:", { data, error });
    if (error) {
      console.error("Error fetching products:", error);
      setProducts(STATIC_PRODUCTS);
    } else {
      // Normalize to match static data shape
      setProducts(
        (data || []).map((p) => ({
          ...p,
          category: p.categories?.slug || p.category_id,
          images: p.images || [],
        }))
      );
    }
    setLoading(false);
  }, [categorySlug]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  return { products, loading, refetch: fetchProducts };
}

export function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      if (!isSupabaseConfigured) {
        setProduct(STATIC_PRODUCTS.find((p) => p.slug === slug) || null);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name, emoji, slug)")
        .eq("slug", slug)
        .single();
      if (error) {
        setProduct(STATIC_PRODUCTS.find((p) => p.slug === slug) || null);
      } else {
        setProduct({ ...data, category: data.categories?.slug || data.category_id, images: data.images || [] });
      }
      setLoading(false);
    }
    fetch();
  }, [slug]);

  return { product, loading };
}

// ─── Categories ──────────────────────────────────────────────────────────────

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    if (!isSupabaseConfigured) {
      setCategories(STATIC_CATEGORIES);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase.from("categories").select("*").eq("active", true).order("sort_order");
    if (error) {
      setCategories(STATIC_CATEGORIES);
    } else {
      setCategories(
        (data || []).map((c) => ({ ...c, id: c.slug || c.id }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  return { categories, loading, refetch: fetchCategories };
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    if (!isSupabaseConfigured) { setLoading(false); return; }
    setLoading(true);
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (!error) setOrders(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  return { orders, loading, refetch: fetchOrders };
}

export async function createOrder(orderData) {
  if (!isSupabaseConfigured) return { data: null, error: "Supabase not configured" };
  return await supabase.from("orders").insert(orderData).select().single();
}

export async function updateOrderStatus(id, status) {
  if (!isSupabaseConfigured) return { error: "Supabase not configured" };
  return await supabase.from("orders").update({ status }).eq("id", id);
}

// ─── Settings ────────────────────────────────────────────────────────────────

export function useSettings() {
  const [settings, setSettings] = useState({
    store: { name: "Me Inspiras 17", whatsapp: STATIC_WHATSAPP, instagram: "@meinspiras17", address: "Bogotá, Colombia", slogan: "Expertos en crear sonrisas" },
    delivery: { free_above: 0, base_fee: 0, hours: "24/7" },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      if (!isSupabaseConfigured) { setLoading(false); return; }
      const { data } = await supabase.from("settings").select("*");
      if (data) {
        const map = {};
        data.forEach((r) => { map[r.id] = r.value; });
        setSettings((prev) => ({ ...prev, ...map }));
      }
      setLoading(false);
    }
    fetch();
  }, []);

  return { settings, loading };
}

export async function updateSetting(id, value) {
  if (!isSupabaseConfigured) return { error: "Supabase not configured" };
  return await supabase.from("settings").upsert({ id, value });
}

// ─── Admin CRUD ──────────────────────────────────────────────────────────────

export async function adminGetProducts() {
  if (!isSupabaseConfigured) return { data: STATIC_PRODUCTS, error: null };
  return await supabase.from("products").select("*, categories(name, emoji, slug)").order("created_at", { ascending: false });
}

export async function adminGetProduct(id) {
  if (!isSupabaseConfigured) return { data: STATIC_PRODUCTS.find((p) => p.id === id), error: null };
  return await supabase.from("products").select("*").eq("id", id).single();
}

export async function adminSaveProduct(product) {
  if (!isSupabaseConfigured) return { error: "Supabase not configured" };
  if (product.id) {
    const { id, categories, ...rest } = product;
    return await supabase.from("products").update(rest).eq("id", id).select().single();
  }
  const { categories, ...rest } = product;
  return await supabase.from("products").insert(rest).select().single();
}

export async function adminDeleteProduct(id) {
  if (!isSupabaseConfigured) return { error: "Supabase not configured" };
  return await supabase.from("products").delete().eq("id", id);
}

export async function adminToggleProduct(id, active) {
  if (!isSupabaseConfigured) return { error: "Supabase not configured" };
  return await supabase.from("products").update({ active }).eq("id", id);
}

export async function adminGetCategories() {
  if (!isSupabaseConfigured) return { data: STATIC_CATEGORIES, error: null };
  return await supabase.from("categories").select("*").order("sort_order");
}

export async function adminSaveCategory(cat) {
  if (!isSupabaseConfigured) return { error: "Supabase not configured" };
  if (cat.id) {
    const { id, ...rest } = cat;
    return await supabase.from("categories").update(rest).eq("id", id).select().single();
  }
  return await supabase.from("categories").insert(cat).select().single();
}

export async function adminDeleteCategory(id) {
  if (!isSupabaseConfigured) return { error: "Supabase not configured" };
  return await supabase.from("categories").delete().eq("id", id);
}

// ─── Image Upload ────────────────────────────────────────────────────────────

export async function uploadImage(file) {
  if (!isSupabaseConfigured) return { error: "Supabase not configured" };
  const ext = file.name.split(".").pop();
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage.from("product-images").upload(name, file);
  if (error) return { url: null, error };
  const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(name);
  return { url: urlData.publicUrl, error: null };
}

// ─── Testimonials ────────────────────────────────────────────────────────────

export function useTestimonials() {
  return { testimonials: STATIC_TESTIMONIALS, loading: false };
}
