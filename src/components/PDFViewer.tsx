import React from 'react';
import { FileText } from 'lucide-react';

interface PDFViewerProps {
  file: File | null;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  if (!file) {
    return (
      <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-lg">
        <div className="text-center text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-2" />
          <p>PDF preview will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-red-600" />
          <span className="font-medium">{file.name}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Size: {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
      
      <div className="bg-white shadow-sm border rounded-lg p-6 min-h-64">
        <div className="text-center text-muted-foreground">
          <FileText className="w-16 h-16 mx-auto mb-4 text-red-300" />
          <p className="text-lg font-medium mb-2">PDF Preview</p>
          <p className="text-sm">
            In a full implementation, the PDF would be rendered here using PDF.js
          </p>
        </div>
      </div>
    </div>
  );
};