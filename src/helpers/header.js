let token = localStorage.getItem("token");

export const AdminHeader = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
    source: "front",
  };
  console.log(token, "AAA")