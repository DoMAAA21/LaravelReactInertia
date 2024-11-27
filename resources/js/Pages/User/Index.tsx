import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DataTable, DataTableActions } from '@/Components/data-table';
import { UserListProps } from '@/types';
import { router } from '@inertiajs/react';
import { useFetch } from '@/hooks/useFetch';
import ConfirmationPopUp from '@/Components/modal/ConfirmationPopUp';


export default function UserList({ users, current_page, total_pages, total_rows, per_page, t }: UserListProps) {
    const [page, setPage] = useState(current_page);
    const [userId, setUserId] = useState<null | string | number>(null);
    const [searchParams, setSearchParams] = useState({});
    const [withDeleted, setWithDeleted] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(per_page);

    useFetch({ page, rowsPerPage, searchParams, withDeleted });
    const onShow = (id: number | string) => {

    }

    const onEdit = (id: number | string) => {

    }

    const onDelete = (id: number | string) => {
        const title = t.info.confirmDelete;
        const message = t.info.areYouSure;
        const confirmButton = t.button.confirm;
        const cancelButton = t.button.cancel;
        ConfirmationPopUp({
            title,
            message,
            onSuccess: () => {

            },
            confirmButton,
            cancelButton
        })
    }

    const onRestore = (id: number | string) => {

    }
    const columns = [
        { label: '#', field: 'id', sortField: 'id', width: '15%' },
        { label: t.field.name, field: 'name', sortField: 'name', width: '35%' },
        { label: t.field.email, field: 'email', sortField: 'email', width: '35%' },
        { label: t.field.actions, field: 'actions', width: '15%' },
    ]

    const rows = users?.map(user => {
        const isDeleted: boolean = user.deleted_at !== undefined && user.deleted_at !== null;

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            actions: (
                <DataTableActions
                    toggleId={user.id}
                    toggleShow={onShow}
                    toggleEdit={onEdit}
                    toggleDelete={onDelete}
                    toggleRestore={onRestore}
                    isDeleted={isDeleted}
                />
            ),
            isDeleted
        }
    }) || [];

    const handleRowsPerPageChange = (perPage: number) => {
        setRowsPerPage(perPage);
    };
    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handleSearch = (val: string) => {
        setPage(page);
        setSearchParams(val !== '' ? {
            ...searchParams, search: val
        } : {});
    };

    const handleSortChange = (sortBy: string, sortOrder: string) => {
        setSearchParams(prevParams => ({
            ...prevParams,
            sortBy,
            sortOrder
        }))
    }

    const handleCheckboxChange = () => {
        setWithDeleted(!withDeleted);
    }



    return (
        <AuthenticatedLayout>
            <div className="w-full p-4">
                <DataTable
                    columns={columns}
                    rows={rows}
                    page={current_page}
                    pageCount={total_pages}
                    totalRows={total_rows}
                    rowsPerPage={per_page}
                    onSearch={handleSearch}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onSortChange={handleSortChange}
                    withDeleted={withDeleted}
                    handleCheckboxChange={handleCheckboxChange}
                    checkboxLabel={t.field.includeDeleted}
                />
            </div>

        </AuthenticatedLayout>

    );
}