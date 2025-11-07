import Swal from 'sweetalert2';

export const GlobalConfirmation = async ({
  title=false,
  onConfirm,
  successMsg="Success",
  successDesc="",
  confirmButtonText="Accept",
  cancelButtonText="Cancel",
  showCancelButton = true,
  confirmButtonColor = "#092769ff",
  reverseButtons=false,
}) => {
  const result = await Swal.fire({
    title:title?title:`Would you like to ${confirmButtonText}?`,
    // text:text,
    // icon: 'question',
    confirmButtonText:confirmButtonText,
    cancelButtonText: cancelButtonText,
    showCancelButton: showCancelButton,
    confirmButtonColor:confirmButtonColor,
    reverseButtons: reverseButtons,
  });

  if (result.isConfirmed) {
    try {
      await onConfirm();
      if (successMsg) {
        Swal.fire(`${successMsg} Successfully`, successDesc, 'success');
      }
    } catch (error) {
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  }
};
