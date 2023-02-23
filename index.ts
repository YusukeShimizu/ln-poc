import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 3000;

const fs = require("fs");
const request = require("request");

const REST_HOST = "https://127.0.0.1:8081";
const MACAROON_PATH = "<path to macaroon>";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (_req: Request, res: Response) => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

// https://lightning.engineering/api-docs/api/lnd/lightning/lookup-invoice
app.get("/invoice/:hash", async (req: Request, res: Response) => {
  let options = {
    url: `${REST_HOST}/v1/invoice/`,
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    headers: {
      "Grpc-Metadata-macaroon": fs.readFileSync(MACAROON_PATH).toString("hex"),
    },
    qs: {
      r_hash: req.params.hash,
    },
  };
  request.get(options, function (error: any, response: any, body: any) {
    console.log(error);
    console.log(response);
    console.log(body);
    return res.status(200).send({
      data: body,
    });
  });
});

// https://lightning.engineering/api-docs/api/lnd/lightning/add-invoice
// query paramater is value with satoshis
app.post("/invoices", async (req: Request, res: Response) => {
  let requestBody = {
    value: req.body.value,
  };
  let options = {
    url: `${REST_HOST}/v1/invoices`,
    // Work-around for self-signed certificates.
    rejectUnauthorized: false,
    json: true,
    headers: {
      "Grpc-Metadata-macaroon": fs.readFileSync(MACAROON_PATH).toString("hex"),
    },
    form: JSON.stringify(requestBody),
  };
  request.post(options, function (error: any, response: any, body: any) {
    return res.status(201).send({
      data: body,
    });
  });
});

try {
  app.listen(PORT, () => {
    console.log(`dev server running at: http://localhost:${PORT}/`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
