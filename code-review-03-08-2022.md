# Code Review 03-08-2022

## Code Quality

- Don't leave commented out code in the main branch.
- is variant="danger" the correct way to change the color of a button in React Bootstrap? I feel like there should be a better way.
- Are you testing code before merging it to main?
- It's disappointing you had to start over with yet another repository. What do you think lead to having to do this? Are there things in the future you could do to prevent this?

## Project Management

- I feel like there's way more code being written than cards to track tasks. The task cards should probably have more detail. Consider converting them to github issues so you can assign them to people so you can tell who is working on what.
- There's only two PRs on this new branch and they both just have the person's name as the title. PRs should be focused and relate to a task.
- Commit messages should be focused to a particular task or code change. They should say, what changes, how it changes and why it changed.

## Security

- Secrets.js - a better option would be to use the dotenv package with a .env file, but in either case, include a sample file in the repo.
- Using images from Twitter, causes firefox to block the images because of tracking protections.
- package.json is using JWT but the code is using SECRET_KEY variable
- signup API accepts empty string for email and password, creates user with empty string for email and password
- You have authentication middleware, but it isn't being used in many of the places it should be used in.

## Products

- Pizzas component isn't using Redux to store pizzas, even though you have a pizza slice of state.
- This means other components can't access the pizza information globally and have to fetch it again

## Cart

- Cart is not persisting on reload.
- Cart component is using local state instead of Redux.
- There is a failed to retrieve the user's cart Error.

### Adding to cart

- addCart thunk is reaching out and called getState directly on the store. Thunks get passed a getState function which is more appropriate to use.
- Adding to cart doesn't handle localStorage. Consider a thunk to update localStorage when someone is not logged in.
- Consider using a useCart() custom hook to contain a lot of the logic around accessing the cart and calling the thunks.
- There is an add to wishlist button but it's not doing anything as far as I can tell. (Is this the localstorage cart stuff?) A wishlist might add complexity, as now you need to write something to transition wishlist items to the cart. I just wonder if you have enough time to complete a feature like this.

## Styling

- Cart component is shoved way over to the right
- The blue link text clashes with the dark grey background.
- Use a color pallette generator website to make your colors consistent.
- Fonts on navbar aren't consistent.
- Icons on navbar are too close to the text.
- Buttons on userhome are too close together
- Location dropdown look too big and isn't aligned with the rest of the content.
- Monospaced font is probably not the best choice for some of the screens. Suggestion: Use a sans-serif google display font.  Add a logo to the top of the page branding the site, use a more decorative google font for the logo. Or use an image logo.
