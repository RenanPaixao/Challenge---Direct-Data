import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotFound } from './pages/NotFound.tsx'
import { SignUp } from './pages/SignUp.tsx'

/**
 * Creates a router for the application.
 */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={
          <SignUp />
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

