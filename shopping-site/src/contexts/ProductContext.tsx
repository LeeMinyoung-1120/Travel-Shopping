import React, { createContext, useContext, useEffect, useState } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  unitPrice: number;
  thumbnail: string;
  images: string[];
  rating: number;
  reviewCount: number;
  section: string;
  tag: string;
  description: string;
  maxQty: number;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProductById: (id: number) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 상품 데이터 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products");

        if (!response.ok) {
          throw new Error("상품 데이터를 불러오지 못했습니다.");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const fetchProductById = (id: number) => {
    return products.find((product) => product.id === id);
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, error, fetchProductById }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// 커스텀 훅
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
