# Panel de administración — New Metals

Panel privado en `/admin` para editar el contenido del sitio (marca, servicios,
trabajos con fotos, proceso, etc.) sin tocar código. Al **Publicar**, los cambios
se guardan en el repositorio vía la API de GitHub y Vercel redeploya solo: el
sitio se actualiza en ~1 minuto.

## Cómo funciona

- La fuente de verdad editable es **`public/content.json`**. El sitio lo carga en
  vivo; el panel lo lee y lo reescribe.
- Las imágenes que subís desde el panel se comprimen a WebP en el navegador y se
  guardan en **`public/assets/uploads/`**.
- El acceso es por **contraseña**. La sesión dura 12 horas.

## Configuración (una sola vez)

El panel necesita 3 variables de entorno en Vercel. Sin ellas, `/admin` muestra
el login pero no deja entrar (queda "no configurado").

### 1. Generar la contraseña y el secreto

En tu máquina, en la carpeta del proyecto:

```bash
node scripts/hash-password.cjs
```

Te pide una contraseña (mínimo 10 caracteres) e imprime dos valores:
`ADMIN_PASSWORD_HASH` y `SESSION_SECRET`. La contraseña en texto plano **no se
guarda en ningún lado** — anotala aparte, es la que vas a usar para entrar.

### 2. Crear el token de GitHub

En GitHub → **Settings → Developer settings → Fine-grained tokens → Generate new token**:

- **Repository access**: solo este repo (`newmetals-portfolio`).
- **Permissions → Repository → Contents**: **Read and write**.
- Copiá el token (empieza con `github_pat_…`).

### 3. Cargar las variables en Vercel

En Vercel → tu proyecto → **Settings → Environment Variables**, agregá (para
Production y Preview):

| Variable | Valor |
|---|---|
| `ADMIN_PASSWORD_HASH` | el hash `scrypt$…` del paso 1 |
| `SESSION_SECRET` | el valor del paso 1 |
| `GITHUB_TOKEN` | el token del paso 2 |

`GITHUB_OWNER`, `GITHUB_REPO` y `GITHUB_BRANCH` se toman solos del entorno de
Vercel. Si querés forzarlos, podés agregarlos a mano (owner de la cuenta, nombre
del repo, y `main`).

### 4. Redeploy

Después de cargar las variables, **redeployá** el proyecto para que tomen efecto.
Listo: entrás a `https://<tu-dominio>/admin`, ponés la contraseña y editás.

## Cambiar la contraseña

Volvé a correr `node scripts/hash-password.cjs`, actualizá `ADMIN_PASSWORD_HASH`
(y opcionalmente `SESSION_SECRET`, lo que cierra todas las sesiones abiertas) en
Vercel y redeployá.

## Notas

- El sitio tiene `noindex` (no aparece en Google) mientras esté en revisión; eso
  se controla en `vercel.json`.
- La navegación superior (menú) es estructural y no se edita desde el panel.
- En "Modo avanzado" (interruptor al final del panel) aparecen la Portada del
  inicio, la sección de Valores y el link técnico de Instagram.
