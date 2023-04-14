"use client";
import ProductCreateModal from "components/organisms/ProductCreateModal";
import { AiOutlineDelete } from "react-icons/ai";
import { prisma } from "server/db";
import { PaginationButton } from "components/molecules/paginationButton";
import ProductEditModal from "components/organisms/ProductEditModal";
import React, { useState, useEffect } from "react";
import { api } from "utils/api";

interface ProductProps {
  id: string;
  power: number;
  generation: string;
  price: number;
  panelBrand: string;
  inverterBrand: string;
  roofType: string;
}
export default function page() {
  const [products, setProducts] = useState<ProductProps[]>([
    {
      id: "",
      power: 0,
      generation: "",
      price: 0,
      panelBrand: "",
      inverterBrand: "",
      roofType: "",
    },
  ]);
  const { mutateAsync: getAmountOfProductsFromDb } =
    api.product.getAmountOfProducts.useMutation();
  const [amountOfProducts, setAmountOfProducts] = useState<number>(5);
  const { mutateAsync: getProductsFromDb } =
    api.product.getAllProducts.useMutation();

  const getAmountOfProducts = async () => {
    const amountOfProducts = await getAmountOfProductsFromDb();
    setAmountOfProducts(amountOfProducts);
  };
  const getProducts = async (amount: number) => {
    const products = await getProductsFromDb({
      take: amount,
    });
    setProducts(products);
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsToShow, setProductsToShow] = useState(products.slice(0, 5));
  const updateProductsToShow = () => {
    const endIndex = currentIndex + 5;
    setProductsToShow(products.slice(currentIndex, endIndex));
  };
  const handleNextClick = () => {
    const newIndex = currentIndex + 5;
    if (newIndex >= products.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(newIndex);
    }
  };

  const handlePrevClick = () => {
    const newIndex = currentIndex - 5;
    if (newIndex < 0) {
      setCurrentIndex(products.length - 5);
    } else {
      setCurrentIndex(newIndex);
    }
  };
  useEffect(() => {
    getProducts(30);
    getAmountOfProducts();
  }, []);

  useEffect(() => {
    updateProductsToShow();
  }, [currentIndex, products]);
  return (
    <div className="space-y-4 px-4 py-4 md:px-6">
      <div className="createBUtton flex w-full justify-end pr-2">
        <ProductCreateModal></ProductCreateModal>
      </div>
      <div className="tableContainer w-full rounded-lg  bg-slate-200">
        <div className="tableHeader flex h-12 items-center">
          <label className=" w-1/2 text-center font-cabin font-bold text-slate-500">
            Produto
          </label>
          <label className=" w-1/2 text-center font-cabin font-bold text-slate-500">
            Valor
          </label>
        </div>
        <div className="tableBody w-full space-y-0 ">
          {productsToShow.map((product, index) => {
            const formatPrice = (price: number) => {
              const formatter = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              });

              return formatter.format(price);
            };
            const formatedPrice = formatPrice(product.price);
            const rowBgColor =
              index % 2 === 0 ? "bg-slate-300" : "bg-slate-100";
            return (
              <div
                className={`tableRow flex items-center py-2 ${rowBgColor}`}
                key={product.id}
              >
                <div className="info flex w-1/2 flex-col justify-center pl-2">
                  <label className="font-cabin text-[16px]  font-bold text-slate-500">
                    {`Kit: ${product.power}kWp`}
                  </label>
                  <label className=" font-cabin text-[10px] text-slate-500">
                    {`Geração: ${product.generation}kWh`}
                  </label>
                  <label className=" font-cabin text-[10px] text-slate-500">
                    {`Marca do Painel: ${product.panelBrand}`}
                  </label>
                  <label className=" font-cabin text-[10px] text-slate-500">
                    {`Marca do Inversor: ${product.inverterBrand}`}
                  </label>
                  <label className=" font-cabin text-[10px] text-slate-500">
                    {`Tipo de Telhador: ${product.roofType}`}
                  </label>
                </div>
                <div className="valorContainer flex w-1/2 flex-col items-center">
                  <label className="font-cabin text-sm font-bold text-red-500">
                    {`${formatedPrice}`}
                  </label>
                  <div className="actions flex flex-col items-center">
                    <label className=" font-cabin text-[14px] text-black">
                      Ações
                    </label>
                    <div className="icons flex w-full justify-around gap-6">
                      <ProductEditModal
                        editProduct={product}
                      ></ProductEditModal>
                      <label className="btn-square btn-sm btn border-red-500 bg-red-500 text-slate-50">
                        <AiOutlineDelete size={12}></AiOutlineDelete>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div></div>
        </div>
        <PaginationButton
          getProducts={getProducts}
          numberOfProducts={amountOfProducts}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        ></PaginationButton>
      </div>
    </div>
  );
}
