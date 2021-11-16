import * as yup from "yup";
export const sliderValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});
