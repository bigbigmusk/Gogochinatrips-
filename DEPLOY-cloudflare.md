# 部署到 Cloudflare Pages（上线指南）

本项目已配置为**静态导出**（`next build` 会生成 `out/` 文件夹），可以直接上传到
Cloudflare Pages，得到一个免备案的 `*.pages.dev` 公网网址。

下面三种方式**任选一种**。推荐 **方式一（拖文件夹上传）**，最省事、不需要命令行、不需要 GitHub。

---

## 方式一：拖文件夹上传（最简单，推荐）

1. 打开 <https://dash.cloudflare.com> → 注册 / 登录
2. 左侧 **Workers & Pages** → **Create** → 选 **Pages** 标签 → **Upload assets（上传资源）**
3. 项目名填 `gogochinatrips`
4. 把 **`out` 文件夹**（先解压 zip 得到）整个拖进上传框
5. 点 **Deploy**
6. 得到网址：`https://gogochinatrips.pages.dev`

> 更新网站时，重新构建后再拖一次新的 `out` 即可。

---

## 方式二：命令行一键部署（电脑有 Node 时最快）

```bash
npm install            # 首次
npm run build          # 生成 out/
npx wrangler login     # 弹出浏览器，登录并授权 Cloudflare（用你自己的账号）
npx wrangler pages deploy out --project-name=gogochinatrips
```

结束后终端会直接打印出 `https://....pages.dev` 链接。以后只要重复最后两条命令即可更新。

---

## 方式三：连接 GitHub 自动部署（改代码自动更新）

1. <https://dash.cloudflare.com> → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. 授权 GitHub，选择仓库 `bigbigmusk/Gogochinatrips-`
3. **Production branch** 选：`claude/gogochinatrips-build-lzj06q`
4. 构建设置（关键，填错会失败）：

   | 项目 | 值 |
   |---|---|
   | Framework preset | Next.js (Static HTML Export)（没有就选 None） |
   | Build command | `npm run build` |
   | Build output directory | `out` |

5. 环境变量加一条：`NODE_VERSION = 22`
6. **Save and Deploy** → 得到 `https://gogochinatrips.pages.dev`

之后每次 push 到该分支，Cloudflare 会自动重新部署。

---

## 常见问题

- **直接双击 `out/index.html` 打不开样式？** 正常。静态资源用的是绝对路径，必须通过
  托管（pages.dev）或本地服务器访问。本地预览可运行：`npx serve out`
- **想绑自己的域名？** Cloudflare Pages 项目里 **Custom domains** 添加即可。用 Cloudflare
  的域名不需要 ICP 备案。
- **`*.pages.dev` 需要备案吗？** 不需要，上传完立即可对外访问。
