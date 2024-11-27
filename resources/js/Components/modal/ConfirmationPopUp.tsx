import Swal from 'sweetalert2';

interface ConfirmationPopUpProps {
    title: string;
    message: string;
    onSuccess: () => void; 
    confirmButton?: string; 
    cancelButton?: string;
}

const ConfirmationPopUp = ({
    title,
    message,
    onSuccess,
    confirmButton = "Confirm",
    cancelButton = "Cancel"
}: ConfirmationPopUpProps) => {

    Swal.fire({
        title: title,
        text: message,
        showCancelButton: true,
        confirmButtonColor: "#000",
        confirmButtonText: confirmButton,
        cancelButtonText: cancelButton,
        customClass: {
            popup: 'bg-white shadow-lg rounded-xl p-6',
            title: 'text-3xl font-semibold text-gray-800 font-mono',
            cancelButton: 'py-2 px-10',
            confirmButton: 'py-2 px-10',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            onSuccess();
        }
    });
};

export default ConfirmationPopUp;
