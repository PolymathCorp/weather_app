import { useState, useEffect} from 'react'

const SearchBar = () => {
    const[city, setCity] = useState("")

    const handlesubmit = (e) => {
        e.preventDefault()

        let errors = ""

        if(!city){
            errors = "Please input a city"
        }
        console.log(submitted)
    }
  return (
    <div className='bg-blue-900 image-'>
        <form action="" onChange={handlesubmit} className='p-9 '>
            <h1 className='m-16 p-6 font-extrabold font-sans'>Weather App</h1>
      <input className='rounded-lg border my-6 mx-6' type="text"
      value={city}
      name='city'
      onChange={(e) => setCity(e.target.value)}
      placeholder='Enter the city name.....' />
      </form>
    </div>
  )
}

export default SearchBar
