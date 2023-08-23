let token = localStorage.getItem("token");

export const UserHeader = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
    source: "front",
  };