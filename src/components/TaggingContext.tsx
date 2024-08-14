import React, { createContext, useState, ReactNode } from 'react';

interface Tag {
    id?: number;
    tagName: string;
    startIndex: number;
    endIndex: number;
    segmentId: number;
}

interface TaggingContextProps {
    tags: Tag[];
    addTag: (tag: Tag) => void;
    removeTag: (tagId: number) => void;
    toggleTagsVisibility: () => void;
}

const TaggingContext = createContext<TaggingContextProps>({
    tags: [],
    addTag: () => { },
    removeTag: () => { },
    toggleTagsVisibility: () => { },
});

export const TaggingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [showTags, setShowTags] = useState(true);

    const addTag = (tag: Tag) => {
        setTags((prevTags) => [...prevTags, tag]);
    };

    const removeTag = (tagId: number) => {
        setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
    };

    const toggleTagsVisibility = () => {
        setShowTags((prevShow) => !prevShow);
    };

    return (
        <TaggingContext.Provider value={{ tags, addTag, removeTag, toggleTagsVisibility }}>
            {children}
        </TaggingContext.Provider>
    );
};

export default TaggingContext;
