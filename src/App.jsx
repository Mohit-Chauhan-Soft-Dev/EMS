import { useState } from 'react'
import './App.css'
import ListEmployees from './components/ListEmployees'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Employee from './components/Employee'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Header />
        <Routes>

          {/* For url => http://localhost:4040/ */}
          <Route path="/" element={<ListEmployees />} />
            
          {/* For url =>  http://localhost:4040/employees */}
          <Route path="/employees" element={<ListEmployees />} />

          {/* For url =>  http://localhost:4040/add-employee */}
          <Route path="/add-employee" element={<Employee />} />

          {/* For url =>  http://localhost:4040/update-employee/{id} */}
          <Route path="/update-employee/:id" element={<Employee />} />

        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
