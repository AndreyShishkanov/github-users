export interface User {
    id?: string;
    login: string;
    name: string;
    email: string;
    bioHTML?: string;
    avatarUrl?: string;
    createdAt?: Date;
    location?: string;
    companyHTML?: string;
    isHireable?: boolean;
    resourcePath?: string;
}
