import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TranscriptSegment from './TranscriptSegment';

// Define the Tag interface
interface Tag {
    id: number;
    tagName: string;
    startIndex: number;
    endIndex: number;
    segment: { id: number };
}

// Define the Segment interface
interface Segment {
    id: number;
    segmentNumber: number;
    startTime: string;
    endTime: string;
    text: string;
    tags: Tag[];
}


const TranscriptViewer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [transcript, setTranscript] = useState<any>();
    // const [showTags, setShowTags] = useState<boolean>(true);
    const [segments, setSegments] = useState<Segment[]>([]); // State to hold the list of segments
    const [showTags, setShowTags] = useState<boolean>(true); // State to toggle tag visibility

    useEffect(() => {
        fetch(`http://localhost:8080/transcripts/${id}`)
            .then(response => response.json())
            .then(data => setTranscript(data));
    }, [id]);
    console.log("transcript: ", transcript);
    // Fetch the transcript when the component mounts or the id changes
    // Function to fetch transcript segments from the backend
    const fetchTranscript = async () => {
        try {
            const response = await fetch(`http://localhost:8080/transcripts/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSegments(data.segments); // Assuming the response contains a 'segments' field
        } catch (error) {
            console.error('Error fetching transcript:', error);
        }
    };
    useEffect(() => {
        fetchTranscript();
    }, [id]);

    // Callback to refresh the segment list
    const handleTagChange = () => {
        fetchTranscript(); // Refresh the segments list
    };
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Transcript {id}</h1>
            <button
                onClick={() => setShowTags(!showTags)}
                className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
            >
                {showTags ? 'Hide Tags' : 'Show Tags'}
            </button>
            {/* {transcript?.map(segment => ( */}
            {transcript &&
                <TranscriptSegment
                    key={transcript.id}
                    segment={transcript}
                    showTags={showTags}
                    onTagChange={handleTagChange} />
            }

            {/* ))} */}
        </div>
    );
};

export default TranscriptViewer;
