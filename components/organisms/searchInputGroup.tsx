import { ProductProps } from "components/templates/FullProductPage";
import { useEffect, useState } from "react";
import { api } from "utils/api";

interface SearchInputgroupProps {
  setProductsToShow: (products: ProductProps[]) => void;
  updateProductsToShow: () => void;
  setTake: (take: number) => void;
  take: number;
  setCurrentIndex: (index: number) => void;
}

export const SearchInputgroup = ({
  setProductsToShow,
  updateProductsToShow,
  take,
  setTake,
  setCurrentIndex,
}: SearchInputgroupProps) => {
  const { mutateAsync: loookForProduct } =
    api.product.lookForProduct.useMutation();
  const [searchValue, setSearchValue] = useState<number>(0);
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await loookForProduct(searchValue);
      setProductsToShow(products);
    };
    fetchProducts();
    updateProductsToShow();
    setTake(0);
    setCurrentIndex(0);
  }, [searchValue]);
  return (
    <div className="form-control">
      <div className="input-group">
        <input
          type="text"
          placeholder="Insira a geração..."
          className="input-bordered input w-72 text-white"
          onBlur={(e) => {
            setSearchValue(parseFloat(e.target.value));
          }}
        />
        <button className="btn-primary btn-square btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
