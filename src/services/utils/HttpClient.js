class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(this.baseUrl + path);

    if (response.ok) {
      return response.json();
    }

    throw new Error(`Status code not valid: ${response.status}`);
  }
}

export default HttpClient;
