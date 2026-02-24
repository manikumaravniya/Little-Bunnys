import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "../../data");
const dataPath = path.resolve(dataDir, "products.json");

const seedProducts = [
  {
    id: uuidv4(),
    code: "LB-001",
    title: "Sunset Orange Tie-Dye Dress",
    description:
      "Bright orange tie-dye dress with a soft flared skirt and cute button detailing on the bodice. Light, comfortable, and perfect for everyday wear or casual outings.",
    price: 32,
    imageUrl:
      "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624347/dress-1_ohz1j4.png",
  },
  {
    id: uuidv4(),
    code: "LB-002",
    title: "Maroon Royal Brocade Party Dress",
    description:
      "Elegant maroon satin bodice paired with a rich gold-woven brocade flared skirt. A timeless festive dress ideal for weddings, celebrations, and special occasions.",
    price: 58,
    imageUrl:
      "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624345/dress-2_wnlijh.png",
  },
  {
    id: uuidv4(),
    code: "LB-003",
    title: "Royal Pink Peplum Ethnic Dress",
    description:
      "Bright pink embroidered peplum top paired with a flared navy brocade skirt and elegant border. A graceful festive outfit perfect for celebrations and special occasions.",
    price: 55,
    imageUrl:
      "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624346/dress-3_mfaiqp.png",
  },
  {
    id: uuidv4(),
    code: "LB-004",
    title: "Ruby Blossom Ethnic Peplum Dress",
    description:
      "Rich red embroidered peplum top paired with a flared grey skirt featuring a vibrant pink festive border. Elegant and traditional, perfect for weddings, festivals, and special celebrations.",
    price: 60,
    imageUrl:
      "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624367/dress-4_qq6xra.png",
  },
  {
    id: uuidv4(),
    code: "LB-005",
    title: "Emerald Festive Bloom",
    description:
      "Rich green embroidered bodice paired with a flared red brocade skirt. Elegant and festive, perfect for weddings and special occasions.",
    price: 49,
    imageUrl:
      "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624360/dress-5_fctggx.png",
  },
  {
    id: uuidv4(),
    code: "LB-006",
    title: "Regal Maroon & Green Brocade Dress",
    description:
      "Elegant maroon embroidered bodice paired with a rich green brocade flared skirt and traditional border. A classic festive outfit perfect for weddings and special occasions.",
    price: 62,
    imageUrl:
      "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624364/dress-6_h0c9r1.png",
  },
  {
    id: uuidv4(),
    code: "LB-007",
    title: "Amber Leaf Organza Party Dress",
    description:
      "Warm amber-toned bodice paired with a flowy printed organza flared skirt. Light, elegant, and perfect for parties and special occasions.",
    price: 45,
    imageUrl:
      "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624354/dress-7_pgtoyw.png",
  },
  {
    id: uuidv4(),
    code: "LB-008",
    title: "Pink Bunny Wrap Cotton Dress",
    description:
      "Soft pink cotton dress with cute bunny prints, wrap-style bodice, and tassel tie-up detail. Comfortable, breathable, and perfect for everyday wear.",
    price: 29,
    imageUrl:
      "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624358/dress-8_yic4ql.png",
  },
];

const ensureStore = async () => {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataPath);
  } catch {
    await fs.writeFile(dataPath, JSON.stringify(seedProducts, null, 2), "utf-8");
  }
};

export const getProducts = async () => {
  await ensureStore();
  const raw = await fs.readFile(dataPath, "utf-8");
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
};

const writeProducts = async (products) => {
  await ensureStore();
  await fs.writeFile(dataPath, JSON.stringify(products, null, 2), "utf-8");
};

export const createProduct = async (productInput) => {
  const products = await getProducts();
  const nextCode = `LB-${String(products.length + 1).padStart(3, "0")}`;
  const product = { id: uuidv4(), code: nextCode, ...productInput };
  products.push(product);
  await writeProducts(products);
  return product;
};

export const updateProduct = async (id, productInput) => {
  const products = await getProducts();
  const index = products.findIndex((item) => item.id === id);
  if (index < 0) {
    return null;
  }

  const updated = { ...products[index], ...productInput, id };
  products[index] = updated;
  await writeProducts(products);
  return updated;
};

export const deleteProduct = async (id) => {
  const products = await getProducts();
  const next = products.filter((item) => item.id !== id);

  if (next.length === products.length) {
    return false;
  }

  await writeProducts(next);
  return true;
};
