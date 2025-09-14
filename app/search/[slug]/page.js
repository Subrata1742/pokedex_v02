
"use client";
import { usePokemon } from '@/context/pokemonProvider';
import Link from 'next/link';
import React from 'react';
import FavoritesButton from '../../component/FavoritesButton';
import Image from 'next/image';

export default function Page({ params }) {
    const { slug } = React.use(params);
    const { pokemon } = usePokemon();

    return (
        <><div className="w-full max-w-full mx-auto">
            <div className="grid grid-cols-6  gap-4 p-4 mx-10">
            {pokemon.filter((p) => p.name.startsWith(slug)).map((p) => (<div key={p.name}>

<Link className=' items-center'  href={`/${p.name}`}>
                    {/* <img src={p.image} alt={p.name} /> */}
                    
                    <Image src={p.image ? p.image : '/placeholder.png'} alt={p.name} width={250} height={250}  quality={100} priority/>
                        <div className=" capitalize font-bold text-center border rounded py-2 bg-white shadow mx-auto  hover:scale-105 transition-transform">
                            {p.name}
                            
                        </div>
                   
                    </Link>
                  <FavoritesButton name={p.name} image={p.image} order={p.order} />
                </div>
            ))}</div>
        </div>
        </>
    );
}