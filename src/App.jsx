import { useEffect, useState,useRef } from 'react'

import './App.css'
import axios from 'axios'
import CountryCard from './components/CountryCard'


function App() {
  const [data, setData] = useState(null)
  const [allData,setAllData] = useState(null)

  const [url,setUrl]= useState("https://restcountries.com/v3.1/all")

  useEffect(()=>{
    axios.get(url)
      .then(res=>{
        setData(res.data)
        setAllData(res.data)  //Guardamos los datos originales
      }) 
      .catch(err=>{
        console.log(err);
      })
  },[url])
  
  console.log(data);

  const inputCountry = useRef()
  const inputRegion = useRef()
  const inputLang = useRef()

  if(!data){
    return <h1>Cargando</h1>
  }

  const buscarPais=(e)=>{
    e.preventDefault();
    if(inputCountry.current.value==""){
      setData(allData)
    }else{
      const filteredData = allData.filter(country=>
        country.name.common.toLowerCase().includes(inputCountry.current.value.toLowerCase()))
      setData(filteredData)
    }
    console.log(inputCountry.current.value);
  }
  
  //Funcion para filtrar por region
  const filtrarRegion=(e)=>{
    e.preventDefault();
    const region= inputRegion.current.value;
    if(region){
      const filteredData = allData.filter(country=>country.region.toLowerCase()===region.toLowerCase())
      setData(filteredData)
    }else{
      setData(allData)
    }
  }

  //Funcion para filtrar por idioma
  const filtrarLanguage=()=>{
    const language=inputLang.current.value

    if(language){
      axios.get(`https://restcountries.com/v3.1/lang/${language}`)
      .then(res=>{
        setData(res.data)
      })
      .catch(err=>{
        console.log(err);
        alert("Error para obtener los paises del idioma asignado")
      })
    }else{
      setData(allData)
    }


  }

  return (
    <div className='container'>
      <div className='filterBar'>
        {/* Filtrado por nombre  */}
        
        <form onSubmit={buscarPais}>
        <h3>Filtrado por Pais</h3>
          <input ref={inputCountry} id="inputCountry" placeholder="Ingresa el Pais" type="text"/>
          <button>Search</button>
        </form>
        
        {/* Filtrado por data */}
        
        <form onSubmit={filtrarRegion}>
        <h3>Filtrado por Region</h3>
          <input ref={inputRegion} id="inputRegion" placeholder="Ingresa la Region" type="text"/>
          <button>Search</button>
        </form>

        {/* Filtrado de idioma*/}
        <article>
        <h3>Filtrado por Idioma</h3>
        <select style={{height:"40px"}} onChange={filtrarLanguage} ref={inputLang} id="inputLang">
          <option value="">Selecciona una opcion</option>
          <option value="spanish">Spanish</option>
          <option value="english">English</option>
        </select>
        </article>
      </div>

      {
        data?.map((item,index)=>(
          <CountryCard
          key={index}
          item={item}
          />
        ))
      }

       
    </div>
  )
}

export default App
