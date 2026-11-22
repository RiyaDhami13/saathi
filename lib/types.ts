export interface ReadItem{
    id:string;
    type: "text"|"image";
    content:string;
    page?: number;
}

export interface ExplainResponse{
    title: string;
    summary: string;
    explanation:{
        itemId: string
        explanation: string;
    }[];
}