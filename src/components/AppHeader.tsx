import React from 'react';
import { FileText, Zap } from 'lucide-react';

export const AppHeader: React.FC = () => {
  return (
    <div className="text-center space-y-4 mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
          <FileText className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
          PDF Editor
        </h1>
        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
      </div>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        Upload, edit, and download your PDFs in seconds. Powered by advanced OCR technology for seamless text extraction and editing.
      </p>
      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>OCR Powered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Mobile Friendly</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>Real-time Preview</span>
        </div>
      </div>
    </div>
  );
};