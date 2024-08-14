import React, { useState } from 'react';

interface TagControlsProps {
    onAddTag: (tagName: string) => void;
    onToggleTags: () => void;
}

const TagControls: React.FC<TagControlsProps> = ({ onAddTag, onToggleTags }) => {
    const [tagName, setTagName] = useState('');

    const handleAddTag = () => {
        if (tagName) {
            onAddTag(tagName);
            setTagName('');
        }
    };

    return (
        <div className="mt-4">
            <input
                type="text"
                placeholder="Tag name"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                className="border p-2 rounded"
            />
            <button
                onClick={handleAddTag}
                className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-700"
            >
                Add Tag
            </button>
            <button
                onClick={onToggleTags}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-700"
            >
                Toggle Tags
            </button>
        </div>
    );
};

export default TagControls;
