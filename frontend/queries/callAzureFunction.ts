import { GenerateCourseRequest } from "@/types/GenerateCourseRequest";

export const callAzureFunctionAsync = async (requestBody: GenerateCourseRequest) => {
  try {
    if (!process.env.AZURE_FUNCTION_URL) {
      throw new Error("AZURE_FUNCTION_URL is not defined");
    }

    let azureFunctionResponse = await fetch(process.env.AZURE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: requestBody }),
    });

    if (!azureFunctionResponse.ok) {
      console.error("Azure Function Async Response (Not 200): ", azureFunctionResponse);
      throw new Error("Failed to generate course from Azure Function");
    }

    console.log("Azure Function Async Response: ", azureFunctionResponse);

    let responseJson: { result: any } = await azureFunctionResponse.json();
    responseJson.result = JSON.parse(responseJson.result);

    console.log(
      "Azure Function Async Response after getting the json: ",
      responseJson
    );
    return responseJson;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error occurred while calling Azure Function Async: ", error);
    throw new Error(
      `Error occurred while calling Azure Function Async: ${errorMessage}`
    );
  }
};


export const callAzureFunction = (requestBody: GenerateCourseRequest) => {
  try {
    if (!process.env.AZURE_FUNCTION_URL) {
      throw new Error("AZURE_FUNCTION_URL is not defined");
    }

    fetch(process.env.AZURE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: requestBody }),
    });

    console.log("Azure Function called successfully.");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error occurred while calling Azure Function: ", error);
    throw new Error(
      `Error occurred while calling Azure Function: ${errorMessage}`
    );
  }
};