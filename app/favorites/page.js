"use client"
import Link from 'next/link'
import React, { use } from 'react'
import { useState,useEffect } from 'react'
import FavoriteButton from '../component/FavoritesButton'
import Image from 'next/image'
const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/data');
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    fetchFavorites();
  }, []);
  return (
    <div className='w-full max-w-full mx-auto text-center'>
        <h1 className="text-2xl font-bold mb-4 text-center">Favorites Page</h1>
      <Link href="/"><button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Add Favorite</button></Link>
    {favorites.length === 0 ? (
      <p className="mt-4">No favorites added yet.</p>
    ) : (
      <div className="grid grid-cols-6  gap-4 p-4 mx-10">
        {favorites.map((p) => (
          <div key={p.name}>

                    <Link className=' items-center'  href={`/${p.name}`}>
                    {/* <img src={p.image} alt={p.name} /> */}
                    
                    <Image src={p.image ? p.image : '/placeholder.png'} alt={p.name} width={250} height={250}  quality={100} priority/>
                        <div className=" capitalize font-bold text-center border rounded py-2 bg-white shadow mx-auto  hover:scale-105 transition-transform">
                            {p.name}
                            
                        </div>
                   
                    </Link>
                   <FavoriteButton name={p.name} image={p.image} order={p.order} />
                </div>
        ))}
      </div>
    )}
    </div>
  )
}  

export default FavoritesPage