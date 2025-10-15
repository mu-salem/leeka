# 🚀 Quick Start Guide - Admin Dashboard

## Step 1: Start the Development Server

```bash
cd d:\Mustafa\Projects\Lekka\lekka\leeka
pnpm dev
```

## Step 2: Access the Admin Panel

Open your browser and navigate to:

```
http://localhost:3000/admin/login
```

## Step 3: Login

Enter any email and password (frontend only - no validation):

- **Email:** `admin@lekka.com`
- **Password:** `password123`

Click "Login" and you'll be redirected to the dashboard!

## 🎯 What You Can Do

### 1. Dashboard Overview (`/admin`)
- View statistics and activity
- Monitor system status
- Quick overview of content

### 2. Content Management (`/admin/content`)
- Switch between languages (🇬🇧 EN / 🇸🇦 AR / 🇨🇳 ZH)
- Edit 5 sections:
  - Hero Section
  - About Section
  - Services Section
  - Contact Section
  - Footer Section
- Upload images (UI only)
- Save changes (console logged)

### 3. Users Management (`/admin/users`)
- View all users in a table
- Search users
- Filter by role/status
- Edit/Delete actions (UI only)

### 4. Settings (`/admin/settings`)
- Update contact information
- Manage social media links
- Configure global settings:
  - Maintenance mode
  - Email notifications
  - Two-factor authentication
  - Public registration

## 🎨 Try These Features

### Theme Toggle
- Click the **sun/moon icon** in the top navbar
- Watch the entire dashboard switch between light and dark themes

### Language Switcher
- Click the **globe icon** in the navbar
- Select English, Arabic, or Chinese
- UI labels update immediately

### Mobile View
- Resize your browser to mobile width
- Sidebar collapses automatically
- Hamburger menu appears
- Perfect responsive experience

## 🔧 Customization Tips

### Add a New Page
1. Create `app/admin/your-page/page.tsx`
2. Add to sidebar in `components/admin/admin-sidebar.tsx`
3. Use `PageTransition` wrapper for animations

### Change Colors
- Edit your `globals.css` or use Tailwind classes
- ShadCN theme variables in CSS

### Add Translations
- Edit `contexts/admin-language-context.tsx`
- Add keys to all 3 languages

## 📦 What's Included

✅ Complete UI (no backend required to run)
✅ Responsive design
✅ Light/Dark theme
✅ 3 languages
✅ Smooth animations
✅ Protected routes
✅ Modern design

## 🔜 Next Steps (Backend Integration)

When ready to connect to your backend:

1. Replace auth logic in `contexts/admin-auth-context.tsx`
2. Add API calls in page components
3. Implement real data fetching
4. Add form validation
5. Handle loading/error states

## 📄 Full Documentation

See `ADMIN_DASHBOARD_README.md` for complete documentation.

---

**Enjoy your new admin dashboard! 🎉**
