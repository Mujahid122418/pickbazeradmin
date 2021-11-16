import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import { useRouter } from "next/router";
import { getIcon } from "@utils/get-icon";
// import Label from "@components/ui/label";
import * as typeIcons from "@components/icons/type";
import { Slider } from "@ts-types/generated";
import { useCreateSliderMutation } from "@data/slider/use-slider-create.mutation";
import { useUpdateSliderMutation } from "@data/slider/use-slider-update.mutation";
import { sliderIconList } from "./slider-icons";
import FileInput from "@components/ui/file-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { sliderValidationSchema } from "./slider-validation-schema";
// import SelectInput from "@components/ui/select-input";

export const updatedIcons = sliderIconList.map((item: any) => {
  item.label = (
    <div className="flex space-x-5 items-center">
      <span className="flex w-5 h-5 items-center justify-center">
        {getIcon({
          iconList: typeIcons,
          iconName: item.value,
          className: "max-h-full max-w-full",
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

type FormValues = {
  name?: string | null;
  // icon?: any;
  image: any;
};
const defaultValues = {
  image: [],
  name: "",
  details: "",
  parent: "",
  // icon: "",
  type: "",
};
type IProps = {
  initialValues?: Slider | null;
};
export default function CreateOrUpdateSliderForm({ initialValues }: IProps) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(sliderValidationSchema),
    // defaultValues: {
    //   name: initialValues?.name ?? "",
    //   icon: initialValues?.icon
    //     ? sliderIconList.find(
    //         (singleIcon) => singleIcon.value === initialValues?.icon!
    //       )
    //     : "",
    //     image: [],
    // },
    defaultValues: initialValues
      ? {
          ...initialValues,
          name: initialValues?.name ?? "",
      // icon: initialValues?.icon
      //   ? sliderIconList.find(
      //       (singleIcon) => singleIcon.value === initialValues?.icon!
      //     )
      //   : "",
        }
      : defaultValues,
    
  });
  const { mutate: createSlider, isLoading: creating } = useCreateSliderMutation();
  const { mutate: updateSlider, isLoading: updating } = useUpdateSliderMutation();
  const onSubmit = async (values: FormValues) => {
    if (!initialValues) {
      createSlider({
        variables: {
          input: { name: values.name!,image: {
            thumbnail: values?.image?.thumbnail,
            original: values?.image?.original,
            id: values?.image?.id,
          }, },
        },
      });
    } else {
      updateSlider({
        variables: {
          id: initialValues.id!,
          input: { name: values.name!, image: {
            thumbnail: values?.image?.thumbnail,
            original: values?.image?.original,
            id: values?.image?.id,
          }, },
        },
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-gray-300 my-5 sm:my-8">
        <Description
          title="Image"
          details="Upload New Slider image here"
          className="w-full px-0 sm:pr-4 md:pr-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="image" control={control} multiple={false} />
        </Card>
      </div>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title="Description"
          details={`${
            initialValues ? "Update" : "Add"
          } your slider description and necessary
          information from here`}
          className="w-full px-0 sm:pr-4 md:pr-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Name"
            {...register("name")}
            error={errors.name?.message}
            variant="outline"
            className="mb-5"
          />

          {/* <div className="mb-5">
            <Label>Select Icon</Label>
            <SelectInput
              name="icon"
              control={control}
              options={updatedIcons}
              isClearable={true}
            />
          </div> */}
        </Card>
      </div>

      <div className="mb-4 text-right">
        {initialValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="mr-4"
            type="button"
          >
            Back
          </Button>
        )}

        <Button loading={creating || updating}>
          {initialValues ? "Update" : "Add"} Slider
        </Button>
      </div>
    </form>
  );
}
