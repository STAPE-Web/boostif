import { BrowserRouter } from "react-router-dom"
import AppRouter from "@/components/AppRouter"
import Header from "@/components/Header"
import '@/index.css'
import Footer from "@/components/Footer"
import Modal from "@/components/Modal"
import Filter from "./components/Filter"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Modal />
      <Filter />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  )
}

export default App