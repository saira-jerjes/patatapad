require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const { loadSession } = require("./config/session.config");
const { loadSessionUser } = require("./middleware/session.middleware");
const cors = require("cors");

/* DB init */
require("./config/db.config");

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
  };

  

/* Middlewares */
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger("dev"));
app.use(loadSession);
app.use(loadSessionUser);

/* API Routes Configuration */
const routes = require("./config/routes.config");
app.use("/api/patatapad", routes);

const port = Number(process.env.PORT || 3000);

app.listen(port, () => console.info(`Application running at port ${port}`));
