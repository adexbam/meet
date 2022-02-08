import puppeteer  from "puppeteer";


describe('Show/Hide an event details', () => {
    let browser;
    let page;
    beforeAll(async ()=> {
        //jest.setTimeout(30000);
        browser = await puppeteer.launch(/*{
            headless: true, // turn off headless to watch test being conducted
            slowMo: 250, // slow down by 250ms
            ignoreDefaultArgs: ['--disable-extensions'] // ignore default setting that can cause timeout
        }*/);
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(()=>{
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeNull();
    });
    
    test('User can expand an event to see its details', async () => {
        await page.click('.event .details-btn')
        const eventDetails = await page.$('.event .details-btn');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeNull();
    });
    test('Specify the numbers of event', () => {
        
    });
    
});