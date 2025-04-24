import { Entity } from "../entity.model";

export class Museum extends Entity{
    name: string = '';
    description: string = '';
    city: string = '';
    street: string = '';
    streetNumber: number = 0;
    postalCode: string = '';
    phoneNumber: string = '';
    website: string = '';
    imgUrl: string = '';

    constructor(_id : string) {
        super(_id);
    }
}
