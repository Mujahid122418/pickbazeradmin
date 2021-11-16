import { CreateSliderInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Slider from "@repositories/slider";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export interface ITypeUpdateVariables {
  variables: {
    id: string;
    input: CreateSliderInput;
  };
}

export const useUpdateSliderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: ITypeUpdateVariables) =>
    Slider.update(`${API_ENDPOINTS.SLIDERS}/${id}`, input),
    {
      onSuccess: () => {
        toast.success("Successfully updated!");
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.SLIDERS);
      },
    }
  );
};
