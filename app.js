// app.js
const http = require('http');

// 1. Define the port (environment variable OR default)
const PORT = process.env.PORT || 3000;

// 2. Create the server
const server = http.createServer((req, res) => {

  // 3. Log each request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // 4. Routing logic
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Jenkins Pipeline Test Successful! Home Page Updated.\n");
  
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("This is the About Page.\n");

  } else if (req.url === "/health") {
    // 5. Health check endpoint (useful for monitoring tools)
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: "OK", uptime: process.uptime() }));

  } else {
    // 6. 404 Not Found
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 - Page Not Found\n");
  }
});

// 7. Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// 8. Graceful shutdown (useful when PM2 or Jenkins restarts the service)
process.on("SIGI", () => {
  console.log("\nShutting down server...");
  server.close(() => {
    console.log("Server stopped.");
    process.exit(0);
  });
});
