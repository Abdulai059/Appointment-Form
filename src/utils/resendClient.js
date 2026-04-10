import { Resend } from "resend";

// Custom Resend client that uses proxy to avoid CORS issues
export class CustomResend {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "/api/resend"; // Use our proxy
  }

  emails() {
    return {
      send: async (options) => {
        // Handle array to string conversion for 'to' field
        const payload = {
          ...options,
          to: Array.isArray(options.to) ? options.to[0] : options.to,
        };

        const response = await fetch(`${this.baseUrl}/emails`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to send email");
        }

        const data = await response.json();
        return { data, error: null };
      },
    };
  }
}

// Export factory function
export function createCustomResend(apiKey) {
  return new CustomResend(apiKey);
}
