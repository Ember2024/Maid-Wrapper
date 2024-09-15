import * as maid from "maid-js";

export async function Login(client) {
  try {
    await client.login();
  } catch (error) {
    if (error.errorCode === "NETWORK_ERROR") {
      await Login(client);
    } else {
      console.error(error);
      throw error;
    }
  }
}