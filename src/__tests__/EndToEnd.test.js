import puppeteer  from "puppeteer";


describe('Show/hide, specify and filter events', () => {
    let browser;
    let page;
    jest.setTimeout(50000);
    beforeAll(async ()=> {
        jest.setTimeout(50000);
        browser = await puppeteer.launch({
            headless: false, // turn off headless to watch test being conducted
            slowMo: 250, // slow down by 250ms
            ignoreDefaultArgs: ['--disable-extensions'] // ignore default setting that can cause timeout
        });
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
    test('User hasn’t input number of event and its default', async () => {
        const eventNumber = await page.$('.event .numberOfEvents');
        expect(eventNumber).toBeDefined();
    });
    test('User clear and specify number of events', async () => {
        const numberInput = await page.$('.event-number-input');
        await numberInput.click({clickCount : 5});
        await numberInput.press('Backspace');
        await numberInput.type('10');
        expect(numberInput).toBeDefined();
    });
    test('User should see a list of suggestions and select from list', async () => { 
        let searchInput = await page.$('.city');
        //let suggestions = await page.$('.suggestions li');
        await searchInput.type('Berlin', {delay: 100});
        let suggestions = await page.$$eval('.suggestions li', (element) => element.length);
        expect(suggestions).toBe(2);
        await page.click('.suggestions li');
        let clickSuggestions = await page.$$eval('.event', (element) => element.length);
        expect(clickSuggestions).toBe(1);
    });
});
