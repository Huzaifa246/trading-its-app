export const savedDataString = localStorage.getItem("mySession");
export const savedDataProfile = JSON.parse(savedDataString);

// we can get these things like this in other files

// const fullName = savedDataProfile.data.fullName;
// const email = savedDataProfile.data.email;
// const totalBalance = savedDataProfile.data.totalbalance;
