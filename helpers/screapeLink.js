import puppeteer from 'puppeteer';

export async function fetchPageContent(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });  // Wait for the network to be idle
    
    // Extract the text content
    const content = await page.evaluate(() => document.body.innerText);

    await browser.close();

    return content.slice(0, 3000);  // Limit content size for embedding
  } catch (error) {
    console.error('Error fetching dynamic page content:', error);
    return null;
  }
}
