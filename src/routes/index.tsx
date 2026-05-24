import { BrowserRouter, Routes } from 'react-router-dom'
import { authRoutes } from './authRoutes'
import { appRoutes } from './appRoutes'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {authRoutes}
        {appRoutes}
      </Routes>
    </BrowserRouter>
  )
}