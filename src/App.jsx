import React, { useState } from 'react'
import HomePage from './pages/HomePage'
import AssessmentPage from './pages/AssessmentPage'
import ResultsPage from './pages/ResultsPage'

function App() {
  const [page, setPage] = useState('home')
  const [results, setResults] = useState(null)

  return (
    <>
      {page === 'home' && <HomePage onStart={() => setPage('assessment')} />}
      {page === 'assessment' && (
        <AssessmentPage onFinish={(r) => { setResults(r); setPage('results') }} />
      )}
      {page === 'results' && (
        <ResultsPage results={results} onRestart={() => setPage('home')} />
      )}
    </>
  )
}

export default App
