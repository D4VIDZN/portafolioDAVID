async function obtenerDatosFiltrados() {
  const apiKey = "DR3CKV912GFROVC2";
  const channelID = "2987035";
  const results = 8000;
  const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${apiKey}&results=${results}`;

  const fechaInicio = new Date(document.getElementById('fechaInicio').value);
  const fechaFin = new Date(document.getElementById('fechaFin').value);
  fechaFin.setHours(23, 59, 59, 999); 

  try {
    const res = await fetch(url);
    const data = await res.json();
    const feeds = data.feeds;

    if (!feeds || feeds.length === 0) {
      alert("No hay datos disponibles.");
      return [];
    }

    const datosFiltrados = feeds
      .map(item => ({
        Fecha: item.created_at,
        Temperatura: item.field1,
        Humedad: item.field2,
        Humedad_Suelo: item.field3,
        Lluvia: item.field4,
        Nivel_Agua: item.field5,
        Luz_Ambiental: item.field6
      }))
      .filter(item => {
        const fechaItem = new Date(item.Fecha);
        return fechaItem >= fechaInicio && fechaItem <= fechaFin;
      });

    return datosFiltrados;
  } catch (error) {
    alert("Error al obtener los datos.");
    console.error(error);
    return [];
  }
}

async function descargarExcel() {
  const datos = await obtenerDatosFiltrados();

  if (datos.length === 0) {
    alert("No hay datos para las fechas seleccionadas.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(datos);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

  XLSX.writeFile(workbook, 'DatosFiltrados.xlsx');
}

async function descargarPDF() {
  const datos = await obtenerDatosFiltrados();

  if (datos.length === 0) {
    alert("No hay datos para las fechas seleccionadas.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const columnas = [
    "Fecha", "Temperatura", "Humedad", "Humedad Suelo", "Lluvia", "Nivel Agua", "Luz Ambiental"
  ];
  const filas = datos.map(dato => [
    dato.Fecha,
    dato.Temperatura || "",
    dato.Humedad || "",
    dato.Humedad_Suelo || "",
    dato.Lluvia || "",
    dato.Nivel_Agua || "",
    dato.Luz_Ambiental || ""
  ]);

  doc.text("Datos de los sensores", 14, 15);
  doc.autoTable({
    startY: 20,
    head: [columnas],
    body: filas,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [22, 160, 133] }
  });

  doc.save('DatosSensorespai.pdf');
}



