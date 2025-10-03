let consultar = () => {
  const canalID = '2987035';
  const readApiKey = 'DR3CKV912GFROVC2';
  const url = `https://api.thingspeak.com/channels/${canalID}/feeds.json?api_key=${readApiKey}&results=8000`;

  const fechaInicio = new Date(document.getElementById('fechaInicio').value);
  const fechaFin = new Date(document.getElementById('fechaFin').value);
  fechaFin.setHours(23, 59, 59, 999); 

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Error al obtener datos');
      return response.json();
    })
    .then(data => {
      const tableBody = document.querySelector('#dataTable tbody');
      tableBody.innerHTML = '';

      data.feeds.forEach(feed => {
        const fecha = new Date(feed.created_at);
        if (fecha >= fechaInicio && fecha <= fechaFin) {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${feed.created_at}</td>
            <td>${feed.field1 || ''}</td>
            <td>${feed.field2 || ''}</td>
            <td>${feed.field3 || ''}</td>
            <td>${feed.field4 || ''}</td>
            <td>${feed.field5 || ''}</td>
            <td>${feed.field6 || ''}</td>
          `;
          tableBody.appendChild(row);
        }
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
};
