# Pomodoro Timer

A clean, customizable Pomodoro timer built with React + TypeScript. Day 10 of my [50 projects challenge](https://reneebe.github.io).

**[Live demo →](https://reneebe.github.io/pomodoro-timer/)**

## Features

- **Configurable durations** — set focus and break lengths independently (1–120 minutes), controls always visible on the main card
- **6 alarm sounds** — Soft Chime, Bell, Beep, Buzzer, Digital, or None
- **Separate sounds per mode** — pick a different alarm for when focus ends vs. when break ends, or use the same one
- **Preview sounds** — clicking a sound option plays it immediately so you know what you're picking
- **Manual advance** — timer pauses when a session ends and waits for you to start the next one
- **Progress ring** — animated SVG ring shows time elapsed at a glance
- **Skip** — jump to the next mode without waiting for the timer

## How it works

The Pomodoro Technique is a time management method:
1. Work focused for a set period (traditionally 25 minutes)
2. Take a short break (traditionally 5 minutes)
3. Repeat

This timer lets you adjust those durations to whatever works for you.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- Web Audio API for all sounds — no external audio files

## Running locally

```bash
npm install
npm run dev
```
