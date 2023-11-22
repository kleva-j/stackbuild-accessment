"use client";

import { Pagination } from "react-headless-pagination";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@radix-ui/themes";

type PagerProps = {
  total: number;
  page: number;
  limit?: number;
};

export const Pager = ({ page, total, limit = 9 }: PagerProps) => {
  const { push } = useRouter();

  const goToPage = (page: number) => push(`/?page=${page}`);

  const totalPages = Math.ceil(total / limit);

  return (
    <Pagination
      currentPage={page}
      totalPages={totalPages}
      edgePageCount={0}
      middlePagesSiblingCount={0}
      setCurrentPage={(page) => goToPage(page)}
      className="flex h-10 w-full select-none items-center justify-between text-sm"
      truncableClassName="w-10 px-0.5 text-center"
      truncableText="..."
    >
      <Button asChild variant="soft" radius="medium" disabled={page <= 1}>
        <Pagination.PrevButton
          className="mr-2 flex items-center focus:outline-none "
          onClick={() => goToPage(page - 1)}
        >
          <ArrowLeft className="mr-3" size={20} />
          Prev
        </Pagination.PrevButton>
      </Button>

      {/* <nav className="flex flex-grow justify-center">
        <ul className="flex items-center">
          <Pagination.PageButton
            activeClassName="bg-primary-50 dark:bg-opacity-0 text-primary-600 dark:text-white"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
            inactiveClassName="text-gray-500"
            onClick={() => goToPage(page - 1)}
          />
        </ul>
      </nav> */}

      <Button
        asChild
        variant="soft"
        radius="medium"
        disabled={page >= totalPages}
      >
        <Pagination.NextButton
          className="mr-2 flex cursor-pointer items-center focus:outline-none"
          onClick={() => goToPage(page + 1)}
        >
          Next
          <ArrowRight className="ml-3" size={20} />
        </Pagination.NextButton>
      </Button>
    </Pagination>
  );
};
