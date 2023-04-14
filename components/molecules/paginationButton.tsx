"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface PaginationButtonProps {
  numberOfProducts: number;
  getProducts: (amount: number) => void;
  handleNextClick: () => void;
  handlePrevClick: () => void;
}
export function PaginationButton({
  numberOfProducts,
  getProducts,
  handleNextClick,
  handlePrevClick,
}: PaginationButtonProps) {
  const router = useRouter();
  const [take, setTake] = useState<number>(0);
  console.log(numberOfProducts);
  return (
    <div className="btn-group grid grid-cols-2">
      <button
        className="btn-primary btn "
        onClick={() => {
          handlePrevClick();
          setTake(take - 5);
        }}
        disabled={take === 0}
      >
        Anterior
      </button>
      <button
        className="btn-primary btn"
        disabled={take + 5 >= numberOfProducts}
        onClick={() => {
          setTake(take + 5);
          handleNextClick();
        }}
      >
        Próximo
      </button>
    </div>
  );
}
``;
