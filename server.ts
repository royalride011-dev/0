import express from "express";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  
  app.use(express.json());

  // API routes
  app.post("/api/booking", (req, res) => {
    res.json({ status: "success", message: "Booking received" });
  });

  // Vite middleware for development
  const isDev = process.env.NODE_ENV !== "production" && 
    !(typeof __filename !== "undefined" && (__filename.endsWith("server.cjs") || __filename.includes("dist")));

  if (isDev) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });

  server.on('error', (err: any) => {
    console.error("Server error:", err);
    process.exit(1);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
