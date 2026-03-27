const dns = require('dns')


const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    dns.setServers(['1.1.1.1'])
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: "TestingUser",
        name: "Admin",
        password: "test123"
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('login form is shown', async ({ page }) => {

    const locator = page.getByRole('button').getByText('login').first()
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const locator = page.getByRole('button', {name: 'login'}).first()
      await locator.click()
      await page.getByLabel('username').fill('TestingUser')
      await page.getByLabel('password').fill('test123')
      await page.getByRole('button', {name: 'login'}).last().click()

      await expect(page.getByText("Admin logged in",{exact:false})).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
      const locator = page.getByRole('button', {name: 'login'}).first()
      await locator.click()
      await page.getByLabel('username').fill('NoUser')
      await page.getByLabel('password').fill('badword')
      await page.getByRole('button', {name: 'login'}).last().click()

      await expect(page.getByText("wrong username or password",{exact:false})).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      const locator = page.getByRole('button', {name: 'login'}).first()
      await locator.click()
      await page.getByLabel('username').fill('TestingUser')
      await page.getByLabel('password').fill('test123')
      await page.getByRole('button', {name: 'login'}).last().click()
      await page.getByRole('button', {name: 'logout'}).waitFor()
    })
    
    test('When logged in with a number of blogs in unsorted like order', async ({ page, request }) => {
      const userJson = await page.evaluate(() => {
        return window.localStorage.getItem('loggedBlogappUser')
      })
      const user = JSON.parse(userJson)

      await request.post('http://localhost:3003/api/blogs', {
        data: {
          title: "LeastLikes",
          author: "GoodAuthor",
          url: "test123.com",
          likes: 47
        },
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      await request.post('http://localhost:3003/api/blogs', {
        data: {
          title: "MostLikes",
          author: "GoodAuthor",
          url: "test12345.com",
          likes: 2342
        },
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      await request.post('http://localhost:3003/api/blogs', {
        data: {
          title: "MiddleLikes",
          author: "GoodAuthor",
          url: "test1234.com",
          likes: 1041
        },
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      await page.reload()
      await page.getByText("MiddleLikes").waitFor()

      const notMostLikes = await page.locator('.blog').first().innerHTML()
      expect(notMostLikes).not.toContain("Most")

      await page.getByRole('button', {name: 'Sort by likes'}).waitFor()
      await page.getByRole('button', {name: 'Sort by likes'}).click()

      const mostLikes = await page.locator('.blog').first().innerHTML()
      expect(mostLikes).toContain("Most")

  })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', {name: 'create new blog'}).click()

      await page.getByLabel('title').fill('AwesomeTitle')
      await page.getByLabel('author').fill('Admin')
      await page.getByLabel('url').fill('http://goodwebsite.org')

      await page.getByRole('button', {name: 'add blog'}).click()

      await expect(page.getByText('AwesomeTitle Admin')).toBeVisible()
    })

    describe('When blog was created', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', {name: 'create new blog'}).click()

        await page.getByLabel('title').fill('AwesomeTitle')
        await page.getByLabel('author').fill('Admin')
        await page.getByLabel('url').fill('http://goodwebsite.org')

        await page.getByRole('button', {name: 'add blog'}).click()

      })

      test('blog can be liked', async ({ page }) => {
        await page.getByRole('button', {name: 'view'}).click()
        await page.getByRole('button', {name: 'like', exact: true}).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('created blog can be deleted by logged in user', async ({ page }) => {
        await page.on('dialog', dialog => {
          console.log(dialog.message)
          dialog.accept()
        })

        await page.getByRole('button', {name: 'view'}).click()
        await page.getByRole('button', {name: 'delete'}).click()
        
        await expect(page.getByText('AwesomeTitle Admin')).not.toBeVisible()
      })

      test('created blog can only be deleted by creator', async ({ page, request }) => {
        // Create second user which is not the creator of the initial blog
        await request.post('http://localhost:3003/api/users', {
          data: {
            username: "TestingUser2",
            name: "Admin2",
            password: "test123"
          }
        })

        // Logout initial user and log in as second user
        await page.getByRole('button', {name: 'logout'}).click()
        await page.getByRole('button', {name: 'login'}).first().click()
        await page.getByLabel('username').fill('TestingUser2')
        await page.getByLabel('password').fill('test123')
        await page.getByRole('button', {name: 'login'}).last().click()

        // Expand existing blog
        await page.getByRole('button', {name: 'view'}).click()
        
        // Delete button should NOT be visible!
        await expect(page.getByRole('button', {name: 'delete'})).not.toBeVisible()

      })
    })
  })

  

    


})
