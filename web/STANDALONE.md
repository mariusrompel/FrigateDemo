# Standalone Deployment

The Frigate frontend (`web/` directory) can be built and deployed independently of the Frigate server. This is useful for running custom views or integrations that connect to a Frigate instance running on a different machine.

## Building the Frontend

1.  Navigate to the `web` directory:
    ```bash
    cd web
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Build the project:
    ```bash
    npm run build
    ```

This will generate a `dist` folder containing the static assets.

## Deploying

You can host the contents of the `dist` folder using any static file server (e.g., Nginx, Apache, Python `http.server`, etc.).

## Configuration

To connect the standalone frontend to a Frigate server on another IP, you need to configure the API host in the `index.html` file.

1.  Open the `index.html` file in the `dist` folder (or in `web/` before building).
2.  Add a script tag inside the `<head>` or `<body>` to set the `window.apiHost` variable.

Example:

```html
<script>
  window.apiHost = "http://192.168.1.100:5000/"; // Replace with your Frigate server URL
  // window.baseUrl = "/my-app/"; // Optional: Set if hosting under a subpath
</script>
```

-   `window.apiHost`: The full URL to the Frigate server API (including protocol and port).
-   `window.baseUrl`: (Optional) The base path where the frontend is hosted. Default is `/`.

### CORS / Proxy Requirements

By default, Frigate's API does not enable Cross-Origin Resource Sharing (CORS) for external domains. If you host the frontend on a different domain or port than the Frigate server (e.g., frontend on `http://localhost:8080` and Frigate on `http://192.168.1.100:5000`), the browser will block API requests.

To resolve this, you have two options:

1.  **Use a Reverse Proxy (Recommended):** Configure a reverse proxy (like Nginx) on the same machine/domain as your frontend to forward `/api` requests to the Frigate server. In this case, you do **not** need to set `window.apiHost` (or set it to the proxy URL), as the requests will appear to come from the same origin.

2.  **Enable CORS on Frigate (Advanced):** You would need to modify the Frigate backend configuration (or code) to allow CORS headers for your frontend's origin. This is typically done via a reverse proxy in front of Frigate itself (e.g., using the Nginx sidecar container or your own proxy) to add the `Access-Control-Allow-Origin` header.

## Accessing the Standalone View

Once deployed, you can access the standalone view at:

`http://<your-frontend-server>/standalone`

This view provides a simplified interface without Frigate branding.
