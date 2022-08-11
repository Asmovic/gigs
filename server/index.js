import express from "express";

// Create global app object
const app = express();

const PORT = 3000;

app.get("/", (req, res) => res.send("Welcome. Let's create a Gig"));

app.all("*", (req, res) => {
  res.status(404).json({
    status: 404,
    error: "404 Page Not Found",
  });
});

app.listen(process.env.PORT || PORT, () =>
  console.log(`Server Listening on Port :${PORT}`)
);

export default app;
