export type UserDataInput={
    name : string,
    email: string,
    password: string
    telephone: {
        number: number,
        area_code: number
    } 
}

export type UserDateOutput={
    id: string,
    created_at : Date,
    modified_at: Date
}