import { QueryParamsType, TypesQueryOptionsType } from "@ts-types/custom.types";
import { stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Slider from "@repositories/slider";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { Slider as SSlider } from "@ts-types/generated";

const fetchSliders = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    text,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as TypesQueryOptionsType;
  const searchString = stringifySearchQuery({
    name: text,
  });
  const url = `${API_ENDPOINTS.SLIDERS}?search=${searchString}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const { data } = await Slider.all(url);
  return { types: data as SSlider[] };
};

type TypeResponse = {
  types: SSlider[];
};

const useSlidersQuery = (options: TypesQueryOptionsType = {}) => {
  return useQuery<TypeResponse, Error>(
    [API_ENDPOINTS.SLIDERS, options],
    fetchSliders,
    {
      keepPreviousData: true,
    }
  );
};

export { useSlidersQuery, fetchSliders };
