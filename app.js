document.getElementById('serviceRequestForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtener los valores del formulario
  const serviceRequestData = {
    patient_id: document.getElementById('patientId').value,
    patient_name: document.getElementById('patientName').value,
    patient_birth_date: document.getElementById('patientBirthDate').value,
    patient_gender: document.getElementById('patientGender').value,
    requester: document.getElementById('requester').value,
    procedure_code: document.getElementById('procedureCode').value,
    procedure_description: document.getElementById('procedureDescription').value,
    request_date: document.getElementById('requestDate').value,
    priority: document.getElementById('priority').value
  };

  console.log('Datos a enviar:', serviceRequestData);

  // Enviar la solicitud al backend
  fetch('https://hl7-fhir-ehr-solangie-9665.onrender.com/service-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serviceRequestData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
    document.getElementById('result').innerText = '¡Solicitud creada exitosamente! ID: ' + data._id;
    document.getElementById('serviceRequestForm').reset();
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('result').innerText = 'Error al crear la solicitud: ' + error.message;
  });
});

