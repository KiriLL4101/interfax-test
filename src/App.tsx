import { Route, Routes } from 'react-router-dom'

import { SearchPage } from './pages/SearchPage'
import { UserPage } from './pages/UserPage'
import { RepositoryInfoPage } from './pages/RepositoryInfoPage'

const App = () => {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/:login" element={<UserPage />} />
        <Route path="/:login/:shu" element={<RepositoryInfoPage />} />
      </Routes>
    </main>
  )
}

export default App
