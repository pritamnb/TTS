import React, { useState } from 'react';
import axios from 'axios';

interface Tag {
    id?: number;
    tagName: string;
    startIndex: number;
    endIndex: number;
    segment: { id: number }; // Updated to match the desired format
}

interface Segment {
    id: number;
    segmentNumber: number;
    startTime: string;
    endTime: string;
    text: string;
    tags: Tag[];
}

interface TranscriptSegmentProps {
    segment: Segment;
    showTags: boolean;
    onTagChange: () => void; // Callback to refresh tags
}

const TranscriptSegment: React.FC<TranscriptSegmentProps> = ({ segment, showTags, onTagChange }) => {
    const [selectedText, setSelectedText] = useState<string>('');
    const [tagName, setTagName] = useState<string>('');

    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (selection) {
            const selectedText = selection.toString();
            setSelectedText(selectedText);
        }
    };

    const handleCreateTag = async () => {
        if (!selectedText || !tagName) return; // Ensure text is selected and tagName is provided

        // Find the start index and end index of the selected text
        const startIndex = segment.text.indexOf(selectedText);
        const endIndex = startIndex + selectedText.length;

        if (startIndex === -1) {
            alert('Selected text not found in the segment.');
            return;
        }

        // Create the tag object
        const newTag: Tag = {
            tagName,
            startIndex,
            endIndex,
            segment: { id: segment.id } // Updated to match the desired format
        };

        try {
            // Send the request to create the tag
            const response = await axios.post('http://localhost:8080/tags', newTag);
            console.log('Tag created:', response.data);
            // Refresh the tag list
            onTagChange();
        } catch (error) {
            console.error('Error creating tag:', error);
        }
    };

    const handleDeleteTag = async (tagId: number) => {
        try {
            await axios.delete(`http://localhost:8080/tags/${tagId}`);
            console.log('Tag deleted:', tagId);
            // Refresh the tag list
            onTagChange();
        } catch (error) {
            console.error('Error deleting tag:', error);
        }
    };

    return (
        <div className="border p-2">
            <div>
                <span className="font-bold">Segment {segment.segmentNumber}: </span>
                <span>{segment.startTime} - {segment.endTime}</span>
            </div>
            <div
                onMouseUp={handleTextSelection}
                className="relative"
                style={{ whiteSpace: 'pre-wrap' }} // Ensures whitespace is preserved
            >
                {segment.text}
                {showTags && segment.tags.map(tag => (
                    <span
                        key={tag.id}
                        style={{
                            backgroundColor: 'yellow',
                            position: 'absolute',
                            top: 0,
                            left: `${tag.startIndex * 8}px`,
                            whiteSpace: 'pre-wrap' // Ensures whitespace is preserved
                        }}
                    >
                        {segment.text.substring(tag.startIndex, tag.endIndex)}
                        <button onClick={() => handleDeleteTag(tag.id!)} className="ml-2 text-red-500">x</button>
                    </span>
                ))}
            </div>
            {selectedText && (
                <div>
                    <input
                        type="text"
                        placeholder="Tag Name"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        className="border p-1"
                    />
                    <button
                        onClick={handleCreateTag}
                        className="bg-green-500 text-white px-2 py-1 mt-2 rounded"
                    >
                        Create Tag
                    </button>
                </div>
            )}
        </div>
    );
};

export default TranscriptSegment;
