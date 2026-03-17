# 🎨 Avatar Generator API

A simple, scalable **avatar generation system** built with **Node.js + Express**, designed for modern web apps (like your Postify project).
It supports:

* 🔁 Random avatar generation
* 🧑 Gender-based filtering
* 🔒 Deterministic avatars using ID
* ⚡ Works on Vercel / serverless environments
* 🖼️ Direct image rendering (no JSON required)

---

## 📁 Folder Structure

```
public/
  avatars/
    all/    → AV1.png - AV100.png
    boy/    → AV1.png - AV50.png
    girl/   → AV51.png - AV100.png

server.js
```

---

## 🚀 Features

### ✅ 1. Random Avatar

* Generates a **new avatar on every refresh**
* Useful for signup UI (shuffle avatar)

```
GET /api/avatars
```

---

### ✅ 2. Gender-Based Random Avatar

* Filters avatars based on gender

```
GET /api/avatars?gender=boy
GET /api/avatars?gender=girl
```

| Gender | Range    |
| ------ | -------- |
| boy    | 1 – 50   |
| girl   | 51 – 100 |
| none   | 1 – 100  |

---

### ✅ 3. Fixed Avatar (ID Based)

* Same ID → same avatar (deterministic)
* Useful for fallback or consistent identity

```
GET /api/avatars/:id
GET /api/avatars/:id?gender=boy
```

---

## 🧠 How It Works

### 🔹 Random Mode

* Generates a random number within a range
* Redirects to corresponding image

### 🔹 Deterministic Mode

* Takes `id`
* Maps it into valid range using modulo
* Ensures:

  * No broken images
  * Same ID → same avatar

---

## 🔥 API Behavior

### 🟢 Example: Random

```
/api/avatars
```

➡️ Redirects to:

```
/avatars/all/AV34.png
```

---

### 🟢 Example: Gender Random

```
/api/avatars?gender=boy
```

➡️ Redirects to:

```
/avatars/boy/AV12.png
```

---

### 🟢 Example: Fixed Avatar

```
/api/avatars/23
```

➡️ Redirects to:

```
/avatars/all/AV23.png
```

---

## ⚡ Caching Strategy

To ensure avatars **change on every reload**, we use:

```
Cache-Control: no-store
```

and

```
?t=timestamp
```

This prevents browser caching.

---

## 💻 Usage in Frontend

### 🎯 Random Avatar Button

```javascript
img.src = "/api/avatars";
```

---

### 🎯 Gender-Based

```javascript
img.src = "/api/avatars?gender=boy";
```

---

### 🎯 Fixed Avatar (Profile)

```html
<img src="/api/avatars/23" />
```

---

## 🗄️ Database Strategy

### ✅ Recommended

Store only the **final avatar URL**:

```
profilePic: "/avatars/boy/AV23.png"
```

---

### ❌ Avoid

* Storing full images
* Generating avatars on every load

---

## 🌍 Deployment

### ✅ Works on:

* Vercel
* Render
* Railway
* Local Node.js

### ⚠️ Important:

* Do NOT use `fs` or `sendFile`
* Use static `/public` serving only

---

## 🔮 Future Improvements

* 🎛️ Avatar picker UI (grid + shuffle)
* 🧠 AI-generated avatars (DiceBear style)
* 🌐 CDN optimization
* 🎨 Custom avatar themes

---

## 🧑‍💻 Author Notes

This system is inspired by real-world implementations used in:

* GitHub (identicons)
* DiceBear avatars
* SaaS onboarding flows

---

## ⭐ Summary

✔ Fast
✔ Simple
✔ Scalable
✔ Serverless-friendly

Perfect for:

* Social apps
* E-commerce
* SaaS onboarding

---

🔥 **Pro Tip:**
Use random generation during signup, then store the selected avatar for consistent UX.
