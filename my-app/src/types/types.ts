export type TipoProduto = {
    id: string;
    nome: string;
    preco: number;
    estoque: number;
    avatar: string;
};
export type TipoProdutoForm = {
    nome: string;
    preco: number;
    estoque: number;
    avatar: string;
};
export type TipoRespostaApi<T> = {
    status: "sucess" | "error";
    message?: string;
    data?: T;
};
