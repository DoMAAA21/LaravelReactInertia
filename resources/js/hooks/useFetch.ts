import { useEffect } from 'react';
import { router } from '@inertiajs/react';

interface UseFetchProps {
    page: number;
    rowsPerPage: number;
    searchParams: Record<string, unknown>;
    withDeleted: true | false
}

const useFetch = ({ page, rowsPerPage, searchParams, withDeleted }: UseFetchProps) => {
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
    }, [page, rowsPerPage, searchParams]);
};

export default useFetch;
