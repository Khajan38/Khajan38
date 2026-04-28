import { Routes, Route } from 'react-router-dom'
import { Header, Footer } from './components/HeaderFooter'
import axios from 'axios'
import Home from './components/Home'
import Technical_Profiles from './components/Technical_Profiles'
import Projects from './components/Projects' 
import Personal from './components/Personal'
import Loading_Screen from './components/Loading_Screen'
import { useEffect } from 'react'
const BASE_URI = import.meta.env.VITE_APP_API_BASE_URL;

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(BASE_URI);
        console.log(res.data);
      } catch (err) {console.error(err);}
    }; fetchData();
  }, []);

  return (<div id="app">
    <Loading_Screen />
    <Header />
    <main className="flex-1 flex flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles" element={<Technical_Profiles />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </main>
    <Footer />
  </div>)
}

export default App