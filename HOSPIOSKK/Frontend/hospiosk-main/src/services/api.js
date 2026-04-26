const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ---------- PATIENT ----------
export const getPatientByAadhaar = async (aadhaar) => {
  const res = await fetch(`${BASE_URL}/patients/aadhaar/${aadhaar}`);
  if (!res.ok) throw new Error("Patient not found");
  return res.json();
};

// ---------- APPOINTMENT ----------
export const bookAppointment = async (data) => {
  const res = await fetch(`${BASE_URL}/appointments/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const makePayment = async (appointmentId) => {
  const res = await fetch(
    `${BASE_URL}/appointments/payment/${appointmentId}`,
    { method: "PUT" }
  );
  return res.json();
};

// ---------- RECEIPT ----------
export const getReceipt = async (appointmentId) => {
  const res = await fetch(`${BASE_URL}/appointments/receipt/${appointmentId}`);
  return res.json();
};

export const printReceipt = async (appointmentId) => {
  const res = await fetch(`${BASE_URL}/appointments/print/${appointmentId}`, {
    method: "POST",
  });
  return res.json();
};

export const getDoctors = async () => {
  const res = await fetch(`${BASE_URL}/doctors/all`);
  return res.json();
};

