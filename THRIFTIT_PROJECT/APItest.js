fetch('http://localhost:4000/api/order/PcaMiTssMyvr7DqxKyKM')
  .then(response => {
    console.log(response)
    return response.json();
})
  .then(data => {
    console.log(data); // Do something with the data
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });