import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadTranscript: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8080/transcripts/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                navigate('/transcripts');
            } else {
                console.error('Failed to upload transcript');
            }
        } catch (error) {
            console.error('Error uploading transcript:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Upload Transcript</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="border p-2 rounded"
                    accept=".srt"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-700"
                >
                    Upload
                </button>
            </form>
        </div>
    );
};

export default UploadTranscript;
