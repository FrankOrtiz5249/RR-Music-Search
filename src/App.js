import {Fragment, useEffect, useState, Suspense } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/Searchbar'
import { DataContext } from './context/DataContext'
import { BrowserRouter, Router, Route, Routes, Link} from 'react-router-dom'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { createResource as fetchData } from './helper'

function App() {
	let [search, setSearch] = useState('')
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState(null)

	const API_URL = 'https://itunes.apple.com/search?term='

	useEffect(() => {
		if(searchTerm) {
			setData(fetchData(searchTerm))
		}
	}, [searchTerm])
	
	const handleSearch = (e, term) => {
		e.preventDefault()
		setSearch(term)
	}

	const Home = (
        <div>
		
            <SearchBar handleSearch = {handleSearch}/>
                {message}
			<DataContext.Provider value={data}>
			<Suspense fallback={<h1>Loading...</h1>}>
                <Gallery />
			</Suspense>
			</DataContext.Provider>
        </div>
    )

	const renderGallery = () => {
		if(data) {
			return (
				<Suspense fallback={<Spinner />} >
					<Gallery />
				</Suspense>
			)
		}
	}
   
    
   
    return (
        <BrowserRouter>
            
            <Routes>
                <Route exact path="/" element={Home}/>
                <Route path="/artist/:id" element={<ArtistView/>}/>
                <Route path="/album/:id" element={<AlbumView/>}/>
				{renderGallery()}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
