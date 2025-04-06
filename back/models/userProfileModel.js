// src/models/userProfileModel.js

const buildUserProfile = (user, data) => {
    return {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      country: data.country,
      monthlyIncome: data.monthlyIncome,
      birthDate: data.birthDate,
      gender: data.gender,
      photoURL: user.photoURL || 'default-profile.png'
    };
  };
  
  module.exports = { buildUserProfile };
  