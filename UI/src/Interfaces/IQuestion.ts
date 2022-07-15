export interface IQuestion {
    id?: number,
    text: string,
    date: string,
}
export interface IQuestions {
    list: IQuestion[],
    email: string,
    status?: number
}