import api from "./api";

const register = async (name, email, password) => {
  const { data } = await api.post(
    "/auth/register",
    {
      name,
      email,
      password,
    }
  );

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
  }

  return data;
};

const login = async (email, password) => {
  const { data } = await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
  }

  return data;
};

const googleLogin = async (credential) => {
  const { data } = await api.post(
    "/auth/google",
    {
      credential,
    }
  );

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
  }

  return data;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

export default {
  register,
  login,
  googleLogin,
  logout,
  getCurrentUser,
};