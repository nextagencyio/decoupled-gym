import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('renders hero section with title', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText(/forge your strongest self/i)
  })

  test('renders navigation links', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('a[href="/classes"]').first()).toBeVisible()
    await expect(page.locator('a[href="/trainers"]').first()).toBeVisible()
    await expect(page.locator('a[href="/memberships"]').first()).toBeVisible()
  })

  test('renders CTA section', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /ready to transform/i })).toBeVisible()
  })
})

test.describe('Classes page', () => {
  test('lists fitness classes', async ({ page }) => {
    await page.goto('/classes')
    await expect(page.locator('h1')).toContainText(/classes/i)
    await expect(page.getByRole('heading', { name: 'HIIT Blast' })).toBeVisible()
  })

  test('class detail page loads', async ({ page }) => {
    await page.goto('/classes/hiit-blast')
    await expect(page.getByRole('heading', { name: /HIIT Blast/i })).toBeVisible()
    await expect(page.getByText('Advanced')).toBeVisible()
  })
})

test.describe('Trainers page', () => {
  test('lists trainers', async ({ page }) => {
    await page.goto('/trainers')
    await expect(page.locator('h1')).toContainText(/trainers/i)
    await expect(page.getByRole('heading', { name: 'Marcus Johnson' })).toBeVisible()
  })

  test('trainer detail page loads', async ({ page }) => {
    await page.goto('/trainers/marcus-johnson')
    await expect(page.getByRole('heading', { name: /Marcus Johnson/i })).toBeVisible()
    await expect(page.getByText('Strength & Powerlifting')).toBeVisible()
  })
})

test.describe('Memberships page', () => {
  test('lists membership plans', async ({ page }) => {
    await page.goto('/memberships')
    await expect(page.locator('h1')).toContainText(/memberships/i)
    await expect(page.getByText('$59').first()).toBeVisible()
  })

  test('membership detail page loads', async ({ page }) => {
    await page.goto('/memberships/premium')
    await expect(page.getByRole('heading', { name: /Premium/i })).toBeVisible()
    await expect(page.getByText('$59').first()).toBeVisible()
  })
})

test.describe('Static pages', () => {
  test('about page renders', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByRole('heading', { name: /About IronFit Gym/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Our Mission/i })).toBeVisible()
  })

  test('FAQ page renders', async ({ page }) => {
    await page.goto('/faq')
    await expect(page.getByRole('heading', { name: 'FAQ' })).toBeVisible()
  })
})
