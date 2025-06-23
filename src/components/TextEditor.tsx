import React from 'react';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';

interface TextEditorProps {
  text: string;
  onChange: (text: string) => void;
  originalText: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({ 
  text, 
  onChange, 
  originalText 
}) => {
  const hasChanges = text !== originalText;

  return (
    <div className="space-y-4">
      {hasChanges && (
        <Card className="p-3 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-800">
            ✏️ Text has been modified and will be saved to the new PDF
          </p>
        </Card>
      )}
      
      <Textarea
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Extracted text will appear here for editing..."
        className="min-h-96 resize-none font-mono text-sm leading-relaxed"
      />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Characters: {text.length}</span>
        <span>Lines: {text.split('\n').length}</span>
      </div>
    </div>
  );
};