// src/components/Upload.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:8080/transcripts/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const transcriptId = response.data.id;
                navigate(`/transcripts/${transcriptId}`);
            } catch (error) {
                console.error('Error uploading file', error);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded">
            <input type="file" accept=".srt" onChange={handleFileChange} className="mb-4" />
            <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">Upload Transcript</button>
        </div>
    );
};

export default Upload;
