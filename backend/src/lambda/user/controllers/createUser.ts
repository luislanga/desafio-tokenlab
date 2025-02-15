export const handler = async (event: any) => {
  try {
    const userId = event.request.userAttributes.sub;

    const user = {
      userId,
      name: "",
      createdAt: new Date().toISOString(),
    };

    //await createUserService(user); -> implement this

    return JSON.stringify({
      statusCode: 200,
      message: "user created (mock)",
    });
  } catch (error) {
    console.error(error)
    return JSON.stringify({
        statusCode: 500,
        message: "something went wrong",
        error
      });
  }
};
