import { FunctionTool, LlmAgent } from '@google/adk';
import { z } from 'zod';

/* Mock tool implementation */
const getCurrentTime = new FunctionTool({
  name: 'get_current_time',
  description: 'Returns the current time in a specified city.',
  parameters: z.object({
    city: z.string().describe("The name of the city for which to retrieve the current time."),
  }),
  execute: ({ city }) => {
    // Mock time response
    return { status: 'success', report: `The current time in ${city} is 12:00 PM` };
  },
});

const getWeatherTool = new FunctionTool({
  name: 'get_weather',
  description: 'Retrieves the current weather report for a specified city.',
  parameters: z.object({
    city: z.string().describe("The name of the city (e.g., \"New York\", \"London\", \"Tokyo\")"),
  }),
  execute: ({ city }) => {
    const weatherData: Record<string, string> = {
      'new york': 'sunny, 25°C',
      'london': 'cloudy, 15°C',
      'tokyo': 'rainy, 20°C',
    };
    const report = weatherData[city.toLowerCase()] || 'unknown weather';
    return { status: 'success', report: `The current weather in ${city} is ${report}` };
  },
});

const getCalculatorTool = new FunctionTool({
  name: 'calculator',
  description: 'Performs basic arithmetic operations.',
  parameters: z.object({
    expression: z.string().describe("The mathematical expression to evaluate (e.g., '10 + 5', '20 * 3'). Only supports basic arithmetic (+, -, *, /)."),
  }),
  execute: ({ expression }) => {
    try {
      // Basic validation to prevent arbitrary code execution
      if (!/^[\d\s+\-*/().]+$/.test(expression)) {
        return { status: 'error', error_message: 'Invalid characters in expression.' };
      }
      const result = eval(expression);
      return { status: 'success', report: `Result: ${result}` };
    } catch (error) {
      // Check if error is an instance of Error
      if (error instanceof Error) {
        return { status: 'error', error_message: `Calculation error: ${error.message}` };
      } else {
        // Fallback for non-Error objects
        return { status: 'error', error_message: 'Unknown calculation error.' };
      }
    }
  },
});

export const rootAgent = new LlmAgent({
  name: 'hello_time_agent',
  model: 'gemini-2.5-flash',
  description: 'Helpful assistant for time, weather, and calculations.',
  instruction: `You are a helpful assistant that tells the current time, weather in a city, and helps with calculations.
                Use the 'getCurrentTime', 'getWeatherTool', and 'calculator' tools for this purpose.`,
  tools: [getCurrentTime, getWeatherTool, getCalculatorTool],
});
