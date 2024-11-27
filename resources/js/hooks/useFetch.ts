import { useEffect } from 'react';
import { router } from '@inertiajs/react';

interface UseFetchProps {
    page: number;
    rowsPerPage: number;
    searchParams: Record<string, unknown>;
    withDeleted: true | false
}

export const useFetch = ({ page, rowsPerPage, searchParams, withDeleted = false }: UseFetchProps) => {
    useEffect(() => {
        const query = {
            ...searchParams,
            page,
            rowsPerPage,
            withDeleted
        };

        router.get(route(route().current() as string), query, {
            replace: true,
            preserveState: true
        });
    }, [page, rowsPerPage, searchParams, withDeleted]);
};
