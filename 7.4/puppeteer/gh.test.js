let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Let’s build from here · GitHub');
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toMatch("Get started with Team")
  }, 60000);
});

describe("Checking the title on other application pages", () => { 
  test("Pricing", async () => {
    await page.goto("https://github.com/pricing");
    await page.waitForSelector('h1');
    const title1 = await page.title();
    expect(title1).toEqual('Pricing · Plans for every developer · GitHub');
  }, 50000);

  test("Press", async () => {
    await page.goto("https://github.com/about/press");
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 50000);

  test("Security", async () => {
    await page.goto("https://github.com/security");
    const btnSelector = ".btn-mktg.mr-3.mb-3.mb-sm-0";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Explore GitHub Advanced Security")
  }, 60000);
});