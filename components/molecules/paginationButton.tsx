"use client";

import { useState } from "react";

interface PaginationButtonProps {
  numberOfProducts: number;
  handleNextClick: () => void;
  handlePrevClick: () => void;
  take: number;
  setTake: (take: number) => void;
}
export function PaginationButton({
  numberOfProducts,
  handleNextClick,
  handlePrevClick,
  take,
  setTake,
}: PaginationButtonProps) {
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
