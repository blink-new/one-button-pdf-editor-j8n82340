import React, { useCallback, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Upload, FileText, Loader2 } from 'lucide-react';

interface PDFUploadProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
}

export const PDFUpload: React.FC<PDFUploadProps> = ({ onFileUpload, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            isDragOver
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isProcessing ? (
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-red-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">Processing PDF...</h3>
                <p className="text-muted-foreground">
                  Extracting text from your PDF file
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Upload Your PDF</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your PDF file here, or click to browse
                </p>
              </div>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="pdf-upload"
              />
              <label htmlFor="pdf-upload">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                >
                  <span className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose PDF File
                  </span>
                </Button>
              </label>
              <p className="text-sm text-muted-foreground">
                Supports PDF files up to 10MB
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};