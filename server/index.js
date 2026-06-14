import app from "./src/app.js";
import { PORT } from "./src/utils/env.js";
import { connectDB } from "./src/config/db.js";

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
