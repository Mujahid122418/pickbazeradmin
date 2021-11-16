import ConfirmationCard from "@components/common/confirmation-card";
import { useUI } from "@contexts/ui.context";
import { useDeleteSliderMutation } from "@data/slider/use-slider-delete.mutation";

const SliderDeleteView = () => {
  const { mutate: deleteSlider, isLoading: loading } = useDeleteSliderMutation();

  const { closeModal, modalData } = useUI();
  async function handleDelete() {
    deleteSlider(modalData);
    closeModal();
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default SliderDeleteView;
