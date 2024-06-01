import {Fragment, useEffect, useState } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/Searchbar'
import { DataContext } from './context/DataContext'
import { BrowserRouter, Router, Route, Routes, Link} from 'react-router-dom'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App() {
	let [search, setSearch] = useState('')
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState([])

	const API_URL = 'https://itunes.apple.com/search?term='

	useEffect(() => {
		if(search) {
			const fetchData = async () => {
				document.title = `${search} Music`
				const response = await fetch(API_URL + search)
				const resData = await response.json()
				if (resData.results.length > 0) {
					setData(resData.results)
				} else {
					setMessage('Not Found')
				}
			}
			fetchData()
		}
	}, [search])
	
	const handleSearch = (e, term) => {
		e.preventDefault()
		setSearch(term)
	}

	const Home = (
        <div>
		
            <SearchBar handleSearch = {handleSearch}/>
                {message}
			<DataContext.Provider value={data}>
                <Gallery />
			</DataContext.Provider>
        </div>
    )
   
    
   
    return (
        <BrowserRouter>
            
            <Routes>
                <Route exact path="/" element={Home}/>
                <Route path="/artist/:id" element={<ArtistView/>}/>
                <Route path="/album/:id" element={<AlbumView/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
