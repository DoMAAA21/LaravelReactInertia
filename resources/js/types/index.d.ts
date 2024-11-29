import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: Date;
    deleted_at?: Date
    updated_at?: Date
    created_at?: Date
}

enum Locale {
    EN = 'en',
    JA = 'ja',
}

export type Translations<T extends Record<string> = Record<string>> = T & {
    [key: string]: Record<string, string> | Translations<T>;
};


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    t: Translations;
    locale: Locale;
};

export interface Column {
    field: string;
    label: string;
    width?: string;
    sortField?: string;
}

export interface Row {
    [key: string]: any;
}

export interface DataTableProps {
    columns: Column[];
    rows: Row[];
    withDeleted?: boolean;
    handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
    checkboxLabel?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    filter?: string;
    page?: number;
    onPageChange: (page: number) => void;
    pageCount?: number;
    totalRows?: number;
    rowsPerPage?: number;
    onRowsPerPageChange: (rowsPerPage: number) => void;
    loading?: boolean;
    onSearch: (search: string) => void;
    onSortChange: (sortField: string, sortOrder: 'asc' | 'desc') => void;
    showSearch?: boolean;
}

export interface PaginatedProps {
    current_page: number;
    total_pages: number;
    total_rows: number;
    per_page: number;
}
export interface UserListProps extends PageProps, PaginatedProps{
    users:  User[],
}

