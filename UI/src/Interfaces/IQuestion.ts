export interface IQuestionRequest {
    text: string,
    date: string
}
export interface IQuestion {
    id: number,
    text: string,
    date: string,
    email: string
}
export interface IQuestions {
    status: number,
    questions: IQuestion[],
    message: string
}