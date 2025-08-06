# Spotify Clone 🎧

A beautiful Spotify UI clone built with **React** and **Tailwind CSS**, including music playback functionality using the **HTML Audio API**.

---

## 🚀 Live Demo

Will be hosted soon on [Vercel](https://vercel.com)

---

## 🛠 Tech Stack

- React JS ⚛️
- Tailwind CSS 💨
- HTML Audio API 🔊

---

## 📌 Features

- Spotify-like UI layout
- Music play/pause functionality
- Dynamic album display and playback
- Responsive design
- Sticky header for track titles
- Custom scrollable song list
- Track progress bar
- Time display (current time / total duration)
- Fully working audio player using native HTMLAudio API

---

## 📷 Demo Video

[Click here to watch demo video](https://drive.google.com/file/d/1Qa7Vm8s6q7U2tYNj0CX6FgKabAuGmDkb/view?usp=drive_link)

---

## 🎯 Improvements Made Over Original Tutorial

Credits to [GreatStack's YouTube Tutorial](https://youtu.be/amFYvQK4huo?si=pwC0TFnAIX21BV61) for the base project.  
However, I made several **modifications and optimizations**:

- 🔵 **Simplified background gradient color**:  
  Used minimal code instead of lengthy `useEffect` for background color change on album selection.

- 🔵 **Used HTMLAudio API** for smooth and flexible music handling.

- 🔵 **Solved Na:Na issue** during song load:  
  Handled via `loadedmetadata` event to prevent flashing of undefined time.

- 🔵 **Created reusable `play()` function**:  
  Avoided repeating `audioRef.current.play()` + `setPlayStatus(true)` again and again.

- 🔵 **Created one reusable component** for music carousels:  
  Instead of making separate components for each category.

- 🔵 **Fetched albums by `name` instead of `id`**:  
  This reduced boilerplate and made routing simpler.

---

## 🧠 How to Run Locally

```bash
git clone <your-repo-url>
cd spotify-clone
npm install
npm start
```

🙏 Credits
Special thanks to:

Great Stack - Spotify UI with React & Tailwind Tutorial
