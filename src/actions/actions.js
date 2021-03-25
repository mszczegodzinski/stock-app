export const testAction = () => {
  const key = process.env.REACT_APP_KEY
  console.log('test action')
  fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=${key}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
  })
    .then(resp => {
      console.log(resp)
      return resp.json()
    })
    .then(data => {
      console.log('data ', data)
    })
    .catch(err => {
      console.log(err)
    })
}