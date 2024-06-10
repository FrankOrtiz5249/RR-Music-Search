// Gallery.js
import { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import GalleryItem from './GalleryItem'

function Gallery(){
    const data = data.result.read()
    
    const display = data.map((item,index) => {
        return (
            <GalleryItem item={item} key={index} />
        )
    })
    return (
        <div style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column'}}>
            {display}
        </div>
    )
}

export default Gallery