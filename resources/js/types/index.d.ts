import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
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
