import { colors } from '../Theme';

interface Props {
    withDeleted: boolean;
    handleCheckboxChange: () => void;
    checkboxLabel: string;
    buttonText: string;
    onButtonClick: () => void;
}

const DataTableButtons = ({ withDeleted, handleCheckboxChange, checkboxLabel, buttonText, onButtonClick }: Props) => {
    return (
        <div className="flex items-center space-x-4">
            <label className="flex items-center font-mono text-bold select-none">
                <input
                    type="checkbox"
                    checked={withDeleted}
                    onChange={handleCheckboxChange}
                    className="mr-2 h-4 w-4"
                />
                {checkboxLabel}
            </label>
            {onButtonClick &&
                <button
                    onClick={onButtonClick}
                    className={`py-2 px-8 ${colors.primary} font-mono text-sm shadow-md rounded-md select-none`}
                >
                    + {buttonText}
                </button>
            }
        </div>

    )
}

export default DataTableButtons