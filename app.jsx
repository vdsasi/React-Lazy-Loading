import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import LazyLoad from 'react-lazyload';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Replace with your own API fetch code
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {data && data.map((x) => (
        <LazyLoad once key={x.id}>
          <div>{x.userId}</div>
          <div>{x.id}</div>
          <div>{x.title}</div>
          <div>{x.body}</div>
          {loading ? (
            <Skeleton variant="rect" width={600} height={600} />
          ) : (
            <LazyLoadImage
              src={x.url}
              alt={x.title}
              onLoad={() => setImageLoaded(true)}
              beforeLoad={() => setImageLoaded(false)}
            />
          )}
          {!imageLoaded && (
            <Skeleton variant="rect" width={600} height={600} />
          )}
        </LazyLoad>
      ))}
    </div>
  );
}

export default App;