import React, { useState, useCallback } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Download, FileText, Loader2, Edit3 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { PDFUpload } from './PDFUpload';
import { PDFViewer } from './PDFViewer';
import { TextEditor } from './TextEditor';
import { AppHeader } from './AppHeader';
import { supabase } from '../lib/supabase';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PDFEditorProps {}

export const PDFEditor: React.FC<PDFEditorProps> = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfText, setPdfText] = useState<string>('');
  const [editedText, setEditedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = useCallback(async (file: File) => {
    setIsProcessing(true);
    try {
      setPdfFile(file);

      // 1. Upload the file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('pdfs')
        .upload(`${Date.now()}-${file.name}`, file);

      if (uploadError) {
        throw uploadError;
      }

      // 2. Invoke the Supabase Function
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'process-pdf',
        { body: { path: uploadData.path } }
      );

      if (functionError) {
        throw functionError;
      }

      const { text } = functionData;

      setPdfText(text);
      setEditedText(text);
      setIsEditing(true);

      toast({
        title: "PDF Processed Successfully",
        description: "Your PDF has been parsed and is ready for editing.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Processing PDF",
        description: "There was an error processing your PDF file.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  const handleSavePDF = useCallback(async () => {
    if (!pdfFile || !editedText) return;
    
    setIsProcessing(true);
    try {
      // Upload the edited text as a new file to Supabase Storage
      const { data: _data, error } = await supabase.storage
        .from('pdfs')
        .upload(`edited_${Date.now()}.txt`, new Blob([editedText], { type: 'text/plain' }));

      if (error) {
        throw error;
      }

      toast({
        title: "Text Saved to Supabase",
        description: "Your edited text has been saved to Supabase Storage.",
      });

      // For now, we'll still download a local text file as a placeholder for PDF generation
      const blob = new Blob([editedText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `edited_${pdfFile.name}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Local Text File Downloaded",
        description: "A local text file of your edits has been downloaded.",
      });

    } catch (error) {
      console.error(error);
      toast({
        title: "Error Saving Text",
        description: "There was an error saving your edited text.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [pdfFile, editedText, toast]);

  const handleReset = useCallback(() => {
    setPdfFile(null);
    setPdfText('');
    setEditedText('');
    setIsEditing(false);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <AppHeader />

      {!isEditing ? (
        <PDFUpload onFileUpload={handleFileUpload} isProcessing={isProcessing} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PDF Preview */}
          <Card className="h-fit">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Original PDF
                </h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleReset}
                  className="text-sm"
                >
                  Upload New PDF
                </Button>
              </div>
              <PDFViewer file={pdfFile} />
            </CardContent>
          </Card>

          {/* Text Editor */}
          <Card className="h-fit">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Edit Text
                </h3>
                <Button 
                  onClick={handleSavePDF}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                >
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Download className="w-4 h-4 mr-2" />
                  )}
                  Save PDF
                </Button>
              </div>
              <TextEditor 
                text={editedText}
                onChange={setEditedText}
                originalText={pdfText}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};