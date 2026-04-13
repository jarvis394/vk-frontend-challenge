# Задание для Front-end стажёра

[vk-frontend-challenge.yekushev.dev](https://vk-frontend-challenge.yekushev.dev)

### Стек

- Svelte 5 + SvelteKit
- TypeScript
- Tailwind CSS
- svelte-intersection-observer
- Bun

### Реализованые фичи

- Бесконечная лента котиков
- Lazy loading для картинок
- Более собранный дизайн
- Сохранение любимых котиков в IndexedDB

### Локальный запуск

Склонируй репозиторий:

```bash
git clone https://github.com/yekushev/vk-frontend-challenge.git
```

Сначала нужно добавить свой API ключ из https://thecatapi.com:

```bash
cp .env.example .env
# добавить ключ с https://thecatapi.com
```

Затем установите зависимости и запустите:

```bash
bun install
bun dev
# bun build
# bun check
# bun lint
```

# Результат

См. github actions в репозитории: [.github/workflows/deploy.yml](https://github.com/jarvis394/vk-frontend-challenge/blob/master/.github/workflows/deploy.yml)

[vk-frontend-challenge.yekushev.dev](https://vk-frontend-challenge.yekushev.dev)
