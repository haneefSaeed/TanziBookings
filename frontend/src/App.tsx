import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'

function App() {

  return (
   <Router>
      <Routes>
        <Route path="/" element={<Layout>
          <h1>Homepage</h1>
        </Layout>} />
        <Route path="/search" element={<Layout><p>Search Page</p></Layout>} />
        <Route path="/register" element={<Layout><Register/></Layout>}/>
        <Route path="/login" element={<Layout><SignIn/></Layout>}/>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
   </Router>
  )
}

export default App
