
# 🌻 Gratitude Garden — A Public Appreciation Wall

### Reflection & Learning

### 🪴 Overview

Gratitude Garden is a full-stack web app where users submit gratitude messages ("plant seeds"), interact with posts by giving "sunshine" (likes), and watch their flowers visually grow from sprout to bloom based on community support.

---

### 🧠 What I Learned

Throughout Gratitude Garden’s development, I gained deep insights into full-stack development using modern technologies and best practices. Here are key topics, code concepts, and resources I explored:

#### 💻 Backend (Node.js + Express + PostgreSQL)

* **Routing & HTTP Methods**
  `app.get()`, `app.post()`, `app.delete()` — [Express Routing Docs](https://expressjs.com/en/guide/routing.html#routing-methods)

* **RESTful API design principles** (e.g., `/gratitudewall` endpoints)

* **Environment Variables**
  Using `dotenv` to manage sensitive info ([dotenv npm](https://www.npmjs.com/package/dotenv))

* **Cross-Origin Resource Sharing (CORS)**
  Enabled CORS middleware to allow frontend-backend communication ([MDN CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS))

* **PostgreSQL Database Interaction**
  SQL queries for CRUD operations (SELECT, INSERT, UPDATE, DELETE) — [W3Schools SQL](https://www.w3schools.com/sql/)
  Using `pg` (node-postgres) for async queries and parameterized inputs

* **Error Handling and Input Validation**
  Parsing and validating route parameters (`parseInt`, checking for NaN)
  Sending appropriate HTTP status codes (400, 404, 500) on errors

---

#### 🌐 Frontend (HTML + CSS + JavaScript)

* **DOM Manipulation**
  Creating and appending elements dynamically (`appendChild`) — [MDN appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)
  Adding event listeners (`addEventListener`) for clicks, submits — [MDN Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

* **Fetch API & async/await**
  Performing async HTTP requests to backend endpoints — [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  Using async functions for cleaner asynchronous code — [MDN async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

* **Dynamic UI Updates**
  Updating like counts and flower growth states in real time
  Conditional rendering logic based on likes to change emojis and styles

* **Responsive Design & Animations**
  CSS transitions for fade effects and growth animations
  Responsive layouts that adjust across devices

* **Notification System**
  Showing user feedback messages with styled notifications

---

#### ⚡ Build Tools

* **Vite**
  Modern frontend tooling for fast build and dev server **Vite Docs**

---

#### 🌐 Deployment

* **Render**
  Hosting backend API and static frontend
  Using environment variables and web service settings

---

### 🚧 Challenges I Faced

* **Styling & Layout**

* Designed a responsive, visually pleasing garden UI.

* Smooth scaling animations for flower growth stages.

* Styling was time-consuming; synchronization of all elements was challenging.

* Corrected spelling and consistency errors.

* **Complex UI Management**

* Handled multiple UI states: all posts, new sprouts, and top posts.

* Synchronized frontend state with backend data for likes and deletions.

* **JavaScript Enhancements**

* Organized asynchronous code and event handlers for clarity.

* Implemented optimistic UI updates with rollback on errors.

* **Backend & Data Fixes**

* Fixed SQL date/time issues that caused incorrect timestamps.

* Resolved post overlapping by improving layout and rendering logic.

* **Feature & Time Balance**

* Balanced feature completeness with clean, responsive design.

---

### 🌟 Project Highlights

* Growth visualization based on user likes (🌱 → 🍃 → 🌸 → 🌼)
* “Give Sunshine” 🌞 like button feature
* User notification messages on success/failure
* Dynamic post filtering: All Posts, New Sprouts, Top Posts
* Fully deployed backend API and frontend app

---

### 🚀 Future Plans

I plan to evolve Gratitude Garden into a meaningful tool promoting positivity and wellness, including:

* **Day/Night Mode Toggle** to switch UI theme by time

* **Workplace Culture App**
  Encourage employees to share appreciation and foster positivity

* **School/University Platform**
  Enable students to express gratitude and support each other

* **Event-Specific Versions**
  For weddings, festivals, conferences, hackathons

* **Mental Health & Wellbeing**
  Daily affirmations, emotional journaling, and community support

* **Monetization**
  Sponsored “Sunshine Moments,” branded flowers, feel-good ads

**I plan to remove the current delete button in the future and replace it with an automated deletion process set to occur after 30 days.**

---

## 📚 References & Resources

* [Express Docs](https://expressjs.com/)
* [Node.js Docs](https://nodejs.org/en/docs)
* [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
* [W3Schools SQL](https://www.w3schools.com/sql/)
* [MDN JavaScript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Vite Documentation](https://vitejs.dev/)
* [Render Deployment](https://render.com/)
* [Teacher's Notes](https://github.com/Tech-Educators/software-dev-021/tree/main/demos/week4/week4-assignment)
* [Sample Guestbook](https://guestbook-3ap1.onrender.com)
* [Sam's Notes](https://github.com/IndieMasco/TechEdSoftwareDeveloper021/tree/main/week4/express-ws)
* [Emojis](https://stackoverflow.com/questions/75585031/replacing-emoji-with-html-and-css-in-dropdown)
* [Emoji Icons](https://www.w3schools.com/html/html_emojis.asp)
* [Emojis](https://emojipedia.org/)
* [HTML Option Tag](https://www.w3schools.com/tags/tag_option.asp)
* [Google Font - Playfiar](https://fonts.google.com/selection/embed)
* [Google Font- Sans serif](https://fonts.google.com/selection/embed)
* [Color Toggle](https://stackoverflow.com/questions/4358155/changing-background-based-on-time-of-day-using-javascript?utm)
* [Dark Mode Toggle](https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/)
* [JavaScript string method that removes whitespace from both the start and end](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
* [Docs](https://www.postgresql.org/docs/current/datatype-datetime.html)
* [SQL](https://www.mssqltips.com/sqlservertip/6769/sql-server-drop-table-if-exists/)
* [Form Objects](https://docs.solspace.com/craft/freeform/v1/templates/objects/form/)
* Watched few youtube videos for designing and google research.
* [Delete Option](https://expressjs.com/en/guide/routing.html?utm_source=chatgpt.com#routing-methods)
* [Delete Option](https://node-postgres.com/features/queries)
* [Delet Option](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)