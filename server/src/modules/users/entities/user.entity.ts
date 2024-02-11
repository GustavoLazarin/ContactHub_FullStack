import { Exclude } from 'class-transformer';

export class User {
    readonly id: string;
    name: string;
    email: string;
    phone_number: string;
    profile_img: string;
    createdAt: string;

    @Exclude()
    password: string;
}
