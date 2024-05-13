const baseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:8080/api" : "/api";

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

  if (!firstName || !lastName || !email || !password || !phone) {
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

export const updateUserRFWScore = async (email, score, token) => {
  let updateUserRFWScoreUrl = `${baseUrl}/update_user_rfw`;

  try {
    const response = await fetch(updateUserRFWScoreUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        score,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to update your score");
    }
    return {
      success: true,
      message: "Managed to update your score",
    };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const updateUserIncomeAndExpenditure = async (email, token) => {
  let updateUserIncomeAndExpenditureUrl = `${baseUrl}/update_user_income_and_expenditure`;

  try {
    const response = await fetch(updateUserIncomeAndExpenditureUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Failed to update your income and expenditure"
      );
    }
    const convertedData = JSON.parse(data.data_set).map((item) => ({
      ...item,
      Income: parseFloat(item.Income),
      Expenditure: parseFloat(item.Expenditure),
    }));
    return {
      success: true,
      message: "Managed to update your income and expenditure",
      data: convertedData,
    };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const updateUserDCloud = async (email, token) => {
  let updateUserDCloudUrl = `${baseUrl}/update_user_d_cloud`;

  try {
    const response = await fetch(updateUserDCloudUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.error || "Failed to update your income and expenditure"
      );
    }

    return {
      success: true,
      message: "Managed to update your income and expenditure",
      cluster: data.cluster,
      image: `data:image/jpeg;base64,${data.image}`,
    };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const linkToBankAccount=async(email)=>{
  let linkToBankAccountUrl = `${baseUrl}/link_to_bank`;
  try {
    const response = await fetch(linkToBankAccountUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Failed to link to bank account"
      );
    }

    return {
      success: true,
      message: "Auth link returned",
      data: data.link,
    };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
}

export const getUserRFWScore=async(email,token)=>{
  let getUserRFWScoreUrl = `${baseUrl}/get_user_rfw_score`;
  try {
    const response = await fetch(getUserRFWScoreUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        token
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Failed to get rfw score"
      );
    }

    return {
      success: true,
      message: "Managed to get rfw score",
      data: data.score,
    };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
}


