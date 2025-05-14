import api from "./api";

export const registerUser = async ({ name, email, password }) => {
  try {
    const response = await api.post(
      "/auth/register",
      {
        nome: name,
        email: email,
        senha: password,
      },
      {}
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Erro ao registrar usuário.",
    };
  }
};

export const login = async ({ email, password }) => {
  const response = await api.post("/auth/login", {
    email,
    senha: password,
  });

  if (response.data) {
    localStorage.setItem("token", String(response.data.id));
    return {
      success: true,
      user: {
        id: response.data.id,
        name: response.data.nome,
        email: response.data.email,
        qntd_tokens: response.data.qntd_tokens,
      },
    };
  }

  return { success: false, message: "Credenciais inválidas" };
};

export const getInfo = async () => {
  const response = await api.post("/auth/user-info");

  return response.data;
};
