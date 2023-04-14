"use client";

import { useRouter } from "next/navigation";

interface PaginationButtonProps {
  skip: string;
  numberOfProducts: number;
}
export function PaginationButton({
  skip,
  numberOfProducts,
}: PaginationButtonProps) {
  const router = useRouter();
  return (
    <div className="btn-group grid grid-cols-2">
      <button
        className="btn-primary btn "
        onClick={() => {
          const skipNumber = parseFloat(skip) - 5;
          router.replace(`/produtos?skipNumber=${skipNumber}`);
        }}
        disabled={parseFloat(skip) === 0}
      >
        Anterior
      </button>
      <button
        className="btn-primary btn"
        disabled={parseFloat(skip) + 5 >= numberOfProducts}
        onClick={() => {
          console.log(skip);
          const skipNumber = parseFloat(skip) + 5;
          router.replace(`/produtos?skipNumber=${skipNumber}`);
        }}
      >
        Próximo
      </button>
    </div>
  );
}
``;
