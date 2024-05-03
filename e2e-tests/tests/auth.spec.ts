import { test, expect } from '@playwright/test';

const URL = "http://localhost:5173/"
test('should allow users to sign in', async ({ page }) => {
  await page.goto(URL+ "");

  // get the signin button

  await page.getByRole("link", {name: "Sign In"}).click();
  
  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("tester@test.com");
  await page.locator("[name=password]").fill("adminadmin");

  await page.getByRole("button", {name: "Sign In"}).click();

  await expect(page.getByText("Login Success")).toBeVisible();
  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible()
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible()
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible()
});
