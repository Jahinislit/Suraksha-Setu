
# 📱 Disaster Report App

A modern, cross-platform React Native app (built with **Expo**) to **report, track, and manage disaster incidents** with optional photo and location sharing. Includes **Emergency SOS**, **My Reports history**, and **offline storage** using `AsyncStorage`.

---

## 🔧 Features

- 🔵 **Modern UI** with consistent blue-themed header and rounded components
- 🆘 **Emergency SOS** reporting with instant location sharing
- 📤 **Disaster Report Submission**:
  - Select type of disaster from dropdown
  - Choose severity (Low → Critical)
  - Auto-fetch user location
  - Attach optional photo and description
  - Enter user name and contact number
- 📍 **GPS location integration**
- 🖼️ Photo picker + ability to remove selected image
- 🗃️ **My Reports** page:
  - Locally stored on device using `AsyncStorage`
  - Displays history of submitted reports
- ❓ **Help & FAQ Page** with accordion UI using `react-native-collapsible`

---

## 📦 Tech Stack

| Area        | Library/Tool                      |
|-------------|-----------------------------------|
| Framework   | React Native (via Expo)           |
| Backend     | Supabase (Postgres DB, optional)  |
| Auth (opt)  | Supabase Auth (can be skipped)    |
| Location    | `expo-location`                   |
| Storage     | `@react-native-async-storage/async-storage` |
| Image Picker| `expo-image-picker`               |
| Navigation  | `expo-router`                     |
| UI Elements | `react-native`, `react-native-picker`, `react-native-collapsible`, `Ionicons` |

---

## 🛠️ Installation & Setup

```bash
git clone https://github.com/yourusername/disaster-report-app.git
cd disaster-report-app

# Install dependencies
npm install

# For Expo users:
npx expo install

# Run the project
npx expo start
```

---

## 🗂️ Folder Structure

```
app/
├── index.tsx                # Home screen with 4 options
├── help.tsx                 # Accordion-style help/FAQ
├── my-reports.tsx           # History of local reports
└── report/
    ├── index.tsx            # User inputs: name, contact, disaster type
    └── form.tsx             # Report form: severity, location, description, photo
lib/
└── supabase.ts              # Supabase config (optional backend)
assets/
└── icon.png, splash.png     # Optional assets
```

---

## 🔐 Environment Variables (Optional for Supabase)

Create a `.env` file and set:

```env
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_ANON_KEY=<your-anon-or-publishable-key>
```

And in `lib/supabase.ts`:

```ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
```

---

## 📸 Screenshots

> Add screenshots of:
> - Home screen
> - Report Disaster form
> - Emergency SOS screen
> - My Reports list
> - Help accordion

---

## ✨ Future Improvements

- ✅ Offline-first data sync to Supabase when online
- 🌍 Add map view for report locations
- 🔔 Push notifications for verified updates
- 🧾 Export reports as PDF
- 👤 Auth support for multiple users

---

## 🤝 Contributing

1. Fork this repo
2. Create your feature branch: `git checkout -b feature/xyz`
3. Commit your changes: `git commit -m 'Add xyz feature'`
4. Push to the branch: `git push origin feature/xyz`
5. Open a Pull Request

---

## 📄 License

MIT License. Free to use and adapt.
