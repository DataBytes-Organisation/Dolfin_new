const baseUrl =
  process.env.REACT_APP_USER_SERVER_API_URL || "http://localhost:5000";

export const createNewUser = async (formData) => {
  let firstName = formData.get("firstName")?.trim() ?? "";
  let lastName = formData.get("lastName")?.trim() ?? "";
  let email = formData.get("email")?.trim() ?? null;
  let phone = formData.get("phone")?.trim() ?? "";
  let password = formData.get("password")?.trim() ?? "";
  let confirmPassword = formData.get("confirmPassword")?.trim() ?? "";

  if (confirmPassword !== password) {
    return {
      success: false,
      message: "The passwords entered must be consistent.",
    };
  }

  if (!firstName || !lastName || !email || !password||!phone) {
    return { success: false, message: "Please complete all information." };
  }
  let apiUrl = `${baseUrl}/create_new_user`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return { success: true, message: "Welcome to DevHub!", data };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const loginWithEmail = async (formData) => {
  let email = formData.get("email")?.trim() ?? null;
  let password = formData.get("password")?.trim() ?? "";

  if (!email || !password) {
    return { success: false, message: "Please enter both email and password." };
  }

  let loginUrl = `${baseUrl}/login_with_email`;

  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Login failed. Please check your credentials."
      );
    }
    return {
      success: true,
      message: "Login successful. Welcome back!",
      data: data.user_data,
    };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};


