import { Route, Routes } from 'react-router-dom'

import { SearchPage } from './pages/SearchPage'
import UserPage from './pages/UserPage/UserPage'

const App = () => {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/:login" element={<UserPage />} />
        <Route path="/:login/:shu" element={<h1>123</h1>} />
      </Routes>
    </main>
  )
}

export default App
