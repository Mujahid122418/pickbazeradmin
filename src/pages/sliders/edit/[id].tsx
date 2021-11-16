import Layout from "@components/common/layout";
import { useRouter } from "next/router";
import CreateOrUpdateSliderForm from "@components/slider/slider-form";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useSliderQuery } from "@data/slider/use-slider.query";

export default function UpdateTypePage() {
  const { query } = useRouter();
  const { data, isLoading: loading, error } = useSliderQuery(query?.id as string);
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">Edit Slider</h1>
      </div>
      <CreateOrUpdateSliderForm initialValues={data} />
    </>
  );
}
UpdateTypePage.Layout = Layout;
