import Layout from "@components/common/layout";
import CreateOrUpdateSliderForm from "@components/slider/slider-form";

export default function CreateSliderPage() {
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">Create New Slider</h1>
      </div>
      <CreateOrUpdateSliderForm />
    </>
  );
}
CreateSliderPage.Layout = Layout;
