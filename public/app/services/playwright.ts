import playwright from "playwright";

export async function screenshot(url: string) {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { timeout: 15000 });
  const buffer = await page.screenshot({ fullPage: true });
  await browser.close();

  return buffer.toString("base64");
}
