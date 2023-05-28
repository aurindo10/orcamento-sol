import { NextApiRequest, NextApiResponse } from "next";
import edgeChromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
const LOCAL_CHROME_EXECUTABLE =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const params = new URLSearchParams({
      productName: req.body.productName,
      name: req.body.name,
      city: req.body.city,
      roofType: req.body.roofType,
      power: req.body.power,
      generation: req.body.generation,
      area: req.body.area,
      inverter: req.body.inverter,
      panel: req.body.panel,
      value: req.body.value,
    });

    const handleGetPdf = async () => {
      const executablePath =
        (await edgeChromium.executablePath) || LOCAL_CHROME_EXECUTABLE;
      const url = `https://solengenharia.app/proposta?${params.toString()}`;
      let browser = null;
      browser = await puppeteer.launch({
        executablePath,
        args: edgeChromium.args,
        headless: false,
      });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle2" });
      const pdfBuffer = await page.pdf({
        format: "a4",
        printBackground: true,
      });

      console.log(pdfBuffer);
      res.status(200).send(pdfBuffer.toString("base64"));
    };
    handleGetPdf();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
