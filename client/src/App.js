import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';



function App() {
  useEffect(() => {

    axios.get('http://127.0.0.1:5000/get_location_names').then((res) => {
      setAllLocation(res.data.locations)
    })
      .catch((err) => {
        console.log(err);
      })

  }, [])


  const [allLocation, setAllLocation] = useState("")
  const [location, setLocation] = useState("")
  const [bath, setBath] = useState(1)
  const [bed, setBed] = useState(1)
  const [sqft, setSqft] = useState("")
  const [est_val, setEst_val] = useState(0)

  const handleBath = (e) => {
    e.preventDefault()
    setBath(e.target.value)
  }

  const handleBed = (e) => {
    e.preventDefault()
    setBed(e.target.value)
  }

  const handleLocation = (e) => {
    e.preventDefault()
    setLocation(e.target.value)
  }


  const handleSqft = (e) => {
    e.preventDefault()
    setSqft(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (sqft == null || sqft < 500) {
      alert('Value Must not be Null or less than 500')
      return
    }
    const data = {
      "location": location,
      "bhk": bed,
      "bath": bath,
      "total_sqft": sqft
    }

    axios.post('http://127.0.0.1:5000/predict_price', data)
      .then((res) => {
        setEst_val(res.data.estimates_price * sqft)

      })
      .catch((err) => {
        console.log(err);
      })

  }

  if (allLocation) {
    return (
      <div className="App">
        <div className='container'>
          <div className='row justify-content-center'>
            <form className='col-md-6'>

              <div className='form-group mt-5 mb-5'>

                <h1 className='text'>Banglore House Price Calculator</h1>

              </div>
              <div className="form-group mb-4">
                <label htmlFor="sqft">Enter the Squre Feet</label>
                <input type="number" className="form-control" id="sqft" placeholder='Enter Squre Feet' value={sqft} onChange={handleSqft} />

              </div>
              <div className="form-group mb-4">
                <label htmlFor="bath">Select Number of Bathrooms</label>
                <select className="form-control" id="bath" value={bath} onChange={handleBath}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>

              <div className="form-group mb-4">
                <label htmlFor="bedRoom">Select Number of Bedroom</label>
                <select className="form-control" id="bedroom" value={bed} onChange={handleBed}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="location">Select Location</label>
                <select className="form-control" id="location" value={location} onChange={handleLocation}>
                  {
                    allLocation.map(elm => {

                      return (
                        <option key={elm}>{elm}</option>
                      )
                    })
                  }


                </select>
              </div>

              <div className='form-group mt-3'>
                <button className='btn btn-success form-control' onClick={onSubmit}>Generate Price</button>
              </div>
            </form>

            <div className='form-group mt-4'>
              <h4 className='text'>Estimated Price : <span className='result'>{est_val}</span>/- </h4>

            </div>
          </div>

        </div>

      </div>
    );
  }
  else {
    return (
      <h1>Loading</h1>
    )
  }


}

export default App;
