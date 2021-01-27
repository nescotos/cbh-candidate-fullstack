import { useState } from 'react';

export const Search = ({onChange}) => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
  <section className="h-50 p-8">
      <div className="container mx-auto py-8">
        <input className="w-full h-16 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg" type="search" placeholder="Search..." onChange={(e) => { setSearchTerm(e.target.value) }}/>
      </div>
      <nav className="flex">
          <button className="no-underline text-black py-3 px-4 font-medium ml-auto bg-blue-500" onClick={() => { onChange(searchTerm) }}>Search</button>
      </nav>
    </section>
  )
}