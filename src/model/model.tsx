export interface IEmployee{
        id: number,
        name: string,
        fName: string,
        profile: string,
        age:number
}

export interface ISubEmployee{
        name: string,
        fName: string,
        profile: string,
        age: number | null
}