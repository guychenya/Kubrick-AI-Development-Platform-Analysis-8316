class OllamaService {
  constructor() {
    this.baseUrl = 'http://localhost:11434';
    this.model = 'llama3.1:latest'; // Default model
  }

  async checkConnection() {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      return response.ok;
    } catch (error) {
      console.error('Ollama connection failed:', error);
      return false;
    }
  }

  async getAvailableModels() {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      const data = await response.json();
      return data.models || [];
    } catch (error) {
      console.error('Failed to fetch models:', error);
      return [];
    }
  }

  async generateComponent(prompt, options = {}) {
    const systemPrompt = `You are an expert React developer and UI/UX designer. Generate a complete, functional React component based on the user's description. 

Requirements:
- Use React with JSX syntax
- Use Tailwind CSS for styling
- Use react-icons for icons (import from react-icons/fi)
- Make components responsive and accessible
- Include proper PropTypes or TypeScript if specified
- Follow modern React best practices
- Create visually appealing, professional designs
- Use gradients, shadows, and modern UI patterns
- Ensure components are production-ready

Return ONLY the complete component code without any explanations or markdown formatting.`;

    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: options.model || this.model,
          prompt: `${systemPrompt}\n\nUser Request: ${prompt}`,
          stream: false,
          options: {
            temperature: options.temperature || 0.7,
            top_p: options.top_p || 0.9,
            max_tokens: options.max_tokens || 2000,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this.extractComponentCode(data.response);
    } catch (error) {
      console.error('Component generation failed:', error);
      throw new Error('Failed to generate component. Please check your Ollama connection.');
    }
  }

  async generateStyles(componentCode, styleRequirements) {
    const prompt = `Given this React component code, enhance the styling based on these requirements: ${styleRequirements}

Component Code:
${componentCode}

Return ONLY the updated component code with improved Tailwind CSS styling.`;

    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          prompt,
          stream: false,
          options: {
            temperature: 0.5,
            max_tokens: 2000,
          }
        })
      });

      const data = await response.json();
      return this.extractComponentCode(data.response);
    } catch (error) {
      console.error('Style generation failed:', error);
      throw error;
    }
  }

  extractComponentCode(response) {
    // Extract React component code from AI response
    const codeMatch = response.match(/```(?:jsx?|javascript|react)?\n?([\s\S]*?)```/);
    if (codeMatch) {
      return codeMatch[1].trim();
    }

    // If no code blocks found, try to extract component directly
    const componentMatch = response.match(/(?:import.*?from.*?;?\n)*(?:const|function)\s+\w+.*?(?:export\s+default\s+\w+;?)/s);
    if (componentMatch) {
      return componentMatch[0].trim();
    }

    // Return the full response if no specific pattern found
    return response.trim();
  }

  async streamGenerate(prompt, onChunk, options = {}) {
    const systemPrompt = `You are an expert React developer. Generate a complete React component based on the description. Use React, Tailwind CSS, and react-icons/fi. Return only the component code.`;

    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: options.model || this.model,
          prompt: `${systemPrompt}\n\nUser Request: ${prompt}`,
          stream: true,
          options: {
            temperature: options.temperature || 0.7,
          }
        })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim()) {
            try {
              const data = JSON.parse(line);
              if (data.response) {
                onChunk(data.response);
              }
            } catch (e) {
              // Skip invalid JSON lines
            }
          }
        }
      }
    } catch (error) {
      console.error('Streaming generation failed:', error);
      throw error;
    }
  }
}

export default new OllamaService();