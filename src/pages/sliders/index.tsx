import Card from "@components/common/card";
import Layout from "@components/common/layout";
import Search from "@components/common/search";
import SliderList from "@components/slider/slider-list";
import ErrorMessage from "@components/ui/error-message";
import LinkButton from "@components/ui/link-button";
import Loader from "@components/ui/loader/loader";
import { OrderField } from "@ts-types/index";
import { SortOrder } from "@ts-types/generated";
import { useState } from "react";
import { useSlidersQuery } from "@data/slider/use-sliders.query";

export default function SlidersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading: loading, error } = useSlidersQuery({
    text: searchTerm,
    orderBy: OrderField.UpdatedAt,
    sortedBy: SortOrder.Desc,
  });

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }

  return (
    <>
      <Card className="flex flex-col md:flex-row items-center mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-xl font-semibold text-heading">Sliders</h1>
        </div>

        <div className="w-full md:w-3/4 flex items-center ml-auto">
          <Search onSearch={handleSearch} />

          <LinkButton href="/sliders/create" className="h-12 ml-4 md:ml-6">
            <span className="hidden md:block">+ Add Sliders</span>
            <span className="md:hidden">+ Add</span>
          </LinkButton>
        </div>
      </Card>
      <SliderList types={data?.types} />
    </>
  );
}

SlidersPage.Layout = Layout;
