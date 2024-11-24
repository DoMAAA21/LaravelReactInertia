export const getQueryParams = (urlSearch: string) => {
    const urlParams = new URLSearchParams(urlSearch);
    const params: Record<string, string | number | boolean> = {};
    params.page = urlParams.get('page') ? parseInt(urlParams.get('page') as string) : 1;
    params.rowsPerPage = urlParams.get('rowsPerPage') ? parseInt(urlParams.get('rowsPerPage') as string) : 10;
    params.search = urlParams.get('search') || '';
    params.withDeleted = urlParams.get('withDeleted') === 'true';

    return params;
};