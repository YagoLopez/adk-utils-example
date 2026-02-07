import 'dotenv/config';
import { FunctionTool, LlmAgent } from '@google/adk';
import { z } from 'zod';
import { OllamaModel } from '@yagolopez/adk-utils';


const getWeather = new FunctionTool({
  name: 'get_weather',
  description: 'Retrieves the current weather report for a specified city.',
  parameters: z.object({
    city: z.string().describe('The name of the city for which to retrieve the weather report.'),
  }),
  execute: ({ city }) => {
    if (city.toLowerCase() === 'new york') {
      return {
        status: 'success',
        report:
          'The weather in New York is sunny with a temperature of 25 degrees Celsius (77 degrees Fahrenheit).',
      };
    } else {
      return {
        status: 'unavailable',
        report: `Weather information for '${city}' is not available.`,
      };
    }
  },
});

const getCurrentTime = new FunctionTool({
  name: 'get_current_time',
  description: 'Returns the current time in a specified city.',
  parameters: z.object({
    city: z.string().describe("The name of the city for which to retrieve the current time."),
  }),
  execute: ({ city }) => {
    let tz_identifier: string;
    if (city.toLowerCase() === 'new york' || city.toLowerCase() === 'manhattan') {
      tz_identifier = 'America/New_York';
    } else {
      return {
        status: 'error',
        error_message: `Sorry, I don't have timezone information for ${city}.`,
      };
    }

    const now = new Date();
    const report = `The current time in ${city} is ${now.toLocaleString('en-US', { timeZone: tz_identifier })}`;

    return { status: 'success', report: report };
  },
});

export const rootAgent = new LlmAgent({
  name: 'weather_time_agent',
  model: new OllamaModel('qwen3-coder-next:cloud', 'https://ollama.com'),
  // model: new OllamaModel('qwen3:0.6b', "http://localhost:11434"),
  description: 'Agent to answer questions about the time and weather in a city.',
  instruction: 'You are a helpful agent who can answer user questions about the time and weather in a city. If you can not find the answer just say that you do not know.',
  tools: [getWeather, getCurrentTime],
});
