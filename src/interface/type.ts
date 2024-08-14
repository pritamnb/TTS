export interface Tag {
    id: number;
    tagName: string;
    startIndex: number;
    endIndex: number;
}

export interface TranscriptSegment {
    id: number;
    segmentNumber: number;
    startTime: string;
    endTime: string;
    text: string;
    tags: Tag[];
}
