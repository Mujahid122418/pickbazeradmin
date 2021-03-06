import { AttributeInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Attribute from "@repositories/attribute";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export interface IAttributeUpdateVariables {
  variables: {
    id: number | string;
    input: AttributeInput;
  };
}

export const useUpdateAttributeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: IAttributeUpdateVariables) =>
      Attribute.update(`${API_ENDPOINTS.ATTRIBUTES}/${id}`, input),
    {
      onSuccess: () => {
        toast.success("Successfully updated!");
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ATTRIBUTES);
      },
    }
  );
};
