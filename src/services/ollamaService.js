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
    const technology = options.technology || 'react';
    
    let systemPrompt = `You are an expert frontend developer and UI/UX designer. Generate a complete, functional component based on the user's description using ${technology}.`;
    
    // Technology-specific instructions
    if (technology === 'react') {
      systemPrompt += `
Requirements:
- Use React with JSX syntax
- Use Tailwind CSS for styling
- Use react-icons for icons (import from react-icons/fi)
- Make components responsive and accessible
- Include proper PropTypes or TypeScript if specified
- Follow modern React best practices
- Create visually appealing, professional designs
- Use gradients, shadows, and modern UI patterns
- Ensure components are production-ready`;
    } else if (technology === 'vue') {
      systemPrompt += `
Requirements:
- Use Vue 3 with <script setup> syntax
- Use Tailwind CSS for styling
- Use vue-feather-icons for icons
- Make components responsive and accessible
- Follow Vue 3 composition API best practices
- Create visually appealing, professional designs
- Use gradients, shadows, and modern UI patterns
- Ensure components are production-ready`;
    } else if (technology === 'svelte') {
      systemPrompt += `
Requirements:
- Use Svelte 3 syntax
- Use Tailwind CSS for styling
- Use svelte-feather-icons for icons
- Make components responsive and accessible
- Follow Svelte best practices with reactive declarations
- Create visually appealing, professional designs
- Use gradients, shadows, and modern UI patterns
- Ensure components are production-ready`;
    } else if (technology === 'angular') {
      systemPrompt += `
Requirements:
- Use Angular 15+ with TypeScript
- Use Tailwind CSS for styling
- Use angular-feather for icons
- Make components responsive and accessible
- Follow Angular best practices with services and modules
- Create visually appealing, professional designs
- Use gradients, shadows, and modern UI patterns
- Ensure components are production-ready`;
    } else if (technology === 'html') {
      systemPrompt += `
Requirements:
- Use modern HTML5, CSS3, and vanilla JavaScript
- Use Tailwind CSS for styling
- Use Feather icons (with CDN)
- Make pages responsive and accessible
- Follow modern web development best practices
- Create visually appealing, professional designs
- Use gradients, shadows, and modern UI patterns
- Ensure code is production-ready`;
    }
    
    systemPrompt += `\nReturn ONLY the complete component code without any explanations or markdown formatting.`;

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
    const prompt = `Given this component code, enhance the styling based on these requirements: ${styleRequirements}

Component Code:
${componentCode}

Return ONLY the updated component code with improved styling.`;

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
    // Extract code from AI response
    const codeMatch = response.match(/```(?:jsx?|javascript|react|vue|svelte|ts|typescript|html|css)?\n?([\s\S]*?)```/);
    if (codeMatch) {
      return codeMatch[1].trim();
    }

    // Try to extract component directly based on various technology patterns
    const componentMatches = [
      // React/JSX
      response.match(/(?:import.*?from.*?;?\n)*(?:const|function)\s+\w+.*?(?:export\s+default\s+\w+;?)/s),
      // Vue
      response.match(/(?:<template>[\s\S]*<\/template>)[\s\S]*?(?:<script[\s\S]*?<\/script>)[\s\S]*?(?:<style[\s\S]*?<\/style>)?/s),
      // Svelte
      response.match(/(?:<script[\s\S]*?<\/script>)?[\s\S]*?(?:<style[\s\S]*?<\/style>)?/s),
      // Angular - Fixed the regex pattern
      response.match(/(?:import.*?from.*?;?\n)*(?:@Component\(\{[\s\S]*?\}\)[\s\S]*?export\s+class\s+\w+)/s),
      // HTML
      response.match(/(?:<!DOCTYPE html>)?[\s\S]*?<html[\s\S]*?<\/html>/s)
    ];

    for (const match of componentMatches) {
      if (match) {
        return match[0].trim();
      }
    }

    // Return the full response if no specific pattern found
    return response.trim();
  }

  async streamGenerate(prompt, onChunk, options = {}) {
    const technology = options.technology || 'react';
    
    let systemPrompt = `You are an expert frontend developer. Generate a complete ${technology} component based on the description.`;
    
    // Add technology-specific context
    if (technology === 'react') {
      systemPrompt += ` Use React, Tailwind CSS, and react-icons/fi.`;
    } else if (technology === 'vue') {
      systemPrompt += ` Use Vue 3, Tailwind CSS, and vue-feather-icons.`;
    } else if (technology === 'svelte') {
      systemPrompt += ` Use Svelte, Tailwind CSS, and svelte-feather-icons.`;
    } else if (technology === 'angular') {
      systemPrompt += ` Use Angular, Tailwind CSS, and angular-feather.`;
    } else if (technology === 'html') {
      systemPrompt += ` Use HTML, CSS, vanilla JavaScript, and Feather icons CDN.`;
    }
    
    systemPrompt += ` Return only the component code.`;

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

  getLanguageFromTechnology(technology) {
    const mapping = {
      'react': 'jsx',
      'vue': 'vue',
      'svelte': 'svelte',
      'angular': 'typescript',
      'html': 'html'
    };
    return mapping[technology] || 'jsx';
  }
}

export default new OllamaService();