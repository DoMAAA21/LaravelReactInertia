import MagnifyingIcon from '@/assets/svg/MagnifyingGlass.svg';
import EditIcon from '@/assets/svg/Pen.svg';
import TrashIcon from '@/assets/svg/Trash.svg';
import RestoreIcon from '@/assets/svg/Restore.svg';
import { usePage } from '@inertiajs/react';

interface DataTableActionsProps {
    toggleId?: number | string | null;
    toggleEdit?: (id: number | string) => void;
    toggleShow?: (id: number | string) => void;
    toggleDelete?: (id: number | string) => void;
    toggleRestore?: (id: number | string) => void;
    isDeleted?: boolean;
}

const DataTableActions = ({
    toggleId = null,
    toggleEdit,
    toggleShow,
    toggleDelete,
    toggleRestore,
    isDeleted,
}: DataTableActionsProps) => {

    const { t } = usePage().props;

    return (
        <div className="flex space-x-2 select-none">
            {!isDeleted ? (
                <div className="flex space-x-2 select-none">
                    {toggleShow && (
                        <button title={t.button.view} onClick={() => toggleId && toggleShow(toggleId)} className="w-10 h-8 bg-white bg-opacity-0 text-white rounded-lg shadow-md hover:bg-opacity-100 hover:shadow-lg hover:scale-105 transform transition duration-200 ease-in-out flex items-center justify-center">
                            <img src={MagnifyingIcon} className="w-5 h-5" alt="View Icon" />
                        </button>
                    )}
                    {toggleEdit && (
                        <button title={t.button.edit} onClick={() => toggleId && toggleEdit(toggleId)} className="w-10 h-8 bg-white bg-opacity-0 text-white rounded-lg shadow-md hover:bg-opacity-100 hover:shadow-lg hover:scale-105 transform transition duration-200 ease-in-out flex items-center justify-center">
                            <img src={EditIcon} className="w-5 h-5" alt="Edit Icon" />
                        </button>
                    )}
                    {toggleDelete && (
                        <button title={t.button.delete} onClick={() => toggleId && toggleDelete(toggleId)} className="w-10 h-8 bg-white bg-opacity-0 text-white rounded-lg shadow-md hover:bg-opacity-100 hover:shadow-lg hover:scale-105 transform transition duration-200 ease-in-out flex items-center justify-center">
                            <img src={TrashIcon} className="w-5 h-5" alt="Delete Icon" />
                        </button>
                    )}
                </div>
            ) : (
                <button title={t.button.restore} onClick={() => toggleId && toggleRestore && toggleRestore(toggleId)} className="w-10 h-8 bg-white bg-opacity-0  text-white rounded-lg shadow-md hover:bg-opacity-100 hover:shadow-lg hover:scale-105 transform transition duration-200 ease-in-out flex items-center justify-center">
                    <img src={RestoreIcon} className="w-5 h-5" alt="Restore Icon" />
                </button>
            )}
        </div>
    )
}
export default DataTableActions;