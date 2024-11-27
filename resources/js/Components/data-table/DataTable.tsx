import { useState, useEffect, ChangeEvent } from 'react';
import { usePage } from '@inertiajs/react';
import { useDebounce } from '@/hooks/useDebounce';
import FilterIcon from '@/assets/svg/FilterIcon.svg';
import DataTableButtons from './DataTableButtons';
import ArrowIcon from './ArrowIcon';
import { DataTableProps, Column } from '@/types';


const DataTable = ({
    columns = [],
    rows = [],
    withDeleted = false,
    handleCheckboxChange = () => { },
    checkboxLabel = '',
    buttonText = '',
    onButtonClick = () => { },
    filter,
    page = 1,
    onPageChange,
    pageCount = 0,
    totalRows = 0,
    rowsPerPage = 0,
    onRowsPerPageChange = () => { },
    loading,
    onSearch = () => { },
    onSortChange = () => { },
    showSearch = true,
}: DataTableProps) => {
    const { t } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [showFilter, setShowFilter] = useState(false);
    const search = useDebounce(searchTerm, 1000);
    const pageSize = rowsPerPage;
    const startItem = (page - 1) * pageSize + 1;
    const endItem = Math.min(startItem + pageSize - 1, totalRows);


    const handlePageChange = (newPage: number) => {
        onPageChange(newPage);
    };

    const handleRowsPerPageChange = (value: number) => {
        onRowsPerPageChange(value);
    }


    const sortedData = [...rows].sort((a, b) => {
        if (sortColumn) {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else {
                return sortOrder === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
            }
        }

        return 0;
    });


    const handleSort = (column: string) => {
        if (column) {
            if (sortColumn === column) {
                const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
                setSortOrder(newSortOrder);
                onSortChange(column, newSortOrder);
            } else {
                setSortColumn(column);
                setSortOrder('asc');
                onSortChange(column, 'asc');
            }
        }

    };

    useEffect(() => {
        onSearch(search)
    }, [search]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="py-4 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4 px-4">
                {filter && <button className="bg-white shadow-md rounded w-9 h-9 mr-4 select-none"> <img src={FilterIcon} className={`transform transition-transform duration-500 p-2 ${showFilter ? 'rotate-180' : 'rotate-0'}`} onClick={() => setShowFilter(!showFilter)} /> </button>}
                {showSearch && (
                    <div className="relative mr-auto">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 28 28"
                            stroke="currentColor"
                            className="absolute left-3 top-2 h-6 w-6 text-gray-500"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4-4" />
                        </svg>
                        <input
                            type="text"
                            placeholder={t.field.search}
                            id="searchInput"
                            onChange={handleSearchChange}
                            className="w-72 py-1 h-9 pl-10 border border-gray-300 rounded-md text-xs font-mono"
                        />
                    </div>
                )}
                {checkboxLabel && (
                    <DataTableButtons
                        withDeleted={withDeleted}
                        handleCheckboxChange={handleCheckboxChange}
                        checkboxLabel={checkboxLabel}
                        buttonText={buttonText}
                        onButtonClick={onButtonClick}
                    />
                )}

            </div>

            <div className={`transition-all duration-500  ease-in-out ${showFilter ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {filter}
            </div>

            <div className="bg-white rounded-md">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-[#F4F7FC] border border-gray-300 overflow-hidden">
                        <thead className="bg-[#F4F7FC] text-black p-10">
                            <tr>
                                {columns.map((column: Column) => (
                                    <th
                                        key={column.field}
                                        className={`p-2 cursor-pointer lg:h-10 lg:p-2 h-6 text-start text-xs bg-transparent select-none`}
                                        style={{ width: column.width || 'auto' }}
                                        onClick={() => column.sortField && handleSort(column.sortField)}
                                    >
                                        <span className="flex items-center">
                                            {column.label.toUpperCase()}
                                            <span className="m-2 w-3 h-4 inline-flex items-center justify-center">
                                                {column.sortField && sortColumn === column.sortField ? (
                                                    <ArrowIcon ascending={sortOrder === 'asc'} />
                                                ) : (
                                                    column.sortField && <ArrowIcon />
                                                )}
                                            </span>
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={columns.length} className="p-4 text-center lg:h-8 lg:m-4 w-40 font-mono">
                                        Loading...
                                    </td>
                                </tr>
                            ) : sortedData.length > 0 ? (
                                sortedData.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={`transition-colors text-sm font-medium 
                                        ${item.isDeleted ? 'bg-gray-300 hover:bg-red-300' : (index % 2 === 0 ? 'bg-[#F9FAFC] hover:bg-[#F7F7F7]' : 'bg-white hover:bg-[#F7F7F7]')}`}
                                    >
                                        {columns.map((column) => (
                                            <td key={column.field} className={`p-3 text-start lg:h-8 lg:m-4 w-${column.width || 'auto'} text-[#171C26]`}>
                                                {item[column.field]}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="p-4 text-center lg:h-8 lg:m-4 w-40 font-mono">
                                        {t.message.noAvailableData}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between p-1 items-center">
                    <div className="font-mono text-sm text-[#687182] p-2 font-medium">{startItem}-{endItem} {t.info.of} {totalRows}</div>
                    <div className="flex space-x-4">
                        <p className="text-[#687182] text-sm font-medium font-mono">
                            {t.field.rowsPerPage}
                            <select
                                className="ml-2 border  border-gray-300 rounded px-2 py-1"
                                onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                                value={rowsPerPage}
                                id="rowsPerPage"
                            >
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                            </select>
                        </p>
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            aria-label="Previous Page"
                            className={`${page === 1 ? 'bg-[#CCCCCC]' : 'bg-white'} text-white p-1 h-6 w-8 rounded shadow-md`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="-3 0 32 32"
                                stroke="#000"
                                className="h-6 w-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <p className="text-sm text-center">
                            <span className="font-mono font-semibold text-[#171C26] inline-block w-8">{page}</span>
                            /<span className="font-mono text-[#687182] inline-block w-8">{pageCount}</span>
                        </p>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === pageCount}
                            aria-label="Next Page"
                            className={`${page === pageCount ? 'bg-[#CCCCCC]' : 'bg-white'} text-white p-1 h-6 w-8 rounded shadow-md`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="-3 0 32 32"
                                stroke="#000"
                                className="h-6 w-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataTable;