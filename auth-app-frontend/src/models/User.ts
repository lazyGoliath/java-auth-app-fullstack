export default interface User{
    id: string;
    name?: string;
    email: string;
    enabled: boolean;
    image: string;
    provider: string;
    createdAt?: string;
    updatedAt?: string;
}