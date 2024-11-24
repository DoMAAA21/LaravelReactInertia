import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DataTable from '@/Components/data-table/DataTable';
import { UserListProps } from '@/types';
import { router } from '@inertiajs/react';
import useFetch from '@/hooks/useFetch';

export default function UserList({ users, current_page, total_pages, total_rows, per_page, t }: UserListProps) {
    const [page, setPage] = useState(current_page);
    const [searchParams, setSearchParams] = useState({});
    const [withDeleted, setWithDeleted] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(per_page);

    useFetch({ page, rowsPerPage, searchParams, withDeleted });

    const columns = [
        { label: '#', field: 'id', sortField: 'id', width: '15%' },
        { label: t.field.name, field: 'name', sortField: 'name', width: '20%' },
        { label: t.field.email, field: 'email', sortField: 'email', width: '40%' },
        { label: t.field.actions, field: 'actions', width: '15%' },
    ]

    const rows = users?.map(user => {
        const isDeleted = user.email_verified_at;

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            actions: (
                <>asa</>
            )
        }
    });

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
                />
            </div>

        </AuthenticatedLayout>

    );
}