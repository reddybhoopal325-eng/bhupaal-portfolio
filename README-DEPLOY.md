# Bhupaal Reddy Portfolio — Cloudflare Pages

This is a responsive portfolio website built from the supplied portfolio folder and resume. It includes a homepage inspired by the visual reference, separate software galleries, video previews, resume download, visitor views, likes, comments, and an admin comment-moderation page.

## Folder contents
- `index.html`, `style.css`, `script.js` — website
- `assets/` — portrait, resume PDF, optimized project images and videos
- `functions/api/` — Cloudflare Pages Functions API
- `schema.sql` — D1 database tables
- `admin.html` — private comment moderation dashboard

## Free deployment overview
Cloudflare Pages, Workers/Pages Functions and D1 have free plans/allowances. Stay within the current free-plan quotas; Cloudflare may change limits. No custom domain is required: use the free `*.pages.dev` address.

### 1. Create a GitHub repository
1. Sign in at https://github.com and create a new repository, e.g. `bhupaal-portfolio`.
2. Upload the contents of this folder (not the outer ZIP) to the repository root.
3. Commit the files.

### 2. Create a Cloudflare Pages project
1. Sign in at https://dash.cloudflare.com
2. Open **Workers & Pages → Create → Pages → Connect to Git**.
3. Select your `bhupaal-portfolio` repository.
4. Framework preset: **None**.
5. Build command: leave blank.
6. Build output directory: `.` (repository root).
7. Deploy. Cloudflare will give you a `*.pages.dev` URL.

**Important:** Keep the `functions/` directory in the repository root. Pages Functions are deployed when the project is connected to Git; a simple drag-and-drop static upload does not deploy these backend functions.

### 3. Create the D1 database
1. In Cloudflare dashboard, open **Storage & databases → D1 SQL Database**.
2. Create a database named `bhupaal-portfolio-db`.
3. Open its console and run the complete contents of `schema.sql`.
4. Open your Pages project → **Settings → Functions → D1 database bindings**.
5. Add a binding with variable name `DB` and select `bhupaal-portfolio-db`.
6. Save and redeploy the Pages project.

### 4. Set the admin token
1. Create a long, private random token (do not share it publicly).
2. In Pages project → **Settings → Variables and Secrets**, add secret `ADMIN_TOKEN`.
3. Paste your private token as its value and save.
4. Redeploy.
5. Open `https://YOUR-SITE.pages.dev/admin.html`, enter the token and load the dashboard to approve or delete visitor comments.

Never put the admin token in `index.html`, `script.js`, GitHub, or any public file.

### 5. Test
- Open the public site in a private/incognito browser window.
- Check that the view count increments.
- Click Like; the same browser visitor can toggle their like on/off.
- Submit a comment; it is pending until approved in `/admin.html`.
- Approve it in the admin dashboard; it then appears publicly.

## Notes
- The counters start at zero. The sample numbers from the PDF were visual mockup figures only.
- View counts count page loads; refreshing the page counts another view. This is a simple portfolio counter, not a unique-person analytics product.
- Likes are one active like per browser-generated visitor ID. Clearing browser storage or changing browsers can create a new visitor ID.
- Comments are escaped before display and are held for moderation before becoming public.
- A visitor can submit up to three comments per 10 minutes per browser ID. For a public production site, consider adding Cloudflare Turnstile and stronger abuse protection.
- Your uploaded videos have been transcoded to smaller web-friendly MP4 previews to reduce page weight. The originals are not included in this website package.
- The resume PDF is generated from the resume image you supplied.
- This project is designed to use free services, but always check Cloudflare's current plan limits. No paid domain or hosting subscription is required for the basic setup.
