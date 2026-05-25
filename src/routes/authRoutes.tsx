import { Route } from 'react-router-dom'
import AuthChoice from '../pages/(auth)/AuthChoice'
import Register from '../pages/(auth)/register'
import Select from '../pages/(auth)/Select'
import Login from '@/pages/(auth)/login'
import ForgotPassword from '@/pages/(auth)/forgotPassword'
import RedefinirSenha from '@/pages/(auth)/redefinir-senha'
import CompletarCadastro from '@/pages/(auth)/completarCadastro'

export const authRoutes = (
  <>
    <Route path="/" element={<AuthChoice />} />
    <Route path="/register" element={<Register />} />
    <Route path="/select" element={<Select />} />
    <Route path= "/login" element={<Login />} />
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route path="/redefinir-senha" element={<RedefinirSenha />} />
    <Route path="/completar-cadastro" element={<CompletarCadastro />} />
  </>
)