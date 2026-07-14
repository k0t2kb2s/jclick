# jclick

Production-ready лендинг NFC-карт jclick на Next.js, TypeScript и Tailwind CSS.

## Локальный запуск

```bash
npm install
cp .env.example .env.local
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

Для отправки заявок заполните в `.env.local`:

```env
TELEGRAM_BOT_TOKEN=токен_бота
TELEGRAM_CHAT_ID=id_получателя
```

## Production build

```bash
npm run build
npm run start
```

## Деплой на Vercel

1. Загрузите репозиторий в GitHub, GitLab или Bitbucket.
2. В Vercel нажмите **Add New → Project** и импортируйте репозиторий.
3. Оставьте Framework Preset `Next.js` и стандартную команду сборки `npm run build`.
4. В разделе **Environment Variables** добавьте `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.
5. Нажмите **Deploy**.

Также можно выполнить деплой через CLI:

```bash
npx vercel
```
