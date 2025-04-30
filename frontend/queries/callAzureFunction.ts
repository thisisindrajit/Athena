import { GenerateCourseRequest } from "@/types/GenerateCourseRequest";

export const callAzureFunction = async (requestBody: GenerateCourseRequest) => {
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
        console.error("Azure Function Response: ", azureFunctionResponse);
        throw new Error("Failed to generate course from Azure Function");
      }
  
      console.log("Azure Function Response: ", azureFunctionResponse);
      
      let responseJson: { result: any } = await azureFunctionResponse.json();
      responseJson.result = JSON.parse(responseJson.result);
      
      console.log(
        "Azure Function Response after getting the json: ",
        responseJson
      );
      return responseJson;
}