import { PDFEditor } from './components/PDFEditor'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto py-8">
        <PDFEditor />
      </div>
      <Toaster />
    </div>
  )
}

export default App