import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Transcript {
    id: number;
    segmentNumber: number;
    startTime: string;
    endTime: string;
    text: string;
}

const TranscriptList: React.FC = () => {
    const [transcripts, setTranscripts] = useState<Transcript[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/transcripts')
            .then(response => response.json())
            .then(data => setTranscripts(data));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Transcript List</h1>
            <ul className="space-y-2">
                {transcripts.map(transcript => (
                    <li key={transcript.id} className="p-2 border">
                        <Link to={`/transcripts/${transcript.id}`} className="text-blue-500 hover:underline">
                            Transcript {transcript.id}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TranscriptList;
