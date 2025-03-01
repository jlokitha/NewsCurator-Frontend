export interface News {
    id?: number;
    source: { id: string | null, name: string | null };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
    isBookmarked: boolean;
}