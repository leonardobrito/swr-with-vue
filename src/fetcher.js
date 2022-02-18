const fetcher = function(url){
  return fetch(url).then(response => {
    console.log('fetching ...');
    return response.json();
  })
}

export default fetcher
