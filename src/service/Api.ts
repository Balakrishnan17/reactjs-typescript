import environment from "../environment/environment";

class Api {
  API_URL = environment.API_URL;
  get(fetch: any, url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestOpion = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      console.log(this.API_URL, url, `${this.API_URL}${url}`);

      fetch(`${this.API_URL}${url}`, requestOpion)
        .then((response: Response) => response.json())
        .then((data: any) => {
          const result = this.resolveData(data);
          if (result.success) {
            resolve(result.data);
          } else {
            reject(result.message);
          }
        })
        .catch((error: any) => {
          const result = this.resolveData(error);
          reject(result.message);
        });
    });
  }

  patch(fetch: any, url: string, body?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestOpion = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
      fetch(`${this.API_URL}${url}`, requestOpion)
        .then((response: Response) => response.json())
        .then((data: any) => {
          const result = this.resolveData(data);
          if (result.success) {
            resolve(result.data);
          } else {
            reject(result.message);
          }
        })
        .catch((error: any) => {
          const result = this.resolveData(error);
          reject(result.message);
        });
    });
  }

  put(fetch: any, url: string, body?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestOpion = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
      fetch(`${this.API_URL}${url}`, requestOpion)
        .then((response: Response) => response.json())
        .then((data: any) => {
          const result = this.resolveData(data);
          if (result.success) {
            resolve(result.data);
          } else {
            reject(result.message);
          }
        })
        .catch((error: any) => {
          const result = this.resolveData(error);
          reject(result.message);
        });
    });
  }

  post(fetch: any, url: string, body?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestOpion = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      return fetch(`${this.API_URL}${url}`, requestOpion)
        .then((response: Response) => response.json())
        .then((data: any) => {
          const result = this.resolveData(data);
          if (result.success) {
            resolve(result.data);
          } else {
            reject(result.message);
          }
        })
        .catch((error: any) => {
          const result = this.resolveData(error);
          reject(result.message);
        });
    });
  }

  delete(fetch: any, url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestOpion = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      return fetch(`${this.API_URL}${url}`, requestOpion)
        .then((response: Response) => response.json())
        .then((data: any) => {
          const result = this.resolveData(data);
          if (result.success) {
            resolve(result.data);
          } else {
            reject(result.message);
          }
        })
        .catch((error: any) => {
          const result = this.resolveData(error);
          reject(result.message);
        });
    });
  }

  resolveData(data: any) {
    console.log("resolveData - ", data);

    let result = {
      success: false,
      data: "",
      message: "Something went wrong. Please try again.",
    };

    if (data && data.status === "success") {
      result.success = true;
      result.data = data.data ? data.data : "";
      result.message = data.message ? data.message : "Success!";
    } else if (data) {
      result.success = false;
      result.message = data.message ? data.message : result.message;
    }

    return result;
  }
}

export default new Api();
