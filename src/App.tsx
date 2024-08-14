import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TranscriptViewer from './components/TranscriptViewer';
import UploadTranscript from './components/UploadTranscript';
import TranscriptList from './components/TranscriptList';
import Navbar from './components/Navbar';
import { TaggingProvider } from './components/TaggingContext';

const App: React.FC = () => {
  return (
    <TaggingProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<UploadTranscript />} />
              <Route path="/transcripts" element={<TranscriptList />} />
              <Route path="/transcripts/:id" element={<TranscriptViewer />} />
            </Routes>
          </div>
        </div>
      </Router>
    </TaggingProvider>
  );
};

export default App;
