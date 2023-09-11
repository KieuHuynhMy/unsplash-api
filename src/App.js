import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [images, setImages] = useState();
  const [term, setTerm] = useState();

  useEffect(() => {
    async function getData() {
      const res = await axios.get('https://api.unsplash.com/photos/', {
        headers: {
          Authorization: 'Client-ID wMWLF5O4p34NG6smB7KCRm2Umdl7eUz9cQtTeDpHrLM'
        }
      })
      setImages(res.data)
    }
    getData();
  }, [])

  const displayImages = async (term) => {
    const res = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query: term },
      headers: {
        Authorization: 'Client-ID wMWLF5O4p34NG6smB7KCRm2Umdl7eUz9cQtTeDpHrLM'
      }
    })
    setImages(res.data.results)
  }

  return (
    <>
      <h1 className="ui header container centered" style={{ margin: '5rem 0 3rem' }}>Find pictures with Unsplash API</h1>
      <div className="ui grid container">
        <div className="two column row">
          <div className="column centered">
            <div className="ui raised very container segment">
              <label>Enter anything</label>
              <div className="ui icon input fluid">
                <input type="text" placeholder="Search..." onChange={(e) => setTerm(e.target.value)} />
                {/* <i className="search icon"></i> */}
                <button class="ui primary button" onClick={() => displayImages(term)}>Find</button>
              </div>
            </div>
          </div>
        </div>

        <div className="four column row" >
          {images && images.map((image, i) => (
            <div className="column" key={i} style={{ marginTop: "10px" }}>
              <div className="ui fluid card">
                <div className="image">
                  <img src={image.urls.raw} />
                </div>
                <div className="content">
                  <div className="description">
                    {image.alt_description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="centered" style={{ backgroundColor: "#2185D0", marginTop: "100px" }}>
        <div className="ui header container centered" style={{ padding: "10px 0", color: "#fff" }}>Made by Huynh My Kieu</div>
      </footer>
    </>
  );
}

export default App;
